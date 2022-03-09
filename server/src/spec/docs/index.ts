
const basicInfo = require('./basicInfo');
const servers = require('./servers');
const components = require('./components');
const tags = require('./tags');
const toDos = require('./to-dos');

module.exports = {
    ...basicInfo,
    ...servers,
    ...components,
    ...tags,
    ...toDos
};