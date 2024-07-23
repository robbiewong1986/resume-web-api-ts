
import { Request, Response, query } from 'express';
import { GetProjectRequest } from '../model/requestModel'
import { GetProjectResponse, GetProgramRelatedResponse, GetCompanyListResponse } from '../model/responseModel'
import { getProject, getProgrammingRelated, getCompanies } from '../dataAccess/projectRepository'
var log4js = require("../log4js");

const getProjects = async (req: Request<{}, {}, {}, GetProjectRequest>, res: Response<GetProjectResponse>) => {
    console.log(req.params)
    const result = await getProject(req.query.name, req.query.companyId, req.query.teamSize, req.query.backendProgrammingIds, req.query.frontendProgrammingIds, req.query.databaseProgrammingIds);

    if (result instanceof Error)
        res.status(500).send({
            message: result.message,
            status: 500
        })
    else
        res.status(200).send({
            data: {
                projectList: result
            },
            message: "Success",
            status: 200,
        })
}

const getProgrammingRelatedList = async (req: Request, res: Response<GetProgramRelatedResponse>) => {

    const result = await getProgrammingRelated();

    if (result instanceof Error)
        res.status(500).send({
            message: result.message,
            status: 500
        })
    else
        res.status(200).send({
            data: {
                programRelatedList: result
            },
            message: "Success",
            status: 200,
        })
}

const getCompanyList = async (req: Request, res: Response<GetCompanyListResponse>) => {
    const result = await getCompanies();

    if (result instanceof Error)
        res.status(500).send({
            message: result.message,
            status: 500
        })
    else
        res.status(200).send({
            data: {
                companyList: result
            },
            message: "Success",
            status: 200,
        })
}


const projectController = {
    getProjects: getProjects,
    getProgrammingRelatedList: getProgrammingRelatedList,
    getCompanyList: getCompanyList
}

export default projectController
