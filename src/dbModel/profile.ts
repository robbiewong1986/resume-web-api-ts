import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'

class WorkExperienceCompany  {
    public id!: number
    public companyId!: number;
    public displayName!: string;
    public dateFrom!: Date;
    public dateTo?: Date;

}

class profile extends Model {
    public id!: number
    public type!: string;
    public content!: string;
    public isVisible!: boolean;
    public seqNo!: number
    // timestamps!
    public createdDt!: Date;
    public updatedDt!: Date;
    public workExperienceCompany? : WorkExperienceCompany[];
}

export const Profile = profile.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        field: 'type',
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        field: 'content',
        type: DataTypes.STRING,
        allowNull: false,
    },
    isVisible: {
        field: 'is_visible',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    seqNo: {
        field: 'seq_no',
        type: DataTypes.INTEGER,
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
    deletedAt: false, 

});

