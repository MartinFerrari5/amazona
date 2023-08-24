import { Router } from "express";
import expressAsyncHandler from "express-async-handler"
import {data, users} from "../data/data.js"
import { connection,productModel, userModel, orderModel } from "../database/connection.js";
import { getData } from "../database/functions.js";
import bcrypt from "bcrypt"
import { generateToken, isAuth } from "../utils.js";
const router = Router();
connection()

router.get("/", async (req, res)=>{
    try{
        const createdProducts = await productModel.insertMany(data)
        res.send(data)
        
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
})
router.get("/data",getData)
router.get("/data/:slug", async(req,res)=>{
    const {slug} = req.params
    const item = await productModel.findOne({slug:slug})
    res.send(item)
    console.log(item)
})
router.get("/create/user", async(req,res)=>{
  try {
    
    const usersData = await userModel.insertMany(users)
   
  } catch (error) {
    res.status(500).json({message:error.message})
  }
    // console.log(usersData)
})
router.get("/users", async(req,res)=>{
    try {
      
      const usersData = await userModel.find({})
     res.send(usersData)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
      // console.log(usersData)
  })
  router.get("/user/:id", async(req,res)=>{
    const {id} = req.params
    
    try {
      
      const usersData = await userModel.findById(id)
     
     res.send(usersData)
    } catch (error) {
      res.status(500).json({message:error.message})
    }
      // console.log(usersData)
  })

  // updateUser
  router.put("/updateUser/:id",async(req,res)=>{
    const {id} = req.params
    const {name, email, password} = req.body
    console.log(req.body)
   try {
    
    const updated = await userModel.findById(id)
    // console.log(updated)
    if(updated){
      updated.name= name.trim() 
     
      const emailExists = await userModel.findOne({email:email})
      
      if(emailExists && updated.email==emailExists.email){
        updated.email= email
      }else if(emailExists && emailExists.email==email){
        return res.status(500).send({message:"Email already exists"})
      }
      else {
        updated.email = email
      }

      if(password) updated.password=bcrypt.hashSync(password, 5)

      console.log(updated)
    }
   const updatedUser = await updated.save()
   
    res.send({
      _id: updatedUser._id,
      name:updatedUser.name,
      email:updatedUser.email,
      token: generateToken(updatedUser)
    })
   } catch (error) {
    res.status(404).json({messagge:error.message})
   }
   
    
  })
  
// expressAsyncHandler reconoce si hay un error en las funciones asincronas
router.post("/signIn", expressAsyncHandler(async(req,res)=>{
  try {
    const {email, password} = req.body
    const getUser = await userModel.findOne({email: email})
    console.log(getUser)
    if(getUser!==null){
      if(bcrypt.compareSync(password, getUser.password)){
        res.send({
          _id:getUser._id,
          name:getUser.name,
          email:getUser.email,
          isAdmin:getUser.isAdmin,
          token: generateToken(getUser)
        })
        console.log("pass")
      }
      else res.status(401).json({message: "Invalid email or password"})
    }else res.status(401).json({message: "User does not exist"})
   
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}))

router.post("/signUp",expressAsyncHandler(async(req,res)=>{
  try {
    const {password, email} = req.body
    req.body.password = bcrypt.hashSync(password, 5)

    const repeatedUser = await userModel.find({email:email})
    
    if(repeatedUser.length>0) return res.json({message: "This email already exists"})

    const newUser =  new userModel(req.body)
    await newUser.save()

    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: userModel.isAdmin,
      token: generateToken(newUser)
    })
   
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}))
router.post("/submitOrder",isAuth, async(req,res)=>{
  console.log(req.user)
  const order = await new orderModel(req.body).save()
  res.send(order)
})

router.get("/order/:id", async (req,res)=>{
  const {id} = req.params
  try {
    
    const order = await orderModel.findById(id)
    res.send(order)
  } catch (error) {
    res.status(500).json({message:error.message})
  }
})
router.put("/order/:id/pay", isAuth,async (req,res)=>{
  const {id} = req.params

  const order = await orderModel.findById(id)
  if(order){
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id : req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address : req.body.email_address
    }
    const updatedOrder = await order.save()
    res.status(200).send({message: "Order Paid", order: updatedOrder})
    // await orderModel.update({_id:id}, order)
  }else{
    res.status(404).send({message: "Order Not Found"})
  }
 
})
router.get("/history/:userId", isAuth ,async (req,res)=>{
  const {userId} = req.params
  const orders = await orderModel.find({userInfo: userId})
  res.send(orders)
})

export default router