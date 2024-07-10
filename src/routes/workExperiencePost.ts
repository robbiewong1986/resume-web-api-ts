import express from "express";

const router = express.Router()
import userController from '../controllers/userController'
import workExperiencePostController from '../controllers/workExperiencePostController'
//const workExperiencePostController = require('../controllers/workExperiencePostController');

router.get("/api/v1/getWorkExperiencePostList",userController.checkToken, workExperiencePostController.getWorkExperiencePostList);

export default router
