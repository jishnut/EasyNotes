var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var controller = function(service,nav){
    var middleware = function(req,res,next){
        if(!req.user)
        {
            res.redirect('/');
        }
        else
        {
            next();
        }
    };
    var getIndex = function (req, res) {
        var url = 'mongodb://localhost:27017/easyNotesApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');
            collection.find({}).toArray(function (err, results) {
                res.render('booksListView', {
                    title: 'Books',
                    nav: nav,
                    books: results
                });
                db.close();
            });
        });

    };
    
    var getById = function (req, res) {
        var id = new ObjectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('books');

            collection.findOne({
                _id: id
            }, function(err, results) {
                
                var description = service.getBookDetailsFromId(results.bookId, function(err,book){
                    results.description = book.description;
                    res.render('bookView', {
                        title: 'Book Details',
                        nav: nav,
                        book: results
                    });
                    db.close();            
                });
                
            });
        });

    };
    
    var functions = {
        middleware : middleware,
        getIndex : getIndex,
        getById : getById
    };
    return functions;
};

module.exports = controller;