export interface GetWorkExperiencePostModel {
    id: number
    workExperienceCompanyId: number;
    dateFrom: Date;
    dateTo: Date;
    companyName: string
    base64image?: string
    details: [
        {
            dateFrom: Date
            dateTo: Date
            post: string
        }
    ]
}