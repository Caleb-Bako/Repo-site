const mongoose = require('mongoose');
const {Schema} = mongoose;

const staffSchema = new Schema({
    owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    name:String,
    profile:[String]
});

const StaffModel = mongoose.model('Staff', staffSchema);

module.exports = StaffModel;