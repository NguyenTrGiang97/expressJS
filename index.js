const express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-Parser')

var userRoute = require('./routes/user.route');
var authRoute = require('./routes/auth.route')

var authMiddleWare = require('./middlewares/auth.middleware')


var port = 3000;

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('kwwelkqwmek2312la'));

app.use(express.static('public'));

app.get('/', function (request, response) {
    response.render('index', {
        name: 'property name'
    });
});

app.use('/users', authMiddleWare.requireAuth, userRoute);

app.use('/auth', authRoute);

app.listen(port, function () {
    console.log('Server listening on port ' + port)
});