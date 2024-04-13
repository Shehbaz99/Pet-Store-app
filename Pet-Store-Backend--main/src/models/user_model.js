const {Schema} = require('mongoose')
const db = require('../config/database')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

 const userSchema = new Schema({
    
    username: {type: String, default:"", required:true},
    email:{type:String, unique:true, required:true},
    phoneNumber:{type:String, default:"", required:true},
    password: {type:String, required:true},
    address: {type:String, default:""},
    city:{type:String, default:""},
    state:{type:String, default:"",  },
    profileProgress: {type:Number, default:0}, 
    resetToken: String,
    resetTokenExpiry: Date,
    updatedOn:{type:Date},
    createdOn:{type:Date},


 })

 userSchema.pre('save', function(next){
    this.id = uuid.v1();
    this.updatedOn = new Date();
    this.createdOn = new Date();

    //password ko unreadable banany k liye
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
 });

 userSchema.pre(['update','findOneAndUpdate', 'updateOne'], function(next){
    const update = this.getUpdate();
    delete update._id;
    delete update.id;

    this.updatedOn = new Date();
    next();
 });

 const userModel = db.model('User', userSchema);
 module.exports = userModel;
