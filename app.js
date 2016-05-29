var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var adminRouter = require('./admin');
var apiRouter = require('./api');

app.set('views', './views');
app.set('view engine', 'jade');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/admin', adminRouter);
app.use('/api', apiRouter);

app.get('/', function (req, res) {
    res.render("home", { title: "Home" });
});

app.listen(3000, function () {
    console.log("Live at port 3000");
});
