module.exports = {
    delete: {
        tags: ['To-Do'],
        description: 'Delete a to-do',
        operationId: 'deleteTodo',
        parameters: [
            {
                name: 'id',
                in: 'path',
                schema: {
                    $ref: '#/components/schemas/id'
                },
                required: true,
                description: 'Delete a to-do'
            }
        ],
        responses: {
            '200': {
                description: 'To-do deleted successfully',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/CreateUpdateDeleteResponse'
                        }
                    }
                }
            },
            '404': {
                description: 'To-do not found',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ErrorResponse'
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