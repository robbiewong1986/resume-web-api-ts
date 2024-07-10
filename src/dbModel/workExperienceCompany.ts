import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from '../server'
//import { Table } from 'sequelize/core/decorators-legacy';


class workExperienceCompany extends Model {
    public id!: number
    public companyId!: number;
    public displayName!: string;
    public dateFrom!: Date;
    public dateTo?: Date;
    //public isDeleted!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export const WorkExperienceCompany = workExperienceCompany.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    companyId: {
        field: 'company_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    dateFrom: {
        field: 'date_from',
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    dateTo: {
        field: 'date_to',
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    // isDeleted: {
    //     field: 'is_deleted',
    //     type: DataTypes.BOOLEAN,
    //     allowNull: false,
    // },
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

    // If don't want createdAt
    createdAt: false,
    freezeTableName: true,
    // If don't want updatedAt
    updatedAt: false,
    deletedAt: false,
    sequelize: sequelizeConfig,
    tableName: "Work_experience_company"
});

// workExperienceCompany.hasMany(WorkExperiencePost , { as:'workExperiencePost', foreignKey:'work_experience_company_id' , sourceKey:'id' })
// workExperienceCompany.belongsTo(Company , {as:'company' , targetKey:'id' , foreignKey :'company_id'})
// Company.hasMany(workExperienceCompany ,{ as:'workExperienceCompany', foreignKey:"company_id" , sourceKey : "id"})

