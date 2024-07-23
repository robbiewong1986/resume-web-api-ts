import express from 'express';

import userRouter from './user'
import workExperiencePostRouter from './workExperiencePost'
import profileRouter from './profile'
import projectRouter from './project'

var app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/workExperiencePost", workExperiencePostRouter);
app.use("/profile", profileRouter);
app.use("/project", projectRouter);

module.exports = app;

