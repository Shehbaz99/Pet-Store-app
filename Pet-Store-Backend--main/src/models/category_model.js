const {Schema, model} = require('mongoose')
const db = require('../config/database')


const categorySchema = new Schema({
    title:{type:String,    required:true},
    description:{type:String, default:""},
    image:{type:Array, default:[]},

    createdOn:{type:Date},
    updatedOn:{type:Date},
});

categorySchema.pre('save', function(next){
this.createdOn = new Date();
this.updatedOn = new Date();

next();
});

categorySchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();
    delete update._id;
     this.updatedOn = new Date();

    next();
});
const categoryModel = db.model('category', categorySchema);
module.exports = categoryModel;