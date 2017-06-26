'use strict';

var mongoose = require('mongoose'),
  Users = mongoose.model('Users');

exports.getUsers = function(req, res) {
  Users.find({}, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.getUser = function(req, res) {
  Users.findById(req.params.userId, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.createUser = function(req, res) {
  var new_user = new Users(req.body);
  new_user.save(function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.updateUser = function(req, res) {
  Users.findOneAndUpdate(req.params.userId, req.body, {new: true}, function(err, user) {
    if (err) res.send(err);
    res.json(user);
  });
};

exports.deleteUser = function(req, res) {
  Users.remove({_id: req.params.userId}, function(err, user) {
    if (err) res.send(err);
    res.json({ message: 'Users successfully deleted' });
  });
};
