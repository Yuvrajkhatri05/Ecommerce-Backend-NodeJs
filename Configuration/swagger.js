const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API",
      version: "1.0.0",
      description: "API documentation for your Ecommerce project",
    },
    servers: [
      {
        url: process.env.BASE_URL || "http://localhost:8000",
      },
    ],
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer"
      }
    }
  },
  apis: ["./Routes/*.js"], // scan routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
