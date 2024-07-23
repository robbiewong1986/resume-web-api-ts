import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'


class programmingRelated extends Model {
    public id!: number
    public name!: string
    public isFrontend!: boolean
    public isBackend!: boolean
    public isDatabase!: boolean
    public isDeleted!: boolean
    // timestamps!
    public createdDt!: Date
    public updatedDt!: Date
}

export const ProgrammingRelated = programmingRelated.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        field: 'name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    isBackend: {
        field: 'is_backend',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isFrontend: {
        field: 'is_frontend',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    isDatabase: {
        field: 'is_database',
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
    tableName: "programming_related"
});

