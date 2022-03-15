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
            $ref: '#/components/schemas/ToDoParams'
          }
        }
      }
    },
    responses: {
      '200': {
        description: 'To-do updated successfully',
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
      },
    },
  },
};
