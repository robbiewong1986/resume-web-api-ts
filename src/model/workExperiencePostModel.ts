// export interface WorkExperiencePostData {
//     id: number
//     workExperienceCompanyId: number;
//     dateFrom: Date;
//     dateTo: Date;
//     companyName: string
//     base64image?: string
//     details: [
//         {
//             dateFrom: Date
//             dateTo: Date
//             post: string
//         }
//     ]
// }

export interface WorkExperiencePostData {
    id: number
    workExperienceCompanyId: number
    dateFrom: Date
    dateTo: Date
    company:
    {
        name: string
        mongodbImageId?: string
    }
    details: [
        {
            dateFrom: Date
            dateTo: Date
            post: string
        }
    ]
}