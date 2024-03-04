const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const class_schema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    supervisor: {
        type:mongoose.ObjectId,
        ref:'Teacher',
        required:true
    },
    children: [{
        type:Number,
        ref:'Child'
    }]
},
{_id:false}
);
class_schema.plugin(autoIncrement, {in_field:"class_id"});

module.exports = mongoose.model('Class',class_schema);