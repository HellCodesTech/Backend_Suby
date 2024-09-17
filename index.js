//pakages
const express=require('express')
const dotEnv=require('dotenv')
const mongoose=require('mongoose');
const bodyparser=require('body-parser')
const cors=require('cors')
//imports routes
const vendorRuotes=require('./routes/vendorRoutes')
const firmRoutes=require('./routes/firmRoutes')
const productRoutes=require('./routes/productRoutes')
const path=require('path')
//
const app=express();
dotEnv.config()
app.use(cors())


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
app.listen( process.env.PORT||5000)
console.log("server started:portnumber:=>5000")

app.use('/',(req,res)=>{
    res.send('<h1>welcome</h1>')
})