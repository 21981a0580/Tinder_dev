const express = require("express");
const connectDB = require("./config/database")
const app = express();
const User = require("./models/user"); 
const { validateSignUpData } = require("./utils/validation");
const bcrypt=require("bcrypt");

app.use(express.json());



app.post("/signup", async (req, res) => {
    try{
    validateSignUpData(req.body);

    const{firstName,lastName,emailId,password}=req.body;

    const passwordHash=await bcrypt.hash(password,10);
    console.log(passwordHash);

    const newUser=new User({
        firstName,
        lastName,
        emailId,
        password:passwordHash

    });

    
    await newUser.save();
    res.send("User data added successfully");
    }
    catch(err){
        res.status(500).send(err.message);
    }
});

app.post("/login",async (req,res)=>{
    try{
    const{emailId,password}=req.body;
    const user=await User.findOne({emailId:emailId});
    if(!user){
        throw new Error("Email id not registered yet");
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);
    if(isPasswordValid){
        res.send("Login Sucessfully")
    }
    else{
        throw new Error("passwword is wrong");
    }

}
catch(err){
    res.status(400).send(err.message);
}

})


app.get("/user", async (req, res) => {
   const userEmail = req.body.emailId;
 try{
    const users=await User.find({
        emailId:userEmail
    });
    if(users.length===0){
        res.status(404).send("user not found");
    }
    else{
        res.send(users);
    }
 }
 catch(err){
    res.status(400).send("Something went wrong");
 }

});

app.get("/feed",async (req,res)=>{
    try{
        const users=await User.find({});
        res.send(users);
    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

app.delete("/user",async (req,res) => {
    const userId=req.body.userId;
    try{
        const user=await User.findByIdAndDelete(userId);  
        res.send("user deleted successfully");
    }
    catch(err){
        res.status(400).send("something went wrong");
    }


});

app.patch("/user/:userId", async(req,res)=>{
    const userId=req.params?.userId;
    const data=req.body;

    
    try{
        const Allowed_update=["about","gender","age"];
        const isUpatedAllowed=Object.keys(data).every((k)=>
          Allowed_update.includes(k));
        if(!isUpatedAllowed){
            throw new Error("update not allowed");
        }
        const user =await User.findByIdAndUpdate({_id:userId},data,{
            returnDocument:"after",
            runValidators:true,
        })
         res.send("user updated sucessfully")
    }
    catch(err){
        res.status(400).send("UPDATE FAILED:   "+err.message);
    }
})





connectDB().then(() => {
    console.log("database connected");
    app.listen(7777, () => {
    console.log("server listening on port 7777....")
})
}).catch((err) => {
    console.log("database not connected");
})

