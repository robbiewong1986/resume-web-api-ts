//getWorkExperiencePostList
import { Request, Response } from 'express';
import { GetWorkExperiencePostListResponse } from '../model/responseModel'
import { getWorkExperiencePostList } from '../dataAccess/workExpriencePostRepository'
var log4js = require("../log4js");


const getWorkExperiencePostListController = async (req: Request, res: Response<GetWorkExperiencePostListResponse>) => {

    const result = await getWorkExperiencePostList();

    if (result instanceof Error)
        res.status(400).send({
            message: result.message,
            status: 400
        })
    else
        res.status(200).send({
            data: {
                workExperiencePostList: result
            },
            message: "Success",
            status: 200,
        })
}

const workExperiencePostController = {
    getWorkExperiencePostList: getWorkExperiencePostListController
}

export default workExperiencePostController
