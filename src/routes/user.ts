import express from "express";

const router = express.Router()
import userController from '../controllers/userController'
const userLoginController = require('../controllers/userController').userLogin

/**
 * @swagger
 * components:
 *  schema:
 *   users:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *     password:
 *      type: string 
 */
/** 
 * @swagger 
 * /api/v1/user/login:
 *   post: 
 *     description: Process Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schema/users'
 *     responses:  
 *       200: 
 *         description: Success  
 *      
 *   
 */ 
router.post("/api/v1/userlogin", userController.userLogin);
//router.post("/api/v1/userlogin2", userLoginController);

router.post("/api/v1/userlogout", userController.userLogout);
//router.post("/api/v1/refreshToken", userController.refreshToken);
//
//router.post("/api/v1/testToken", userController.testToken);
//router.post("/api/v1/user", userController.getCompanyImage);
//router.post("/api/v1/testEncrypt", userController.testEncrypt);
//router.post("/api/v1/testDecrypt", userController.testDecrypt);

//router.post("/api/v1/testAESEncrypt", userController.testAESEncrypt);
//router.post("/api/v1/testAESDecrypt", userController.testAESDecrypt);

router.get("/api/v1/getRASPublicKey", userController.getRSAPublicKey);

export default router;
