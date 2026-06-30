declare module 'smsir-js' {
  export class Smsir {
    constructor(apiKey: string, lineNumber: number)

    SendBulk(
      messageText: string,
      mobiles: string[],
      sendDateTime: number | null,
      lineNumber: number | null
    ): Promise<any>

    SendVerifyCode(
      mobile: string,
      templateId: number,
      parameters: Array<{ name: string; value: string }>
    ): Promise<any>

    SendLikeToLike(
      messageTexts: string[],
      mobiles: string[],
      sendDateTime: number | null,
      lineNumber: number | null
    ): Promise<any>

    getCredit(): Promise<any>
    getLineNumbers(): Promise<any>
    ReportMessage(messageId: number): Promise<any>
    ReportPack(packId: string): Promise<any>
    ReportToday(pageSize?: number, pageNumber?: number): Promise<any>
    ReportArchived(fromDate?: number | null, toDate?: number | null, pageSize?: number, pageNumber?: number): Promise<any>
    ReportLatestReceived(count: number): Promise<any>
    ReportTodayReceived(pageSize?: number, pageNumber?: number): Promise<any>
    ReportArchivedReceived(fromDate?: number | null, toDate?: number | null, pageSize?: number, pageNumber?: number): Promise<any>
    deleteScheduled(packId: string): Promise<any>
  }
}
