import mongoose,  {Schema} from "mongoose"
import  dotenv from 'dotenv'
dotenv.config()
const uri = process.env.MONGOOSE_URI

export const connection = async () => {
    try {
        await mongoose.connect(uri)
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

export const productSchema = new Schema ({
    name : {
        type : String,
        required : true,
        trim: true,
        unique: true
    },
    description : {
        type : String,
        required : true,
        trim: true
    },
    price : {
        type : Number,
        required : true,
        trim: true
    },
    slug:{
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    category:{
        type: String,
        require: true,
        trim: true
    },
    countInStock:{
        type: Number,
        require: true,
        trim: true
    },
    brand:{
        type: String,
        require: true,
        trim: true
    },
    rating:{
        type: Number,
        trim: true
    },
    numReviews:{
        type: Number,
        trim: true
    },
    image : {
        type: String
    }
},
{
    // timestamps generates the date when the piece of data was created 
    timestamps: true
}
)




export const productModel = mongoose.model("product", productSchema)

const userSchema = new mongoose.Schema(
    {
      name: { type: String },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      isAdmin: { type: Boolean, default: false, required: true },
    },
    {
      timestamps: true,
    }
  );
  
  export const userModel = mongoose.model('User', userSchema);

const orderSchema = new mongoose.Schema({
    cartItems: {type:Object, required:true},
    shippingData:{type:Object,
    required: true},
    paymentMethod: {type:String,
    required:true},
    shippingPrice: {type:Number, required:true},
    tax:{type:Number, required: true},
    total:{type:Number, required:true},
    totalMoney:{type:Number, required:true},
    paymentResult:{
        id:String,
        status:String,
        update_time: String,
        email_address: String
    },
    userInfo:{type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    isPaid: {type: Boolean, default:false},
    paidAt: {type: Date},
    isDelivered: {type: Boolean, default: false},
    deliveredAt: {type:Date}
},
{
  timestamps: true,
})

export const orderModel = mongoose.model("Order", orderSchema)
