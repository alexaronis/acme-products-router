import React, { useEffect } from 'react';//anything passed into useEffect() will run after the screen is rendered
import { 
  Route,
  Routes,//Routes are paths that used to get data from different pages or from the db 
  useLocation,//this hook finds the pathname to locate pages in the app/files in your code
  Link } from 'react-router-dom';//we need this library for Hashrouter whcih listens for a hashchange so that we don't have to do it. also listens for changes and subscribes 
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './store';
import Products from './Products';
import Home from './Home';


const App = ()=> {
  const { pathname } = useLocation();
  //const { products } = useSelector(state => state);
  const products = useSelector(state => state.products);//same result as line 15
  const dispatch = useDispatch();

  useEffect(()=> {
    dispatch(fetchProducts());
  }, []);
  return (//link 27 and 25 include if/and statements. we're basically seeing what the pathname is and changing the class to 'selected'
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

