import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'

class project extends Model {
    public id!: number
    public workExperienceCompanyId!: number
    public name!: string
    public mongoDetailId!: string
    public isDeleted!: boolean
    // timestamps!F
    public createdDt!: Date
    public updatedDt!: Date  
}

export const Project = project.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    workExperienceCompanyId: {
        field: 'work_experience_company_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    mongoDetailId: {
        field: 'mongo_detail_id',
        type: DataTypes.STRING,
        allowNull: false,
    },
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    createdDt: {
        field: 'created_dt',
        type: DataTypes.DATE,
        allowNull: true,
    },
    updatedDt: {
        field: 'updated_dt',
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: false,
    sequelize: sequelizeConfig,
    // If don't want createdAt
    createdAt: false,
    freezeTableName: true,
    // If don't want updatedAt
    updatedAt: false,
    deletedAt: false
});

