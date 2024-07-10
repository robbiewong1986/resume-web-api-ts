import { DataTypes, Model } from "sequelize";
import { sequelizeConfig } from '../server'

class workExperiencePost extends Model {
    public id!: number
    public workExperienceCompanyId!: number;    
    public dateFrom!: Date;
    public dateTo?: Date;
    public post!:string;
    //public isDeleted!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}


export const WorkExperiencePost = workExperiencePost.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    workExperienceCompanyId: {
        field:'work_experience_company_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    dateFrom: {
        field:'date_from',
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    
    dateTo: {
        field:'date_to',
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    post: {        
        type: DataTypes.STRING,
        allowNull: false,
    },   
    // isDeleted: {
    //     field:'is_deleted',
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
},{
    timestamps: false,    
    freezeTableName: true,
    // If don't want updatedAt
    updatedAt: false,
    createdAt: false,
    deletedAt: false,
    sequelize: sequelizeConfig,
    tableName: "Work_experience_post"
}); 

