const { sleep } = require('../util')
const { Op } = require('sequelize');
const { workExperienceCompany } = require('../dbModel/workExperienceCompany');
const Company = require('../dbModel/company').company;
const WorkExperiencePost = require('../dbModel/workExperiencePost').workExperiencePost;
import { GetWorkExperiencePostModel } from '../model/workExperiencePostModel'

import { companyImage } from '../mongoDBModel/companyImages'

interface GetWorkExperiencePostList {
    id: number
    workExperienceCompanyId: number
    dateFrom: Date
    dateTo: Date
    post: string
    //isDeleted: boolean
    createdAt: Date
    updatedAt: Date
    company:
    {
        companyName: string,
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

export const getWorkExperiencePostList = async (): Promise<GetWorkExperiencePostModel[]> => {
    //await sleep(5000)
    let result = await workExperienceCompany.findAll({
        where: {
            //isDeleted: false,
        },
        include: [
            {
                model: Company, as: 'company',
                required: true,
                attributes: ['companyName', 'mongodbImageId'],
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
    }).then((weps: GetWorkExperiencePostList[]) => {
        return weps.map(wep => {
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
            async (res: GetWorkExperiencePostList) => {

                const image = await companyImage.findById(res.company.mongodbImageId)
                return {
                    id: res.id,
                    companyName: res.company.companyName,
                    details: res.workExperiencePost,
                    base64image: image ? "data:image/png;base64, " + image.data : image.data // if image is null 
                }
            }
        ))
}
