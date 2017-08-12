var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
var port = process.env.PORT || 5000;

var nav = [
            {
                link: '/books',
                text: 'Book'
            },
            {
                link: '/authors',
                text: 'Author'
            }
                ];

var bookRouter = require('./src/routes/bookRoutes.js')(nav);
var adminRouter = require('./src/routes/adminRoutes.js')(nav);
var authRouter = require('./src/routes/authRoutes.js')(nav);
var notesRouter = require('./src/routes/notesRoutes.js')();

var _dirname = 'src/views/';

app.use(express.static('public'));
//app.set('views', './src/views');
//app.set('view engine', 'ejs');
app.use(express.static('src/views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret:'library'}));
require('./src/config/passport.js')(app);

app.use('/books', bookRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/notes', notesRouter);

app.get('*', function (req, res) {
    res.sendfile(_dirname+'layout.html');
});



app.listen(port, function (err) {
    console.log('Server running on port : ' + port);
});
