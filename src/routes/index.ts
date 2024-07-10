import express from 'express';

import userRouter from './user'
import workExperiencePostRouter from './workExperiencePost'
import profileRouter from './profile'

var app = express();
app.use(express.json());

app.use("/user", userRouter);
app.use("/workExperiencePost", workExperiencePostRouter);
app.use("/profile", profileRouter);

module.exports = app;

