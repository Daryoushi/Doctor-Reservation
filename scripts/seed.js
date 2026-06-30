const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/starcoach'

const specialties = [
  { name: 'قلب و عروق', icon: '❤️' },
  { name: 'داخلی', icon: '🩺' },
  { name: 'اطفال', icon: '👶' },
  { name: 'زنان و زایمان', icon: '👩' },
  { name: 'ارتوپدی', icon: '🦴' },
  { name: 'چشم پزشکی', icon: '👁️' },
  { name: 'پوست و مو', icon: '🧴' },
  { name: 'مغز و اعصاب', icon: '🧠' },
  { name: 'گوش و حلق و بینی', icon: '👂' },
]

const doctorsData = [
  { fullName: 'دکتر علی وارسته', specialty: 'قلب و عروق', city: 'تهران', fee: 250000, bio: 'متخصص قلب و عروق با بیش از ۱۵ سال سابقه', experience: 15 },
  { fullName: 'دکتر محمود محمودی', specialty: 'داخلی', city: 'تهران', fee: 180000, bio: 'فوق تخصص بیماری‌های داخلی', experience: 12 },
  { fullName: 'دکتر سارا محمدی', specialty: 'اطفال', city: 'اصفهان', fee: 200000, bio: 'متخصص بیماری‌های کودکان', experience: 10 },
  { fullName: 'دکتر رضا کریمی', specialty: 'ارتوپدی', city: 'شیراز', fee: 300000, bio: 'جراح ارتوپد و فوق تخصص زانو', experience: 18 },
  { fullName: 'دکتر مریم احمدی', specialty: 'زنان و زایمان', city: 'تهران', fee: 220000, bio: 'متخصص زنان و زایمان و ناباروری', experience: 14 },
  { fullName: 'دکتر امیر حسینی', specialty: 'مغز و اعصاب', city: 'مشهد', fee: 350000, bio: 'فوق تخصص مغز و اعصاب', experience: 20 },
  { fullName: 'دکتر زهرا کریمی', specialty: 'چشم پزشکی', city: 'تهران', fee: 280000, bio: 'جراح چشم و فوق تخصص قرنیه', experience: 16 },
  { fullName: 'دکتر محمد رضایی', specialty: 'پوست و مو', city: 'اصفهان', fee: 190000, bio: 'متخصص پوست و مو و لیزر', experience: 8 },
]

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    const User = mongoose.model('User', new mongoose.Schema({
      mobile: String,
      name: String,
      role: { type: String, default: 'patient' },
      isVerified: { type: Boolean, default: true },
    }))

    const Doctor = mongoose.model('Doctor', new mongoose.Schema({
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      fullName: String,
      specialty: String,
      medicalSystemCode: String,
      city: String,
      clinicAddress: String,
      consultationFee: Number,
      isApproved: { type: Boolean, default: true },
      bio: String,
      experience: Number,
      averageRating: { type: Number, default: 4.5 },
      reviewCount: { type: Number, default: 105 },
    }))

    const Appointment = mongoose.model('Appointment', new mongoose.Schema({
      patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
      date: String,
      startTime: String,
      endTime: String,
      status: { type: String, default: 'paid' },
      price: Number,
      trackingCode: String,
    }))

    // Clear existing data
    await User.deleteMany({})
    await Doctor.deleteMany({})
    await Appointment.deleteMany({})

    // Create a test user
    const testUser = await User.create({
      mobile: '09123456789',
      name: 'کاربر تست',
      role: 'patient',
      isVerified: true,
    })
    console.log('✅ Test user created: 09123456789')

    // Create doctors
    for (const doc of doctorsData) {
      await Doctor.create({
        fullName: doc.fullName,
        specialty: doc.specialty,
        medicalSystemCode: String(Math.floor(100000 + Math.random() * 900000)),
        city: doc.city,
        clinicAddress: `${doc.city} - خیابان اصلی - پلاک ۱۲۳`,
        consultationFee: doc.fee,
        isApproved: true,
        bio: doc.bio,
        experience: doc.experience,
        averageRating: 4.5,
        reviewCount: 105,
      })
    }
    console.log(`✅ ${doctorsData.length} doctors created`)

    console.log('\n🎉 Seed completed!')
    console.log('📱 Login with: 09123456789')

    await mongoose.disconnect()
    process.exit(0)
  } catch (error) {
    console.error('❌ Seed error:', error)
    process.exit(1)
  }
}

seed()
