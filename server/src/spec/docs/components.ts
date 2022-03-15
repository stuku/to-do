
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
            ToDoParams: {
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
            GetResponse: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    data: {
                        type: 'array',
                        items: {
                            $ref: '#/components/schemas/ToDo'
                        }
                    }
                }
            },
            CreateUpdateDeleteResponse: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    data: {
                        description: 'The item which has been manipulated',
                        type: 'object',
                        $ref: '#/components/schemas/ToDo'
                    }
                }
            },
            ErrorResponse: {
                type: 'object',
                properties: {
                    code: {
                        type: 'string'
                    },
                    message: {
                        type: 'string'
                    },
                    data: {
                        description: 'Error JSON string',
                        type: 'string'
                    }
                }
            }
        }
    },
}