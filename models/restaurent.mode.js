// const { ObjectId } = require('mongoose');
const { ObjectId } = require('mongoose');
const mongoose = require('mongoose');

const restSchema = mongoose.Schema({
    name: String,
    address: {
    // _id: ObjectId,
    street: String,
    city: String,
    state: String,
    country: String,
    zip: String
  },
  menu: [{
    // _id: ObjectId,
    name: String,
    description: String,
    price: Number,
    image: String
  }]
})

const Restaurant=mongoose.model('Restaurant',restSchema);

module.exports={Restaurant}