var express = require('express');
var uuid = require('node-uuid');
var _ = require('lodash');

var rooms = require('./data/rooms.json')

var router = express.Router();
module.exports = router;

router.get('/rooms', function (req, res) {
    res.render("rooms", {
        baseUrl: req.baseUrl,
        title: "Rooms",
        rooms: rooms
    });
});

router.get('/rooms/add', function (req, res) {
    res.render("add", {
        baseUrl: req.baseUrl,
        title: "Add Room"
    });
});

router.post('/rooms/add', function (req, res) {
    var room = {
        name: req.body.name,
        id: uuid.v4()
    };

    rooms.push(room);

    res.redirect(req.baseUrl + '/rooms');
});

router.get('/rooms/delete/:id', function (req, res) {
    var id = req.params.id;

    rooms = rooms.filter(r => r.id !== id);

    res.redirect(req.baseUrl + '/rooms');
});

router.get('/rooms/edit/:id', function (req, res) {
    var id = req.params.id;
    var room = _.find(rooms, r => r.id === id);

    if(!room) {
        res.sendStatus(404);
        return;
    }

    res.render('edit', {
        baseUrl: req.baseUrl,
        title: "Edit Room", room
    });
});

router.post('/rooms/edit/:id', function (req, res) {
    var id = req.params.id;
    var room = _.find(rooms, r => r.id === id);

    if(!room) {
        res.sendStatus(404);
        return;
    }

    room.name = req.body.name;

    res.redirect(req.baseUrl + '/rooms');
});
