import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'


class projectProgram extends Model {
    public id!: number
    public projectId!: number
    public programmingRelatedId!: number
    public usedInBackend!: boolean
    public usedInFrontend!: boolean
    public usedInDatabase!: boolean
    public isDeleted!: boolean
    // timestamps!
    public createdDt!: Date
    public updatedDt!: Date
}

export const ProjectProgram = projectProgram.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        field: 'project_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    programmingRelatedId: {
        field: 'programming_related_id',
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    usedInBackend: {
        field: 'used_in_backend',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    usedInFrontend: {
        field: 'used_in_frontend',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    usedInDatabase: {
        field: 'used_in_database',
        type: DataTypes.BOOLEAN,
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
    deletedAt: false,
    tableName: "project_program"
});

