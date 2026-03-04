let express = require('express');
let app = express();
let connection = require('./Connection');
let User = require('./Schema');

app.use(express.json());

connection();

app.post('/user', async (req, res) => {
    try {
        let count = await User.countDocuments();
        let user = new User({
            id: count + 1,
            name: req.body.name,
            email: req.body.email
        });
        let result = await user.save();
        res.send({
            message: "User Added Successfully",
            data: result
        })
    }
    catch (error) {
        res.send({
            message: "Error in inserting..." + error
        })
    }
})

app.get('/user', async (req, res) => {
    try {
        let result = await User.find();
        res.send({
            message: "Data fecthing successfully...",
            data: result
        })
    }
    catch (err) {
        res.send({
            message: "Error in fetching"
        })
    }
})

app.put('/user/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { name, email } = req.body;
        const user = await User.findOne({ id: id });
        if (!user) {
            res.send("User not found");
        }
        user.name = name;
        user.email = email;
        const result = await user.save();
        res.send({
            message: "User updated successfully....",
            data: result
        })
    }
    catch (error) {
        console.log(error);
        res.send({
            message: "Error in updating..."
        })
    }
})

app.delete('/user/:id', async (req,res) => {
    try{
        const id = req.params.id
        const result = await User.deleteOne({ id : id });
        res.send({
            message : "User deleted successfully...",
            data : result
        })
    }
    catch(err){
        console.log(err);
        res.send({
            message : "Error in deleting user..."
        })
    }
})

app.listen(3000, () => {
    console.log("server is running on port 3000...");
})