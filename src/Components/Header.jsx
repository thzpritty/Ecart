import React, { useEffect, useState } from 'react';
import { Badge } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import {searchProducts} from '../Redux/productsSlice'
import { useDispatch, useSelector } from 'react-redux';




function Header({insideHome}) {
  const dispatch = useDispatch()
  const [wishlistCount,setWishlistCount] = useState(0)
  const [cartCount,setCartCount] = useState(0)
  const { wishlist } = useSelector((state) => state.wishListReducer);
  const {cart} = useSelector((state) => state.cartReducer)

  useEffect(()=>{
    setWishlistCount(wishlist?.length)
    setCartCount(cart?.length)
  },[wishlist,cart])
  return (
    <>
      <Navbar expand="lg" className="bg-light">
        <Container>
          <Navbar.Brand as={Link} to="/"><i className="fa-solid fa-store"></i>  Eekky-Kart</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className='ms-auto'>
           { insideHome&& <Nav.Link className=''>
              <input onChange={e=>dispatch(searchProducts(e.target.value.toLowerCase()))} type="text" className='form-control' placeholder='searchProducts' style={{width:'500px', height:'40px', margin:'auto'}} />
            </Nav.Link>}
            </Nav>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/wishlist">Wishlist <i className="fa-solid fa-heart"></i> <Badge>{wishlistCount}</Badge></Nav.Link>
              <Nav.Link as={Link} to="/cart">Cart <i className="fa-solid fa-cart-shopping"></i> <Badge>{cartCount}</Badge></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;