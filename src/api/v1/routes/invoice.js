var express = require('express');
var controller = require('../controllers/invoice');
var route = module.exports = express.Router();

route.get('/', controller.list);
route.get('/:id', controller.get);
