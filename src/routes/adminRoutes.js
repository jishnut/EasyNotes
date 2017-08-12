var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

var notes = [{title:'First Note',
              content:'First Note Content',
             images:[{image:null,
                    location:{
                         latitude : 12.9716,
                         longitude : 77.5946
                         }
                     }]
             },
            {title:'Second Note',
              content:'Second Note Content',
             images:[{image:null,
                    location:{
                         latitude : 12.9716,
                         longitude : 77.5946
                         }
                     }]
             },
                 {title:'Third Note',
              content:'Third Note Content',
             images:[{image:null,
                    location:{
                         latitude : 12.9716,
                         longitude : 77.5946
                         }
                     }]
             },
                 {title:'Fourth Note',
              content:'Fourth Note Content',
             images:[{image:null,
                    location:{
                         latitude : 12.9716,
                         longitude : 77.5946
                         }
                     }]
             },
                 {title:'Fifth Note',
              content:'Fifth Note Content',
             images:[{image:null,
                    location:{
                         latitude : 12.9716,
                         longitude : 77.5946
                         }
                     }]
             }];

var route = function(nav){
    
    adminRouter.get('/addNotes',function(req,res){
        var url = 'mongodb://localhost:27017/easyNotesApp';
        mongodb.connect(url,function(err,db){
            var collection = db.collection('notes');
            collection.insertMany(notes,function(err,results){
                res.send(results);
                db.close();
            });
        });
        
    });
    
    return adminRouter;
};

module.exports = route;