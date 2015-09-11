var express = require('express');
var controller = require('../controllers/package');
var route = module.exports = express.Router();

route.get('/', controller.list);
route.get('/:id', controller.get);
route.post('/', controller.post);
route.delete('/:id', controller.delete);
