

import { WorkExperienceCompany } from '../dbModel/workExperienceCompany';
import { Company } from '../dbModel/company';
import { WorkExperiencePost } from '../dbModel/workExperiencePost';
import { WorkExperiencePostData } from '../model/workExperiencePostModel'

import { companyImage } from '../mongoDBModel/companyImages'

interface GetWorkExperiencePostListResultType {
    id: number
    workExperienceCompanyId: number
    dateFrom: Date
    dateTo: Date
    post: string
    company:
    {
        name: string,
        mongodbImageId?: string
    }
    workExperiencePost: [
        {
            dateFrom: Date
            dateTo: Date
            post: string
        }
    ]
}

export const getWorkExperiencePostList = async (): Promise<WorkExperiencePostData[]> => {
    //await sleep(5000)
    let result = await WorkExperienceCompany.findAll({
        where: {
            //isDeleted: false,
        },
        include: [
            {
                model: Company, as: 'company',
                required: true,
                attributes: ['name', 'mongodbImageId'],
                where: {
                    isDeleted: false,
                }
            },
            {
                model: WorkExperiencePost, as: 'workExperiencePost',
                required: true,
                attributes: ['dateFrom', 'dateTo', 'post'],
                where: {
                    //isDeleted: false,
                }
            }
        ]
    }).then((weps: any[]) => {
        return (weps as GetWorkExperiencePostListResultType[]).map(wep => {
            return {
                id: wep.id,
                company: wep.company,
                workExperiencePost: wep.workExperiencePost.map(
                    wep => {
                        return {
                            dateFrom: wep.dateFrom,
                            dateTo: wep.dateTo,
                            post: wep.post,
                        }
                    }
                ),
            }
        })
    }).catch((err: any) => {
        console.error('Something went wrong:', err);
        return err;
    });

    // Get image from Mongo DB
    return await Promise.all(
        result.map(
            async (res: GetWorkExperiencePostListResultType) => {
                const image = await companyImage.findById(res.company.mongodbImageId)
                return {
                    id: res.id,
                    companyName: res.company.name,
                    details: res.workExperiencePost,
                    base64image: image ? "data:image/png;base64, " + image.data : image.data // if image is null 
                }
            }
        ))
}
