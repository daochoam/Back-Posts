import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Social Network Project',
      version: '1.0.0',
    },
  },
  apis: [
    './src/documents/*.yaml',
  ],
};

// Genera la especificación Swagger
const swaggerConfig = swaggerJSDoc(swaggerOptions);
export default swaggerConfig;