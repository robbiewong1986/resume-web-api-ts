import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'

class company extends Model {
    public id!: number
    public name!: string;
    public mongodbImageId!: string;
    public isDeleted!: boolean;

    // timestamps!
    public createdDt!: Date;
    public updatedDt!: Date;
}

export const Company = company.init({
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
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    mongodbImageId: {
        field: 'mongodb_image_id',
        type: DataTypes.STRING,
        allowNull: true,
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

//module.exports.company = company; 