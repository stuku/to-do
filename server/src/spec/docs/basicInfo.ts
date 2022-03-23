module.exports = {
    openapi: "3.0.1",
    info: {
        version: '1.0.0',
        title: 'To-Do API',
        description: 'Simple RESTful API in Node.js with TypeScript',
    },
    host: `localhost:${process.env.NODE_PORT || 8080}`,
    basePath: '/',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
        api_key: {
            type: 'apiKey',
            name: 'api_key',
            in: 'header',
        },
        petstore_auth: {
            type: 'oauth2',
            authorizationUrl: 'https://petstore.swagger.io/oauth/authorize',
            flow: 'implicit',
            scopes: {
                read_pets: 'read your pets',
                write_pets: 'modify pets in your account',
            },
        },
    },
}