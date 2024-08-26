"use client"
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../../components/Header';
import { fetchProductById } from '../../store/productsSlice';
import { addToCart } from '../../store/cartSlice';
import { Container, Card, Button } from 'react-bootstrap';
import { StarFill, StarHalf, Star as StarEmpty } from 'react-bootstrap-icons';




const ProductDetail = () => {
  const router = useRouter();
  const params = useParams();

  console.log(params)


  const { id } = params;
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.product);
  const status = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [id, dispatch]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(rating)) {
        stars.push(<StarFill key={i} />);
      } else if (i < rating) {
        stars.push(<StarHalf key={i} />);
      } else {
        stars.push(<StarEmpty key={i} />);
      }
    }
    return stars;
  };


  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <>
      <Header />
      <Container>
        {product && (
          <Card className="mb-4">
            <Card.Img variant="top" src={product.thumbnail} style={{ width: '200px', height: '200px' }} />
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>{product.description}</Card.Text>
              <Card.Text>Price: ${product.price}</Card.Text>
              <Card.Text>Rating: {renderStars(product.rating)} ({product.rating})</Card.Text>
              <Button variant="primary" onClick={() => dispatch(addToCart(product))}>Add to Cart</Button>
            </Card.Body>
          </Card>
        )}
      </Container>
    </>
  );
};

export default ProductDetail;
