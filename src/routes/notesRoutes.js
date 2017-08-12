var express = require('express');

var notesRouter = express.Router();

var route = function () {

    //var bookService = require('../services/bookService.js')();
    var notesController = require('../controllers/notesController.js')();
    
    //notesRouter.use(bookController.middleware);
    
    notesRouter.get('/', notesController.getByUser);
    //notesRouter.get('/:id', bookController.getById);

    return notesRouter;
};



module.exports = route;
