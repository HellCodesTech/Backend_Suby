//pakages
const express=require('express')
const dotEnv=require('dotenv')
const mongoose=require('mongoose');
const bodyparser=require('body-parser')
//imports routes
const vendorRuotes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const path=require('path')
//
const app=express();
dotEnv.config()


//data base connection
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>console.log("mongodb connected succussfully...."))
 .catch((error)=>console.log(error))
 //middle wares
 app.use(bodyparser.json())
 app.use('/vendor',vendorRuotes)
 app.use('/firm',firmRoutes)
 app.use('/product',productRoutes)
 app.use('/uploads',express.static('uploads'));
//server port number 
app.listen(5000)
console.log("server started:portnumber:=>5000")