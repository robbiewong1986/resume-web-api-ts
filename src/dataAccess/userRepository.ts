import Log4js from '../log4js'
import { Users } from '../dbModel/users'
import { UserProfile } from '../model/userModel'

const { decryptData, readFile, aesEncrypt, randomString } = require('../util');

interface processLoginResponse {
    userProfile: UserProfile
}

export const processLogout = async (userId: number): Promise<boolean> => {
    const result = await Users.update(
        {
            token: "",
            tokenCreatedDt: undefined,
        },
        {
            where: {
                id: userId,

            }
        }
    ).then(result => result[0])
        .catch((err) => {
            console.error('Something went wrong:', err);
            throw err;
        });

    if (result > 0)
        return true
    else
        return false

}


export const processLogin = async (username: string, password: string): Promise<[processLoginResponse, string]> => {

    const privatekey = readFile(process.env.RSA_PRIVATE_KEY_FILE_PATH)
    const decryptedPassword = decryptData(privatekey, password)

    const aESIV = readFile(process.env.AES_IV_FILE_PATH)
    const aESKey = readFile(process.env.AES_KEY_FILE_PATH)
    const aesPassword = aesEncrypt(aESIV, aESKey, decryptedPassword)

    const loginUser = await Users.findOne({
        where: {
            username: username,
            password: aesPassword
        }
    }).then((user) => {

        if (user && user.id != 0)
            return {
                id: user.id,
                userExpiryDate: user.userExpiryDt
            }
    }
    ).catch((err) => {
        console.error('Something went wrong:', err);
        throw err;
    });


    if (loginUser && loginUser.id != 0) {

        if (loginUser.userExpiryDate && loginUser.userExpiryDate < new Date()) {

            return [{
                userProfile: {}
            }, "User is expired"]
        }



        // Update Token 
        const token = randomString(20)

        const result = await Users.update({
            token: token,
            tokenCreatedDt: new Date(),
            lastLoginDt: new Date(),
            updatedDt: new Date(),
        }, {
            where: {
                id: loginUser.id,

            }
        }).then(result => result[0])
            .catch((err) => {
                console.error('Something went wrong:', err);
                throw err;
            });

        Log4js.logInfo(`Updated ${result} record(s)`)
        // Get user profile
        const loginUserProfile = await Users.findOne({
            where: {
                id: loginUser.id
            }
        }).then((user) => {
            return {
                userProfile: {
                    id: user?.id,
                    username: user?.username,
                    displayName: user?.displayName,
                    token: user?.token
                }
            }
        }).catch((err) => {
            console.error('Something went wrong:', err);
            throw err;
        });

        return [loginUserProfile, "Success"]
    } else {
        return [{
            userProfile: {}
        }, "Authentication failed"]
    }
}


export const getUserTokenByUserId = async (userId: number) => {
    return await Users.findOne({
        where: {
            id: userId,
            
        }
    }).then((user) => {
        if (user && user.id != 0)
            return user.token
    }
    ).catch((err) => {
        console.error('Something went wrong:', err);
        throw err;
    });
}


export const getUserByUserId = async (userId: number) => {
    return await Users.findOne({
        where: {
            id: userId,
            
        }
    }).then((user) => {
        if (user && user.id != 0)
            return user
    }
    ).catch((err) => {
        console.error('Something went wrong:', err);
        throw err;
    });
}



module.exports.getUserTokenByUserId = getUserTokenByUserId
