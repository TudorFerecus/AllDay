const express = require("express")
const app = express()

const connectionsRouter = require("./routes/connections.js");
const usersRouter = require('./routes/users.js');

const connectDB = require('./db/connect.js');

require('dotenv').config();

const port = process.env.PORT || 5000;
const mongo_uri = process.env.MONGO_URI;

app.use(express.json());

app.use('/api/v1/connections', connectionsRouter);
app.use('/api/v1/users', usersRouter);

const start = async () =>{
    try{
        await connectDB(mongo_uri);
        app.listen(port, ()=>{
            console.log(`server listening to port ${port}`);
        })
    }catch(error){
        console.log(error);
    }
}

start();