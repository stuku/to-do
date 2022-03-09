module.exports = {
    get: {
        tags: ['To-Do'],
        description: 'Get to-dos',
        operationId: 'getToDos',
        parameters: [
            {
                name: 'title',
                in: 'query',
                type: 'string',
            },
            {
                name: 'description',
                in: 'query',
                type: 'string'
            },
            {
                name: 'status',
                in: 'query',
                description: '0: TO_DO, 1: DOING, 2: DONE, 99: PENDING',
                type: 'number'
            }, {
                name: 'pageSize',
                in: 'query',
                description: 'default: 10',
                type: 'number'
            }, {
                name: 'page',
                in: 'query',
                description: 'default: 0, min: 10',
                type: 'number'
            }
        ],
        responses: {
            '200': {
                description: 'To-dos were obtained',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/ToDo'
                        }
                    }
                }
            }
        }
    }
}