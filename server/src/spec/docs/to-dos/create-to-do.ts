
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
                        $ref: '#/components/schemas/ToDoInput'
                    }
                }
            }
        },
        responses: {
            '200': {
                description: 'To-do created successfully'
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}