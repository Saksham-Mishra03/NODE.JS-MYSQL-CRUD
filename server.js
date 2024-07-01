const express = require('express')
const morgan =  require('morgan')
const dotenv = require('dotenv');
const mySqlPool = require('./config/db');

//configure env
dotenv.config();

//rest object
const app = express()

//middlewares
app.use(express.json());
app.use(morgan("dev"));


//routes
app.use("/api/v1/student", require("./routes/studentsRoutes"));

app.get("/test",(req,res)=>{
    res.status(200).send('<h1> Nodejs Mysql crud project running well </h1>')
})


//port
const port = process.env.PORT;

//conditionally listen
mySqlPool
    .query('SELECT 1')
    .then(()=>{

        //MYSQL
        console.log("Mysql db connected");
        //listen
        app.listen(port,()=>{
            console.log(`server running on port ${process.env.PORT}`);
        })
})
.catch((error)=>{
    console.log(error);
});



