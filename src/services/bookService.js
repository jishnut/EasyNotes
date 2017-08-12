var http = require('http');
//var xml2json = require('xml2json');
//var parser = xml2json.Parser({explicitArray:false});

var service = function(){
    var getBookDetailsFromId = function(id, cb){
        var options = {
            host:'www.pokeapi.co',
            path: '/api/v2/ability/4/',
            method : 'GET'
        };
        
        var callback = function(response){
            var str = '';
            response.on('data',function(chunk){
                str = str+chunk;
            });
            
            response.on('end',function(){
                var strJson = JSON.parse(str);
                //parser.parseString(str,function(err,jsonStr){
                    cb(null, {description : strJson.name});                    
                //});              
            });
        };
        
        http.request(options,callback).end();
        
    };
    
    return {
        getBookDetailsFromId:getBookDetailsFromId
    };
    
};

module.exports = service;