var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var app = express();

var appName = "nChat";
var rooms = require('./data/rooms.json')

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render("index", { name: appName, title: "Home" });
});

app.get('/admin/rooms', function (req, res) {
    res.render("rooms", {
        name: appName,
        title: "Rooms",
        rooms: rooms
    });
});

app.get('/admin/rooms/add', function (req, res) {
    res.render("add", { name: appName, title: "Add Group" });
});

app.post('/admin/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.redirect('/admin/rooms');
});

app.get('/admin/rooms/delete/:id', function (req, res) {
    var id = req.params.id;

    rooms = rooms.filter(function (room) {
        return room.id !== id;
    });

    res.redirect('/admin/rooms');
});

app.listen(3000, function () {
    console.log("Live at port 3000");
});
