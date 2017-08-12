var mongodb = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var controller = function(){
    var getByUser = function(req,res)
    {
         var url = 'mongodb://localhost:27017/easyNotesApp';
        mongodb.connect(url,function(err,db){
            var collection = db.collection('notes');
            collection.find({}).toArray(function(err,results){
                res.json(results);
                db.close();
            });
            
        });
    };
    
    return {getByUser:getByUser};
};

module.exports=controller;