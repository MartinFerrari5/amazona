import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import { GrayButton } from "../Assets/GrayButton";
export const ProductItem = ({product, addToCartHandler}) => {
    const navigate = useNavigate()
    return (<div className="border-black border-2 border-solid p-1 cursor-pointer"
    onClick={(e)=>{
      console.log(`product/${product.slug}`)
        navigate(`product/${product.slug}`)
    }}>
          <img src={product.image} alt="shirt" />
          <p className="text-cyan-600 font-bold text-2xl capitalize " >{product.name}</p>
          <Rating rating={product.rating}
          reviews={product.numReviews}/>
          <p className="text-green-600 font-bold">${product.price}</p>
          {product.countInStock>0 ? <button type="button" className="bg-blue-600  p-2 rounded-md text-white font-bold border-solid border-black border hover:bg-blue-200 hover:text-blue-600 transition-all duration-150" onClick={(e)=>{
            e.stopPropagation()
            addToCartHandler(product)
          }}> Add to cart  </button> :
          <GrayButton text="Out of Stock" />
         }
          
    </div>
    )
}