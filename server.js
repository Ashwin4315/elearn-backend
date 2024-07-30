const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({path:"./config.env"});

mongoose.connect(process.env.DATABASE_CONNECTION)
.then(()=>console.log("Database is connected"))
.catch((error)=>console.log(error));

const PORT=process.env.PORT || 8000;

app.listen(PORT,()=>console.log("Server running"));