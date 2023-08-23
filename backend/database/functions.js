import { connection ,productModel } from "./connection.js";
import mongoose from "mongoose";
connection()
export const getData =  async (req, res)=>{
    try {
     const dataDB = await productModel.find({})
     res.send(dataDB)
    } catch (error) {
     res.status(500).json({message: error.message})
    }
 }
