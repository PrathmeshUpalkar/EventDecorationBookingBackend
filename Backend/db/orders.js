const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({

    name:String,
    city:String,
    email:String,
    contact:String,
    ename:String,
    date:String
})
module.exports = mongoose.model('orders',orderSchema)