require('dotenv').config()

import express from "express";
import swaggerDocs from './swagger'
import cookieParser from 'cookie-parser'

const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const Router = require('./routes');

const PORT = Number(process.env.PORT);

const connectMongoDB = require("./server").connectMongoDB;
//const genSwagger = require('./swagger').genSwagger;
app.use(cookieParser());
//app.use(cors());
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
    credentials: true
}));
app.use(bodyParser.json());

app.use(Router);
connectMongoDB();

swaggerDocs(app, PORT)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));

