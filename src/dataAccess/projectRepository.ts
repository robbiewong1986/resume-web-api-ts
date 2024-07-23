const { Op } = require("sequelize");
import Log4js from '../log4js'
import { projectAdditionalDetails } from '../mongoDBModel/projectAdditionalDetail'
import { Project } from '../dbModel/project'
import { ProgrammingRelated } from '../dbModel/programmingRelated'
import { ProjectProgram } from '../dbModel/projectProgram'
import { WorkExperienceCompany } from '../dbModel/workExperienceCompany'
import { Company } from '../dbModel/company'
import { ProjectData, ProgrammingRelatedData, CompanyData } from '../model/projectModel'

interface GetProjectResultType {
    id: number;
    workExperienceCompanyId: number;
    name: string;
    mongoDetailId: string;
    //isDeleted: boolean;
    projectProgram: ProjectProgramResultType[];
    workExperienceCompany: WorkExperienceCompanyResultType;
}

interface WorkExperienceCompanyResultType {
    companyId: number;
    company: CompanyName;
}

interface ProjectProgramResultType {
    programmingRelatedId: number;
    usedInBackend: boolean;
    usedInFrontend: boolean;
    usedInDatabase: boolean;
    programmingRelated: ProgrammingRelatedResultType;
}

interface ProgrammingRelatedResultType {
    id: number
    name: string;
}

interface CompanyName {
    name: string;
}

export const getProject = async (
    name?: string,// Include
    companyId?: number[],
    teamSize?: {
        from?: number,
        to?: number,
    },
    backendProgrammingIds?: number[],
    frontendProgrammingIds?: number[],
    databaseProgrammingIds?: number[]

): Promise<ProjectData[]> => {
    console.log(backendProgrammingIds)
    let dbResult: ProjectData[] = await Project.findAll({
        attributes: ['id', 'workExperienceCompanyId', 'name', 'mongoDetailId', 'updatedDt'],
        where: {
            isDeleted: false,
            name: {
                [Op.substring]: name ? name : ""
            }
        },
        include: [
            {
                model: ProjectProgram, as: 'projectProgram',
                required: true,
                attributes: ['programmingRelatedId', 'usedInBackend', 'usedInFrontend', 'usedInDatabase'],
                where: {
                    isDeleted: false,
                },
                include: [
                    {
                        model: ProgrammingRelated, as: 'programmingRelated',
                        required: true,
                        attributes: ['id', 'name'],
                        where: {
                            isDeleted: false,
                        },
                    }
                ]
            },
            {
                model: WorkExperienceCompany, as: 'workExperienceCompany',
                required: true,
                attributes: ['companyId',],
                where: {
                    isDeleted: false,
                    companyId: companyId && companyId.length > 0 ? { [Op.in]: companyId } : { [Op.gte]: 0 }
                },
                include: [
                    {
                        model: Company, as: 'company',
                        required: true,
                        attributes: ['name'],
                    }
                ]
            }
        ]
    }).then((projects: any) => {

        return (projects as GetProjectResultType[]).map(project => {

            return {
                id: project.id,
                name: project.name,
                workExperienceCompanyId: project.workExperienceCompanyId,
                mongoDetailId: project.mongoDetailId,
                company: {
                    id: project.workExperienceCompany.companyId,
                    name: project.workExperienceCompany.company.name,
                },
                backendProgrammings: project.projectProgram.filter(pp => pp.usedInBackend).map(pp => {
                    return {
                        id: pp.programmingRelated.id,
                        name: pp.programmingRelated.name
                    }
                }),
                frontendProgrammings: project.projectProgram.filter(pp => pp.usedInFrontend).map(pp => {
                    return {
                        id: pp.programmingRelated.id,
                        name: pp.programmingRelated.name
                    }
                }),
                databaseProgrammings: project.projectProgram.filter(pp => pp.usedInDatabase).map(pp => {
                    return {
                        id: pp.programmingRelated.id,
                        name: pp.programmingRelated.name
                    }
                }),
            }
        })
    })

    const result: ProjectData[] = await Promise.all(
        dbResult.map(
            async (res: ProjectData) => {
                const detail = await projectAdditionalDetails.findById(res.mongoDetailId)
                return {
                    ...res,
                    mongoDetailId: undefined,
                    duty: detail.duty,
                    description: detail.description,
                    teamSize: detail.teamSize,
                    referenceLinks: detail.referenceLink,
                    

                }
            }
        ))

    return result.filter(r =>
        true
        && (r.teamSize ? r.teamSize >= (teamSize && teamSize.from ? teamSize.from : 0) : true)
        && (r.teamSize ? r.teamSize <= (teamSize && teamSize.to ? teamSize.to : 9999) : true)
        && (backendProgrammingIds && backendProgrammingIds.length > 0 ? (backendProgrammingIds.every(back => r.backendProgrammings ? r.backendProgrammings?.filter(bp => bp.id == back).length > 0 : false)) : true)
        && (frontendProgrammingIds && frontendProgrammingIds.length > 0 ? (frontendProgrammingIds.every(front => r.frontendProgrammings ? r.frontendProgrammings?.filter(bp => bp.id == front).length > 0 : false)) : true)
        && (databaseProgrammingIds && databaseProgrammingIds.length > 0 ? (databaseProgrammingIds.every(data => r.databaseProgrammings ? r.databaseProgrammings?.filter(bp => bp.id == data).length > 0 : false)) : true)
    )
}

// id: number
// name: string
// isFrontend: boolean
// isBackend: boolean
// isDatabase: boolean

export const getProgrammingRelated = async (): Promise<ProgrammingRelatedData[]> => {
    return await ProgrammingRelated.findAll({
        where: {
            isDeleted: false
        }
    }).then((projects: any) => {

        return (projects as ProgrammingRelatedData[]).map(programming => {
            return {
                id: programming.id,
                name: programming.name,
                isFrontend: programming.isFrontend,
                isBackend: programming.isBackend,
                isDatabase: programming.isDatabase

            }
        })
    })
}


export const getCompanies = async (): Promise<CompanyData[]> => {
    return await Company.findAll({
        where: {
            isDeleted: false
        }
    }).then((projects: any) => {

        return (projects as CompanyData[]).map(company => {
            return {
                id: company.id,
                name: company.name,
            }
        })
    })
}

