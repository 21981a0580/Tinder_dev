const express = require("express");
const connectDB = require("./config/database")
const app = express();


const User = require("./models/user"); // Capitalize model name

app.post("/signup", async (req, res) => {
    const newUser = new User({
        firstName: "Siva",
        lastName: "koduru",
        emailId: "sivakoduru111@gmail.com",
        password: "Siva@123",
    });
    await newUser.save();
    res.send("User data added successfully");
});





connectDB().then(() => {
    console.log("database connected");
    app.listen(7777, () => {
    console.log("server listening on port 7777....")
})
}).catch((err) => {
    console.log("database not connected");
})

