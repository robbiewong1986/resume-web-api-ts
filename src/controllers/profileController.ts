//getWorkExperiencePostList
import { Request, Response } from 'express';
import { GetProfileResponse } from '../model/responseModel'
import { getProfile } from '../dataAccess/profileRepository'
var log4js = require("../log4js");

const getProfiles = async (req: Request, res: Response<GetProfileResponse>) => {

    const result = await getProfile();

    if (result instanceof Error)
        res.status(500).send({
            message: result.message,
            status: 500
        })
    else
        res.status(200).send({
            data: {
                profileList: result
            },
            message: "Success",
            status: 200,
        })
}



const workExperiencePostController = {
    getProfiles: getProfiles
}

export default workExperiencePostController
