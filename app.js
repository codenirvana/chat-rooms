var express = require('express');
var app = express();

var appName = "nChat";

app.use(express.static('public'));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render("index", { name: appName, title: "Home" });
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", { name: appName, title: "Rooms" });
});

app.listen(3000, function () {
    console.log("Live at port 3000");
});
