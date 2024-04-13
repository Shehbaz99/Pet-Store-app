 
const mongoose = require('mongoose');
 
const connection = mongoose.createConnection('mongodb://127.0.0.1:27017/pets').on('open',()=>{
    console.log('MongoDB connect hoo gia hy');
}).on('error',()=>{
    console.log('MongoDB connect ni huwa hy')
});

module.exports = connection;