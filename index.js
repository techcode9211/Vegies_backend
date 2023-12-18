const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv').config()
const User=require('./db/User')
const Product=require('./db/Product')

const app=express()
app.use(cors())
app.use(express.json({limit:'10mb'}))

const PORT=process.env.PORT||8080

console.log(process.env.MONGODB_URL)
mongoose.set("strictQuery",false)
mongoose.connect(process.env.MONGODB_URL).then(()=>console.log("Connect to database"))
.catch((err)=>{console.log(err)})

app.get('/',(req,resp)=>{
    resp.send("Server is running")
})

app.post('/signup',async (req,resp)=>{
    const data= await User.findOne({email:req.body.email})
    if(data){
        resp.send({message:'Email id is already taken',alert:false})
    }else{
        const user=new User(req.body)
        let Result=await user.save()
        resp.send({Result,message:'Registration Sucessful',alert:true})
    }
    // console.log(req.body)
})

app.post('/login', async (req,resp)=>{
    console.log(req.body)
    const result= await User.findOne({email:req.body.email})
    if(result)
    {
        console.log(result)
        const datasend={
            _id:result._id,
            firstName:result.firstName,
            lastName:result.lastName,
            email:result.email,
            image:result.image
        }
        resp.send({message:'Login is Successfully',alert:true,data:datasend})
        console.log(datasend)
    }else{
        resp.send({message:'This email id is not available',alert:false})
    }
})

app.post('/uploaddata',async (req,resp)=>{
    // console.log(req.body)
    const product=new Product(req.body)
    let Result=await product.save()
     resp.send({Result,message:'Product Added Successfully'})
})

app.get('/product',async(req,resp)=>{
    const Result=await Product.find({})
    resp.send(JSON.stringify(Result))
})

app.listen(PORT,()=>console.log("Server is runnig at port: "+PORT))