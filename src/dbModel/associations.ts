import { WorkExperienceCompany } from './workExperienceCompany'
import { WorkExperiencePost } from './workExperiencePost'
import { Company } from './company'

import { ProgrammingRelated } from './programmingRelated'
import { Project } from './project'
import { ProjectProgram } from './projectProgram'

WorkExperienceCompany.hasMany(WorkExperiencePost, { as: 'workExperiencePost', foreignKey: 'work_experience_company_id', sourceKey: 'id' })
WorkExperienceCompany.belongsTo(Company, { as: 'company', targetKey: 'id', foreignKey: 'company_id' })
WorkExperienceCompany.hasMany(Project, { as: 'project', foreignKey: 'work_experience_company_id', sourceKey: 'id' })

Company.hasMany(WorkExperienceCompany, { as: 'workExperienceCompany', foreignKey: "company_id", sourceKey: "id" })

ProjectProgram.belongsTo(ProgrammingRelated, { as: 'programmingRelated', foreignKey: "programming_related_id" ,targetKey:'id' })

Project.hasMany(ProjectProgram, { as: 'projectProgram', foreignKey: 'project_id', sourceKey: 'id' })
Project.belongsTo(WorkExperienceCompany, { as: 'workExperienceCompany', foreignKey: 'work_experience_company_id', targetKey: 'id' })

