import React, { useEffect } from 'react';
import { 
  Route,
  Routes,
  useLocation,
  Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './store';
import Products from './Products';
import Home from './Home';


const App = ()=> {
  const { pathname } = useLocation();
  //const { products } = useSelector(state => state);
  const products = useSelector(state => state.products);
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
  }, []);
  return (
    <div>
      <nav>
        <Link to='/' className={ pathname === '/' ? 'selected': ''}>Home</Link>
        <Link to='/products'
          className={ pathname.startsWith('/products') ? 'selected': ''}>Products ({ products.length })</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <Products /> } />
      </Routes>
    </div>
  );
};

export default App;

