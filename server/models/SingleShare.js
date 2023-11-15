const mongoose = require('mongoose');
const {Schema} = mongoose;

const singleShareSchema = new Schema({
    sender : {type:mongoose.Schema.Types.ObjectId},
    receivee :{type:mongoose.Schema.Types.ObjectId},
    file : String,
});

const SingleShareModel = mongoose.model('SingleFile', singleShareSchema);

module.exports = SingleShareModel;