const mg = require('mongoose');
 
let connection = () =>{
    try {
        mg.connect('mongodb://localhost:27017/CRUD');
        console.log("Database connected....");
    } catch (error) {
        console.log("Error in connection..." + error);
    }
}

module.exports = connection;