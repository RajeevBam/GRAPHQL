const mongoose =require('mongoose');
const Schema=mongoose.Schema;

const devSchema= new Schema({
    name: String,
});
 
module.exports= mongoose.model('Developer', devSchema);