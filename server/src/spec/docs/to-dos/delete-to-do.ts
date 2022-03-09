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
                description: 'Delete a done tod-o'
            }
        ],
        responses: {
            '200': {
                description: 'To-do deleted successfully'
            },
            '404': {
                description: 'To-do not found'
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}