var express = require('express');

var bookRouter = express.Router();

var route = function (nav) {

    var bookService = require('../services/bookService.js')();
    var bookController = require('../controllers/bookController.js')(bookService,nav);
    
    bookRouter.use(bookController.middleware);
    
    bookRouter.get('/', bookController.getIndex);
    bookRouter.get('/:id', bookController.getById);

    return bookRouter;
};



module.exports = route;
