module.exports = {
    get: {
        tags: ['To-Do'],
        description: 'Get to-dos',
        operationId: 'getToDos',
        parameters: [
            {
                name: 'title',
                in: 'query',
                description: 'title',
                type: 'string',
            },
            {
                name: 'description',
                in: 'query',
                description: 'description',
                type: 'string'
            },
            {
                name: 'status',
                in: 'query',
                description: 'status, e.g. 0: TO_DO, 1: DOING, 2: DONE, 99: PENDING',
                type: 'number'
            }, {
                name: '__l',
                in: 'query',
                description: 'page size, e.g. default: 10',
                type: 'number'
            }, {
                name: '__p',
                in: 'query',
                description: 'page number, e.g. default: 0, min: 10',
                type: 'number'
            },
            {
                name: '__sp',
                in: 'query',
                description: 'property for sorting, e.g. _id, title, description, status, default: _id',
                type: 'string'
            },
            {
                name: '__sv',
                in: 'query',
                description: 'value for sorting, e.g. ASC: 1, DSC: -1',
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