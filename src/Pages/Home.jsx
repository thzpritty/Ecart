import React, { useEffect } from 'react';
import { Button, Card, Col, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../Redux/productsSlice';
import { addToWishlist } from '../Redux/wishListSlice';
import { addToCart } from '../Redux/slice/cartSlice';
import Header from '../Components/Header';

function Home() {
  const dispatch = useDispatch();
  const { loading, products } = useSelector((state) => state.productReducer);
  const { wishlist } = useSelector((state) => state.wishListReducer);
  const { cart } = useSelector((state) => state.cartReducer);

  const handleWishlist = (product) => {
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

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
     
      
        {loading ? (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="dark" />
            Loading...
          </div>
        ) : (
          <div className="container mt-4">
            <Row className="justify-content-center">
              {products?.length > 0 ? (
                products.map((product) => (
                  <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="d-flex justify-content-center mb-4">
                    <Card
                      style={{ width: '18rem', height: 'auto', cursor: 'auto', transition: 'transform 0.3s' }}
                      className="shadow-lg border-0 custom-card"
                    >
                      <Link to={`/view/${product.id}`}>
                        <Card.Img variant="top" style={{ width: "100%", height: "250px", objectFit: "cover" }} src={product.thumbnail} />
                      </Link>
                      <Card.Body>
                        <Card.Title>{product.title.slice(0, 10)}</Card.Title>
                        <Card.Text>
                          {product.description.slice(0, 20)}
                        </Card.Text>
                        <div className="d-flex justify-content-between">
                          <Button onClick={() => handleWishlist(product)} variant="outline-danger">
                            <i className="fa-regular fa-heart"></i>
                          </Button>
                          <Button onClick={() => handleCart(product)} variant="outline-primary">
                            <i className="fa-solid fa-cart-shopping"></i>
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              ) : (
                <div>
                  <p>Nothing to show here</p>
                </div>
              )}
            </Row>
          </div>
        )}
    </>
  );
}

export default Home;