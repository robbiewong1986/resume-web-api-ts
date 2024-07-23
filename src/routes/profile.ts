import express from "express";

const router = express.Router()
import userController from '../controllers/userController'
import profileController from '../controllers/profileController'
//const workExperiencePostController = require('../controllers/workExperiencePostController');

router.get("/api/v1/getProfileList",userController.checkToken, profileController.getProfiles);

export default router
