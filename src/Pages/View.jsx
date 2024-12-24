import React, { useEffect, useState } from 'react'
import {  Button} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToWishlist } from '../Redux/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';





function View() {
  const {id} = useParams()
  // The useParams() hook can be used to access the URL parameters of a Route. In web applications, URL parameters are often the part of the URL that references the specific information/resource that is to be fetched when the page is to be rendered.
  // console.log(id);
  const{loading}=useSelector((state)=>state.productReducer)
  const [product,setProduct] = useState({})
  const { wishlist } = useSelector((state) => state.wishListReducer);
  const dispatch = useDispatch()
  const { cart } = useSelector((state) => state.cartReducer);
  
  const handleWhishlist = (product) => {
    const existingProduct = wishlist.find(item => item?.id === product?.id);

    if (existingProduct) {
      alert('Item already exists in wishlist');
    } else {
      dispatch(addToWishlist(product));
    }
  };
  
  const handleCart = (product) => {
    const existingProduct = cart.find(item => item?.id === product?.id);

    if (existingProduct) {
      dispatch(addToCart(product));
      // alert('Items added');
    } else {
      dispatch(addToCart(product));
      // alert('Item added to cart');
    }
  };

  useEffect(()=>{
    const products = JSON.parse(localStorage.getItem("products"))
    setProduct(products?.find(product=>product?.id == id))
    // console.log(product);
    
  },[])
  
  return (
    <>
    <div className='container row' style={{marginTop:'100px'}}>
      <div className="col lg-4">
        <img style={{width:'100%',height:"400px"}} src={product.thumbnail}alt="" />
      </div>
      <div className="col lg-2"></div>
      <div className="col lg-6">
        <p>{product.id}</p>
        <h1>{product.title}</h1>
        <h5>{product.description}</h5>
        <div className="d-flex justify-content-between mt-4">
          <Button style={{color:'white'}} className='btn btn-outline-dark'  onClick={() => handleWhishlist(product)}> <i class="fa-regular fa-heart"></i>WishList</Button>
          <Button style={{color:'white'}} className='btn btn-outline-dark'onClick={() => handleCart(product)} > <i class="fa-solid fa-tarsh"></i>Add to Cart</Button>
        </div>
      </div>
      
    </div></>
  )
}

export default View