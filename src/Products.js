import React from 'react';
import { 
  Link,
  useLocation,
  useNavigate,
  useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { createProduct } from './store';


const Products = ()=> {
  const { products } = useSelector(state => state);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const product = products.find(product => product.id === id);

  const create = async()=> {
    try {
      const product = { name: Math.random() };
      dispatch(createProduct(product, navigate));
    }
    catch(ex){
      console.log(ex);
    }
  };

  return (
    <div>
      <h2><Link to='/products'>Products</Link></h2>
      <ul>
        {
          products.map( product => {
            return (
              <li key={ product.id } className={ id === product.id ? 'selected': ''}>
                <Link to={`/products/${product.id}`}>
                  { product.name }
                </Link>
              </li>
            );
          })
        }
      </ul>
      {
        !!product && <div>Details for { product.name }</div>
      }
      <button onClick={ create }>+</button>
    </div>
  );
};

export default Products;
