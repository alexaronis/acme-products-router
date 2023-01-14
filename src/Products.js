import React from 'react';
import { 
  Link,
  useLocation,
  useNavigate,
  useParams } from 'react-router-dom';//useParams() is hook that gets us the information about the parameters of an obect

import { useSelector, useDispatch } from 'react-redux';//redux allows us to use useSelector to access the store, and dispatch to show current changes
import { createProduct } from './store';


const Products = ()=> {
  const { products } = useSelector(state => state);
  const { id } = useParams();//deconstructed id using useParams which is getting the id from any object
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

  return (//on line 38, the if statement is determining the the selected id (product.id, or the id of the object on the page) is equal to the id(the id of the specific object you selected.)ofthe selected object
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
//the !! notnot operator in react turns something that is truthy or false into true or false.
//ie: if you take an empty string and do not youll get false, but if you do it again youll get true