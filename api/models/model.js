'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please, enter the name of the user.']
  },
  surnames: {
    type: String,
    required: [true, 'Please, enter the surnames of the user.']
  },
  email: {
    type: String,
    required: [true, 'Please, enter the email of the user.']
  },
  phone: {
    type: Number
  },
  type_document: {
    type: [{
      type: String,
      enum: ['DNI', 'NIE', 'Passport']
    }],
    default: ['DNI'],
    required: [true, 'Please, enter the document type of the user.']
  },
  number_document: {
    type: String,
    required: [true, 'Please, enter the document number of the user.']
  },
  address: {
    type: String
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  updated_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Users', UserSchema);