import { Request, Response } from 'express';
import { UserLoginRequest, UserLogoutRequest } from '../model/requestModel'
import { UserLoginResponse, GetRSAPublicKeyResponse, UserLogoutResponse } from '../model/responseModel'
import { processLogin, getUserTokenByUserId, getUserByUserId } from '../dataAccess/userRepository'
import { readFile, decryptData } from '../util'
import { serialize } from 'cookie';
import Log4js from '../log4js'
import jwt from 'jsonwebtoken';


const userLogin = async (req: Request<{}, {}, UserLoginRequest>, res: Response<UserLoginResponse>) => {

    try {
        const [result, message] = await processLogin(req.body.username, req.body.password)

        if (result.id) {
            const token = jwt.sign({ userId: result.id, token: result.token }, String(process.env.JWT_SECRET_WORD), {
                expiresIn: '5m',
            });

            const serialized = serialize('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 2 * 60 * 60,
                path: '/',
            });

            res.setHeader('Set-Cookie', serialized);
            //res.cookie('token', serialized, { httpOnly: true })
            //res.cookie("token", token)
            res.status(200).send({
                data: {
                    userProfile: result,
                },
                message: message,
                status: 200,
            })
        } else
            res.status(401).send({
                data: {
                    userProfile: {},
                },
                message: message,
                status: 401,
            })



    } catch (ex) {
        res.status(500).send({
            message: ex instanceof Error ? ex.message : "",
            status: 400,
        })
    }
}

const userLogout = async (req: Request<{}, {}, UserLogoutRequest>, res: Response<UserLogoutResponse>) => {

    try {
        const serialized = serialize('token', '', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 2 * 60 * 60,
            path: '/',
        });

        res.setHeader('Set-Cookie', serialized);

        res.status(200).send({
            message: "Success",
            status: 200,
        })

    } catch (ex) {
        res.status(500).send({
            message: ex instanceof Error ? ex.message : "",
            status: 400,
        })
    }
}

const getRSAPublicKey = async (req: Request, res: Response<GetRSAPublicKeyResponse>) => {
    try {
        if (process.env.RSA_PUBLIC_KEY_FILE_PATH) {
            const publickey = readFile(process.env.RSA_PUBLIC_KEY_FILE_PATH)

            if (publickey) {
                res.status(200).send({
                    data: { publickey: publickey },
                    message: "Success",
                    status: 200,
                })
            } else {
                res.status(500).send({
                    data: {},
                    message: "No Public Key found",
                    status: 500,
                })
            }
        }
    } catch (ex) {
        res.status(500).send({
            data: {},
            message: ex instanceof Error ? ex.message : "",
            status: 500,
        })
    }
}

//const refreshToken = async (req: Request, res: Response<RefreshTokenResponse>) => {
//     const cookieToken = req.cookies.token

//     const decoded = jwt.decode(cookieToken);
//     if (decoded) {
//         const user = (decoded as any).userId;
//         const pass = (decoded as any).token;

//         const userToken = await getUserTokenByUserId(user)
//         if (userToken == pass) {
//             const token = jwt.sign({ userId: user, token: pass }, String(process.env.JWT_SECRET_WORD), {
//                 expiresIn: '2m',
//             });

//             const serialized = serialize('token', token, {
//                 httpOnly: true,
//                 secure: true,
//                 sameSite: 'strict',
//                 maxAge: 5 * 60,
//                 path: '/',
//             });

//             res.setHeader('Set-Cookie', serialized);
//             res.status(200).send({
//                 message: 'Refresh Token Success',
//                 status: 200,
//             })
//         } else {
//             res.status(401).send({
//                 message: 'You are not authenticated!',
//                 status: 401,
//             })
//         }
//     } else {
//         res.status(401).send({
//             message: 'You are not authenticated!',
//             status: 401,
//         })
//     }

// }

