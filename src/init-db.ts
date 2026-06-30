import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

let store = new Map<string, Map<string, any>>()
let idCounter = 0

function genId(): string {
  idCounter++
  return (Date.now().toString(36) + idCounter.toString(36) + Math.random().toString(36).substring(2, 6))
}

function getCol(name: string) {
  if (!store.has(name)) store.set(name, new Map())
  return store.get(name)!
}

function matches(doc: any, query: any): boolean {
  if (!query) return true
  for (const key of Object.keys(query)) {
    const qv = query[key]
    const dv = doc[key]
    if (qv && typeof qv === 'object' && !Array.isArray(qv) && qv.constructor === Object) {
      for (const op of Object.keys(qv)) {
        if (op === '$gt' && !(dv > qv.$gt)) return false
        if (op === '$gte' && !(dv >= qv.$gte)) return false
        if (op === '$lt' && !(dv < qv.$lt)) return false
        if (op === '$lte' && !(dv <= qv.$lte)) return false
        if (op === '$ne' && dv === qv.$ne) return false
        if (op === '$in' && !qv.$in.includes(dv)) return false
        if (op === '$regex') {
          const flags = qv.$options || ''
          if (!new RegExp(qv.$regex, flags).test(String(dv))) return false
        }
      }
    } else if (typeof qv === 'function') {
      if (!qv(dv)) return false
    } else if (dv !== qv) {
      return false
    }
  }
  return true
}

function wrapDoc(doc: any, col: Map<string, any>) {
  return new Proxy(doc, {
    get(target, prop: string) {
      if (prop === 'save') return () => { target.updatedAt = new Date(); col.set(target._id, target); return target }
      if (prop === 'toJSON' || prop === 'toObject') return () => ({ ...target, id: target._id })
      if (prop === '_id' || prop === 'id') return target._id
      if (prop === 'toString') return () => target._id
      return target[prop]
    },
    set(target, prop: string, value) {
      target[prop] = value
      return true
    },
  })
}

function execFind(col: Map<string, any>, query: any, sort?: any, limit?: number, skip?: number) {
  let results: any[] = []
  for (const doc of col.values()) {
    if (matches(doc, query)) results.push(wrapDoc(doc, col))
  }
  if (sort) {
    const sortKey = Object.keys(sort)[0]
    const sortDir = sort[sortKey]
    results.sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return -1 * sortDir
      if (a[sortKey] > b[sortKey]) return 1 * sortDir
      return 0
    })
  }
  return results
}

class Query {
  private _sort: any = null

  constructor(
    private col: Map<string, any>,
    private query: any,
    private isOne: boolean
  ) {}

  sort(sortObj: any) {
    this._sort = sortObj
    return this
  }

  lean() { return this }

  async exec() {
    const results = execFind(this.col, this.query, this._sort)
    return this.isOne ? (results[0] || null) : results
  }

  then(resolve: any, reject?: any) {
    return this.exec().then(resolve, reject)
  }

  catch(reject: any) {
    return this.exec().catch(reject)
  }

  finally(fn: any) {
    return this.exec().finally(fn)
  }

  [Symbol.toStringTag] = 'Query'
}

export class MemoryModel {
  private name: string
  private get col() { return getCol(this.name) }

  constructor(name: string) { this.name = name }

  findOne(query: any) {
    return new Query(this.col, query, true)
  }

  findById(id: string) {
    return new Query(this.col, { _id: id }, true)
  }

  find(query: any = {}) {
    return new Query(this.col, query, false)
  }

  async create(data: any) {
    const _id = genId()
    const doc = { ...data, _id, createdAt: new Date(), updatedAt: new Date() }
    this.col.set(_id, doc)
    return wrapDoc(doc, this.col)
  }

  async deleteOne(query: any) {
    for (const [id, doc] of this.col.entries()) {
      if (matches(doc, query)) { this.col.delete(id); return { deletedCount: 1 } }
    }
    return { deletedCount: 0 }
  }

  async deleteMany(query: any) {
    let count = 0
    for (const [id, doc] of [...this.col.entries()]) {
      if (matches(doc, query)) { this.col.delete(id); count++ }
    }
    return { deletedCount: count }
  }

  async updateOne(query: any, update: any) {
    for (const doc of this.col.values()) {
      if (matches(doc, query)) {
        if (update.$set) Object.assign(doc, update.$set)
        doc.updatedAt = new Date()
        return { modifiedCount: 1, matchedCount: 1 }
      }
    }
    return { modifiedCount: 0, matchedCount: 0 }
  }

  async updateMany(query: any, update: any) {
    let count = 0
    for (const doc of this.col.values()) {
      if (matches(doc, query)) {
        if (update.$set) Object.assign(doc, update.$set)
        doc.updatedAt = new Date()
        count++
      }
    }
    return { modifiedCount: count, matchedCount: count }
  }

  async countDocuments(query: any = {}) {
    let count = 0
    for (const doc of this.col.values()) {
      if (matches(doc, query)) count++
    }
    return count
  }

  async distinct(field: string, query?: any) {
    const values = new Set<any>()
    for (const doc of this.col.values()) {
      if (!query || matches(doc, query)) values.add(doc[field])
    }
    return Array.from(values)
  }

  async findOneAndUpdate(query: any, update: any, options?: any) {
    for (const doc of this.col.values()) {
      if (matches(doc, query)) {
        if (update.$set) Object.assign(doc, update.$set)
        doc.updatedAt = new Date()
        if (options?.new) return wrapDoc(doc, this.col)
        return doc
      }
    }
    return null
  }
}

const models = new Map<string, MemoryModel>()

export function getModel(name: string): MemoryModel {
  if (!models.has(name)) models.set(name, new MemoryModel(name))
  return models.get(name)!
}

async function tryConnectMongoose(): Promise<boolean> {
  if (!MONGODB_URI) return false
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    return true
  } catch (e) {
    console.warn('[DB] MongoDB unavailable:', (e as Error).message)
    return false
  }
}

let initialized = false

export async function initDB() {
  if (initialized) return true
  initialized = true

  const mongoOk = await tryConnectMongoose()
  if (mongoOk) return true

  console.log('[DB] Using in-memory store')
  return true
}
