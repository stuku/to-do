module.exports = {
  put: {
    tags: ['To-Do'],
    description: 'Update to-do',
    operationId: 'updateToDo',
    parameters: [
      {
        name: 'id',
        in: 'path',
        schema: {
          $ref: '#/components/schemas/id',
        },
        required: true,
        description: 'Id of to-do to be updated',
      },
    ],
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
        description: 'To-do updated successfully',
      },
      '404': {
        description: 'To-do not found',
      },
      '500': {
        description: 'Server error',
      },
    },
  },
};