const checkToken = async (req: Request, res: Response, next: () => void) => {
   
    
    Log4js.logInfo(req.cookies.token)
    const cookieToken = req.cookies.token

    if (cookieToken) {

        try {

            const decoded = jwt.verify(cookieToken, String(process.env.JWT_SECRET_WORD));
            Log4js.logInfo("JWT Valid")
            next()
            // const user = (decoded as any).userId;
            // const pass = (decoded as any).token;

            // const token = await getUserTokenByUserId(user)

            // if (token == pass) {
            //     Log4js.logInfo("Check token passed " + token)
            //     // If Authorized user
            //     next()
            // } else {
            //     Log4js.logInfo("Check token failed " + pass)
            //     res.setHeader('WWW-Authenticate', 'Basic');
            //     res.status(401).send({
            //         data: {},
            //         message: 'You are not authenticated!',
            //         status: 401,
            //     })
            // }


        } catch (ex) {

            if (!(ex instanceof Error)) {
                res.status(401).send({
                    data: {},
                    message: 'You are not authenticated!',
                    status: 401,
                })
                return
            }

            Log4js.logError(ex.message)
            if (ex.name !== "TokenExpiredError") {

                res.status(401).send({
                    data: {},
                    message: 'You are not authenticated!',
                    status: 401,
                })

                return

            } else { // Token Expired

                const decoded = jwt.decode(cookieToken);
                Log4js.logInfo(`try to refresh token . ${(decoded as any).userId}`)
                if (decoded) {
                    const jwtUserId = (decoded as any).userId;
                    const jwtUserToken = (decoded as any).token;

                    const user = await getUserByUserId(jwtUserId)// Check Token in jwt is valid

                    if (user && user.id && user.id > 0 && (!user.tokenCreatedDt || (new Date().getTime() - user.tokenCreatedDt.getTime()) < 24 * 3600 * 1000) && user.token === jwtUserToken) {
                        const token = jwt.sign({ userId: jwtUserId, token: user.token }, String(process.env.JWT_SECRET_WORD), {
                            expiresIn: '5m',
                        });

                        const serialized = serialize('token', token, {
                            httpOnly: true,
                            secure: true,
                            sameSite: 'strict',
                            maxAge: 2 * 60 * 60,
                            path: '/',
                        });

                        res.setHeader('Set-Cookie', serialized);

                        Log4js.logInfo(`refresh token success. ${(decoded as any).userId}`)

                        next()
                    } else {
                        res.status(401).send({
                            message: 'You are not authenticated!',
                            status: 401,
                        })
                    }
                } else {
                    res.status(401).send({
                        message: 'You are not authenticated!',
                        status: 401,
                    })
                }
            }
        }
    }else{
        next()
    }
    // else if (!authheader) {
    //     Log4js.logInfo("No Auth Header")
    //     res.status(401).send({
    //         data: {},
    //         message: 'You are not authenticated!',
    //         status: 401,
    //     })
    // } else {
    //     const userToken = authheader.split(' ')[1];

    //     if (usedAuth.length > 0 &&
    //         usedAuth.filter(auth =>
    //             auth.token == userToken &&
    //             Math.abs(Date.now() - auth.usedTime) < 1000 * 60).length > 0) {
    //         Log4js.logInfo("Check Used Auth failed " + userToken)

    //         res.status(401).send({
    //             data: {},
    //             message: 'You are not authenticated!',
    //             status: 401,
    //         })
    //         return;
    //     } else {
    //         Log4js.logInfo("Check Used Auth passed " + userToken)
    //         usedAuth.push({
    //             token: userToken,
    //             usedTime: Date.now()
    //         })

    //         usedAuth = usedAuth.filter(auth => Math.abs(Date.now() - auth.usedTime) < 1000 * 3600)
    //     }

    //     try {
    //         if (process.env.RSA_PRIVATE_KEY_FILE_PATH) {
    //             const privatekey = readFile(process.env.RSA_PRIVATE_KEY_FILE_PATH)

    //             const decryptedData = JSON.parse(decryptData(privatekey, userToken))

    //             const user = decryptedData.userId;
    //             const pass = decryptedData.token;

    //             const token = await getUserTokenByUserId(user)

    //             if (token == pass) {
    //                 Log4js.logInfo("Check token passed " + token)
    //                 // If Authorized user
    //                 next()
    //             } else {
    //                 Log4js.logInfo("Check token failed " + pass)
    //                 res.setHeader('WWW-Authenticate', 'Basic');
    //                 res.status(401).send({
    //                     data: {},
    //                     message: 'You are not authenticated!',
    //                     status: 401,
    //                 })
    //             }
    //         } else {
    //             Log4js.logError("RSA_PRIVATE_KEY_FILE_PATH is null")
    //             res.status(401).send({
    //                 data: {},
    //                 message: 'You are not authenticated!',
    //                 status: 401,
    //             })
    //         }
    //     } catch (ex) {
    //         if (ex instanceof Error)
    //             Log4js.logError(ex.message)

    //         res.status(401).send({
    //             data: {},
    //             message: 'You are not authenticated!',
    //             status: 401,
    //         })
    //     }
    // }
}

const userController = {
    userLogin: userLogin,
    checkToken: checkToken,
    userLogout: userLogout,
    getRSAPublicKey: getRSAPublicKey,
    //refreshToken: refreshToken,
}

export default userController

module.exports.userLogin = userLogin
