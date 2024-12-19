import './App.css';
import cartCounter from './components/cartCounter.js';
import CartDrawer from './components/cartDrawer.js';
import Header from './components/header.js';
import ProductsGrid from './components/productsGrid.js';
import { useState, useEffect } from 'react';
// require('dotenv').config()

const SHOP = process.env.REACT_APP_SHOPIFY_SHOP;
const ACCESS_TOKEN = process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN;

function App() {
  const [shopName, setShopName] = useState();
  const [productsData, setProductsData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState("hidden");


  function updateCartDrawerdisplay(diplay) {
    setDrawerOpen(diplay);
    console.log(drawerOpen);
    if (diplay == "active") {
      document.body.classList.add('cart_active')
    } else {
      document.body.classList.remove('cart_active')
    }
  }


  const query = `
  {
  shop {
    name
  }
  products(first: 10) {
    edges {
      node {
        id
        handle
        title
        onlineStoreUrl
        featuredImage {
          url
          id
          altText
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
          minVariantPrice {
            amount
            currencyCode
          }
        }
        variants(first: 1) {
          edges {
            node {
              id
              price {
                amount
                currencyCode
              }
              title
            }
          }
        }
      }
    }
  }
}`;
  
useEffect(() => {
  fetch(`https://${SHOP}/api/2024-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': ACCESS_TOKEN
    },
    body: JSON.stringify({ query })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    setShopName(data.data.shop.name);
    setProductsData(data.data.products.edges);
    // console.log('Products:', data.data.products);
  })
  .then(cartCounter()) 
  .catch(error => {
    console.error('Error:', error);
  });
}, [])

  return (
    <div className={"App " + drawerOpen}>
        <Header shopName={shopName} SHOP={SHOP} updateCartDrawerdisplay={updateCartDrawerdisplay} />
        <ProductsGrid productsData={productsData} />
        <CartDrawer drawerOpen={drawerOpen} updateCartDrawerdisplay={updateCartDrawerdisplay} />
    </div>
  );
}

export default App;
