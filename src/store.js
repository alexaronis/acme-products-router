import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';//
import logger from 'redux-logger';
import axios from 'axios';
//seperate the db always  
const products = (state = [], action)=> {
  if(action.type === 'SET_PRODUCTS'){
    return action.products;
  }
  if(action.type === 'CREATE_PRODUCT'){
    return [...state, action.product ];
  }
  return state;
};

const reducer = combineReducers({ products });

const store = createStore(reducer, applyMiddleware(thunk, logger));//thukn allows us to put async code closer to our redux store

export const fetchProducts = ()=> {//a thuunk alows us to use async and post/delete data from the api. it also defines the condition in which things in the store will change (like 'type') it interacts with useDispatch and getState
  return async(dispatch)=> {
    const response = await axios.get('/api/products');
    dispatch({ type: 'SET_PRODUCTS', products: response.data });
  }
};

export const createProduct = (product, navigate)=> {
  return async(dispatch)=> {
    const response = await axios.post('/api/products', product);
    const created = response.data;
    dispatch({ type: 'CREATE_PRODUCT', product: created });
    navigate(`/products/${created.id}`);
  }
};

export default store;
