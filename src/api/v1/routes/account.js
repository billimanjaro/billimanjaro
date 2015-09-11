var express = require('express');
var controller = require('../controllers/account');
var route = module.exports = express.Router();

route.get('/', controller.list);
route.get('/:id', controller.get);
route.put('/:id', controller.put);
route.post('/', controller.post);
route.delete('/:id', controller.delete);
