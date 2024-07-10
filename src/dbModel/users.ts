//import Sequelize from "sequelize-typescript"
import { DataTypes, Optional, Model } from "sequelize"
import { sequelizeConfig } from '../server'

//const sequelize = require("../server").sequelize;

// interface UserAttributes {
//     id: number;
//     username: string;
//     displayName: string;
//     password: string;
//     token?: string;
//     tokenCreatedDt?: Date;
//     lastLoginDt?: Date;
//     isDeleted: boolean;
// }

// export interface UserInput extends Optional<UserAttributes, 'id' | 'token' | 'tokenCreatedDt'> { }
// export interface UserOuput extends Required<UserAttributes> { }


class users extends Model {
    public id!: number
    public username!: string;
    public displayName!: string;
    public password!: string;
    public token?: string;
    public tokenCreatedDt?: Date;
    public userExpiryDt?: Date;
    public lastLoginDt?: Date;
    public isDeleted!: boolean;

    // timestamps!
    public createdAt!: Date;
    public updatedAt!: Date;    
}



export const Users = users.init({
    //export const users = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        field: 'user_name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    displayName: {
        field: 'display_name',
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        field: 'password',
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        field: 'token',
        type: DataTypes.STRING,
        allowNull: false,
    },
    tokenCreatedDt: {
        field: 'token_created_dt',
        type: DataTypes.DATE,
        allowNull: true,
    },
    userExpiryDt:{
        field: 'user_expiry_dt',
        type: DataTypes.DATE,
        allowNull: true,
    },
    lastLoginDt: {
        field: "last_login_dt",
        type: DataTypes.DATE
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
    },
    isDeleted: {
        field: 'is_deleted',
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

}, {
    timestamps: false,
    freezeTableName: true,
    // If don't want createdAt
    createdAt: false,
    // If don't want updatedAt
    updatedAt: false,
    deletedAt: false,
    sequelize: sequelizeConfig,
});

