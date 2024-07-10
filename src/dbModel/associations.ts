import { WorkExperienceCompany } from './workExperienceCompany'
import { WorkExperiencePost } from './workExperiencePost'
import { Company } from './company'

WorkExperienceCompany.hasMany(WorkExperiencePost, { as: 'workExperiencePost', foreignKey: 'work_experience_company_id', sourceKey: 'id' })
WorkExperienceCompany.belongsTo(Company, { as: 'company', targetKey: 'id', foreignKey: 'company_id' })

Company.hasMany(WorkExperienceCompany, { as: 'workExperienceCompany', foreignKey: "company_id", sourceKey: "id" })



