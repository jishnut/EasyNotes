var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = express.Router();

var route = function () {
    authRouter.route('/sign-up')
        .post(function (req, res) {
            var url = 'mongodb://localhost:27017/easyNotesApp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.username,
                    password: req.body.password
                };
                collection.insert(user, function (err, results) {
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });
        });

     authRouter.route('/login')
                 .post(passport.authenticate('local',{
                     failureRedirect:'/'
                 }),function(req,res){
                     res.redirect('/auth/profile');
                 });
   /* authRouter.route('/login').post(function (req, res, next) {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json({
                    err: info
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return res.status(500).json({
                        err: 'Could not log in user'
                    });
                }
                
        console.log(req.user);
                res.status(200).json(req.user);
            });
        })(req, res, next);
    });*/

    authRouter.route('/logout').get(function (req, res) {
        req.logout();
        res.status(200).json({
            status: 'Bye!'
        });
    });
    authRouter.route('/profile')
        .get(function (req, res) {
            res.json(req.user);
        });
    authRouter.route('/user-status').get(function (req, res) {
        console.log(req.user);
        if (!req.user) {
            return res.status(200).json({
                status: false
            });
        }
        req.user.status=true;
        res.status(200).json(req.user);
    });

    return authRouter;
};

module.exports = route;
