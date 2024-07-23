import express from "express";

const router = express.Router()
import userController from '../controllers/userController'
import projectController from '../controllers/projectController'
//const workExperiencePostController = require('../controllers/workExperiencePostController');

router.get("/api/v1/getProjects", userController.checkToken, projectController.getProjects);
router.get("/api/v1/getProgrammingRelatedList", userController.checkToken, projectController.getProgrammingRelatedList);
router.get("/api/v1/getCompanyList", userController.checkToken, projectController.getCompanyList);


export default router
