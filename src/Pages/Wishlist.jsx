import React from 'react'
import { Row, Col, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeWishlist } from "../Redux/wishListSlice";
import { addToCart } from '../Redux/slice/cartSlice';



function Whishlist() {
  const dispatch = useDispatch()
  const { wishlist } = useSelector((state) => state.wishListReducer)
  const handleCart=(product)=>{
      dispatch(removeWishlist(product.id))
    dispatch(addToCart(product))
  }
  return (
  <>
    <div>
      <Row className='mt-2 container'>{
        wishlist?.length > 0 ? wishlist.map(product => (
          <Col className='mt-5 ms-3' sm={12} md={6} lg={4} xl={3}>
            <Card style={{ width: '18rem', height: '' }}>
              <Link to={'/view/1'}>
                <Card.Img variant="top" style={{ width: "100%", height: "250px" }} src={product.thumbnail} />
              </Link>
              <Card.Body>
                <Card.Title>{product.title.slice(0, 10)}</Card.Title>
                <Card.Text>
                  {product.description.slice(0, 20)}
                </Card.Text>
                <div className="d-flex justify-content-between">
                 
                  <Button  onClick={()=>dispatch(removeWishlist(product?.id))}>
                    <i class="fa-solid fa-trash"></i>
                  </Button>
                  <Button onClick={()=>(handleCart(product))}>
                    <i class="fa-solid fa-cart-shopping"></i>
                  </Button>
                </div>


              </Card.Body>
            </Card>
          </Col>
        )) : <div className='d-flex align-items-center mt-5 '>
          <img style={{ width: '300px', height: '300px', marginLeft: '200px' }} src="https://schoolville.com/assets/img/empty-cart-illustration.gif" alt="" />
          <h1>You're Wishlist is empty</h1>

        </div>
      }

      </Row>
    </div>
    </>
  )
}

export default Whishlist