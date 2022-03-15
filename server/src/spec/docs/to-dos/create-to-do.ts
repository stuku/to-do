
module.exports = {
    post: {
        tags: ['To-Do'],
        description: 'Create to-do',
        operationId: 'createTodo',
        parameters: [],
        requestBody: {
            content: {
                'application/json': {
                    schema: {
                        $ref: '#/components/schemas/ToDoParams'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'To-do created successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateUpdateDeleteResponse'
                        }
                    }
                }
            },
            '500': {
                description: 'Server error',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
                        }
                    }
                }
            }
        }
    }
}