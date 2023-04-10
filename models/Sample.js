'use strict'

// import modules
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create schema
const SampleSchema = new Schema({
  'id': {
    type: Number
  },
  'first_name': {
    type: String
  },
  'last_name': {
    type: String
  },
  'email': {
    type: String
  },
  'gender': {
    type: String
  },
})

mongoose.model('sample', SampleSchema)
