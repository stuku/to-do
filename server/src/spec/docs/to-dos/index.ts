const getToDos = require('./get-to-dos');
const createToDo = require('./create-to-do');
const updateToDo = require('./update-to-do');
const deleteToDo = require('./delete-to-do');

module.exports = {
    paths: {
        '/api/to-do': {
            ...getToDos,
            ...createToDo
        },
        '/api/to-do/{id}': {
            ...updateToDo,
            ...deleteToDo
        }
    }
}