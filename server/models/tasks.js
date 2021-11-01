const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const taskSchema= new Schema({
    task: String,
    devid: String
});
 
module.exports= mongoose.model('Task', taskSchema);