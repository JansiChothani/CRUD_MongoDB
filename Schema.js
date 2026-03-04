let mg = require('mongoose');

let MySchema = new mg.Schema({
    id: {
        type : Number,
        unique : true,
        required : true,
    },
    name : String,
    email : {
        type : String,
        unique : true
    }
})

let User = mg.model('User', MySchema);

module.exports = User;