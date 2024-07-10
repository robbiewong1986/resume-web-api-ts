const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});
const outputFile = './swaggerOutput.json';

const endpointsFiles = ['./routes/index.ts'];

const config = {
    info: {
        title: 'Resume API Documentation',
        description: '',
    },
    tags: [],
    host: 'localhost:5000/api',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);