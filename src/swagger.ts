 import { Express } from 'express'

// export const genSwagger = (app : Express) =>{
//     const outputFile = './swaggerOutput.json';    
//     const swaggerUi = require('swagger-ui-express')
//     const swaggerDocument = require(outputFile);
//     app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// }

const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Mini Blog API',
      description: "API endpoints for a mini blog services documented on swagger",
      contact: {
        name: "name",
        email: "email",
        url: "weburl"
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: "http://localhost:5000/",
        description: "Local server"
      },      
    ]
  },
  // looks for configuration in specified directories
  //apis: ['./routes/user.ts'],
  apis: [`${__dirname}/routes/*.ts`]
}


const swaggerSpec = swaggerJsdoc(options)

function swaggerDocs(app : Express, port :number) {
  // Swagger Page
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  // Documentation in JSON format
  app.get('/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}

export default swaggerDocs
