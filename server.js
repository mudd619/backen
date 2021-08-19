const express = require("express");

const mongoose = require("mongoose")

const app = express();

app.use(express.json())


//to connect express to mongodb
const connect = ()=>{
    return mongoose.connect("mongodb://127.0.0.1:27017/entertainment",{
        useNewUrlParser :true,
        useUnifiedTopology:true,
        useCreateIndex:true
    })
}

//creating schema
const userSchema = new mongoose.Schema({
    id : String,
    movie_name : String,
    movie_genre : String,
    production_year : Number,
    budget : Number
},{
    versionKey : false
})

//tell mongoose to create a collection inside mongodb with the given schema and creeate a model to interact with mongodb
const User = mongoose.model("data",userSchema);

//run the connect function

app.post("/users",async (req,res)=>{
    const user = await User.create(req.body)
    return res.send(user)
})

app.get("/users",async (req,res)=>{
    const users = await User.find().lean().exec();
    return res.send(users);
})

app.get("/single",async (req,res)=>{
    const users = await User.findOne().lean().exec();
    return res.send(users);
})

app.get("/users/:id",async (req,res)=>{
    const users = await User.findById(req.params.id).lean().exec();
    console.log(req.params)
    return res.send (users);
})

app.patch("/users/:id",async (req,res)=>{
    const users = await User.findByIdAndUpdate(req.params.id , req.body ,{new : true}).lean().exec();
    return res.send(users);
})

app.delete("/users/:id", async (req,res)=>{
    const users = await User.findByIdAndDelete(req.params.id).lean().exec();
    return res.send(users)
})

app.listen(2150,async ()=>{
    await connect()
    console.log("Listening to port 2150")
})