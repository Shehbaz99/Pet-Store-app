const { Schema, model } = require('mongoose')

const db = require('../config/database')
const mongoose = require('mongoose')


const pictureSchema = new mongoose.Schema({
  data: Buffer,
  contentType: String,
  fileName: String,
});

const petsSchema = new Schema({

  sellerId: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Reference the 'user' model for the seller information
    required: true,
  },

  breed: {
    type: String,
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
  },
  sellerName: {
     type: String, 
     default: "" 
    },
  sellerNumber: { 
    type: String, 
    default: "" 
  },
  images: {
    type: [String],
    required: true,
  },
  createdOn: { type: Date },
  updatedOn: { type: Date },
});

petsSchema.pre('save', function (next) {
  this.createdOn = new Date();
  this.updatedOn = new Date();

  next();
});

petsSchema.pre(['update', 'FindOneAndUpdate', 'updateOne'], function (next) {
  const update = this.getUpdate();
  delete update._id;
  this.updatedOn = new Date();

  next();
});
const petsModel = db.model('products', petsSchema);
module.exports = { pictureSchema, petsModel };

