'use strict';
module.exports = function(app) {
  var usersController = require('../controllers/controller');

  app.route('/users')
    .get(usersController.getUsers)
    .post(usersController.createUser);

  app.route('/users/:userId')
    .get(usersController.getUser)
    .post(usersController.updateUser)
    .delete(usersController.deleteUser);

};
