import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Route, Routes, Link, useLocation, useParams } from 'react-router-dom';


//TODO - separate files for Home Products
const Home = ()=> {
  return (
    <h2>Welcome to Acme Products</h2>
  );
};

const Products = ()=> {
  const { id } = useParams();

  const products = [
    { id: 1, name: 'foo' },
    { id: 2, name: 'bar' },
    { id: 3, name: 'bazz' },
  ];

  const product = products.find(product => product.id === id * 1);

  return (
    <div>
      <h2><Link to='/products'>Products</Link></h2>
      <ul>
        {
          products.map( product => {
            return (
              <li key={ product.id } className={ id*1 === product.id ? 'selected': ''}>
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
    </div>
  );
};

const App = ()=> {
  const { pathname } = useLocation();
  return (
    <div>
      <nav>
        <Link to='/' className={ pathname === '/' ? 'selected': ''}>Home</Link>
        <Link to='/products'
          className={ pathname.startsWith('/products') ? 'selected': ''}>Products</Link>
      </nav>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/products' element={ <Products /> } />
        <Route path='/products/:id' element={ <Products /> } />
      </Routes>
    </div>
  );
};


const root = createRoot(document.querySelector('#root'));
root.render(<HashRouter><App /></HashRouter>);
