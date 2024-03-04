const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const address_schema = mongoose.Schema({
    city: {
        type:String,
        required:true
    },
    street: {
        type:String,
        required:true
    },
    building: {
        type:String,
        required:true
    }
});

const child_schema = mongoose.Schema({
    child_id: {
        type:Number
    },
    fullname: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    level: {
        type:String,
        enum:["PreKG","KG1","KG2"],
        required:true
    },
    address: address_schema,
}
);
child_schema.plugin(autoIncrement, {inc_field:"child_id"});

module.exports = mongoose.model('Child',child_schema);