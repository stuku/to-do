
module.exports = {
    components: {
        schemas: {
            id: {
                type: 'string',
                description: 'An id of a to-do',
                example: '62281a36dcf24104be1e97a8'
            },
            ToDo: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        description: 'To-do identification number',
                        example: '62281a36dcf24104be1e97a8'
                    },
                    title: {
                        type: 'string',
                        description: "To-do's title",
                        example: 'Coding in TypeScript'
                    },
                    description: {
                        type: 'string',
                        description: "To-do's description",
                        example: 'description'
                    },
                    status: {
                        type: 'boolean',
                        description: 'The status of the to-do',
                        example: 0
                    }
                }
            },
            ToDoInput: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                        description: "To-do's title",
                        example: 'Coding in TypeScript'
                    },
                    description: {
                        type: 'string',
                        description: "To-do's description",
                        example: 'description'
                    },
                    status: {
                        type: 'boolean',
                        description: 'The status of the to-do',
                        example: 0
                    }
                }
            },
            Error: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    data: {
                        type: 'any'
                    }
                }
            }
        }
    }
}