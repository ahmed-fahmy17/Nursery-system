const mongoose = require('mongoose');

const teacher_schema = mongoose.Schema({
    fullname: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    image: {
        type:String
    }
})

module.exports = mongoose.model('Teacher',teacher_schema);