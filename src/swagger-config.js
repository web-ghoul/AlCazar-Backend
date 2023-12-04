const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AlCazar API',
      version: '1.0.0',
      description: 'API documentation for Your API',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    // apis: ["./routes/*.js"],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
