const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'Nursery Project',
        description: 'Nursery Project have 3 types of users one admin and teachers and children'
    },
    host: 'localhost:3000'
};

const outputFile = '../documentation/swagger-output.json';
const routes = ['../app.js'];

swaggerAutogen(outputFile, routes, doc);