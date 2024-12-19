import React, { useState, useEffect } from 'react';
import cartCounter from './cartCounter.js';

const CartDrawer = (props) => {
  const [cartData, setCartData] = useState([]);
  const [currencyCode, setCurrencyCode] = useState();

  let cartOpen = props.drawerOpen;

  useEffect(() => {
    updateCart();
  }, [cartOpen]);

  const updateCart = () => {
    const storedCartData = JSON.parse(localStorage.getItem('CartData')) || [];
    setCartData(storedCartData);
    if (storedCartData.length > 0 && storedCartData[0].variants.edges[0].node.price.currencyCode) {
      setCurrencyCode(storedCartData[0].variants.edges[0].node.price.currencyCode);
    }
  };

  const updateCartRemove = (id) => {
    const storedCartData = JSON.parse(localStorage.getItem('CartData')) || [];
    const updatedCartData = storedCartData.filter(item => item.id !== id);
    localStorage.setItem('CartData', JSON.stringify(updatedCartData));
    setCartData(updatedCartData);
    cartCounter();
  };

  return (
    <>
      <div className={"cart_drawer_section " + cartOpen}>
        <div className="cart_drawer_header">
          <div className="heading">
            <h4>
              Shopping Cart (<span className="cart_count">{cartData.reduce((sum, item) => sum + item.quantity, 0)}</span>)
            </h4>
          </div>
          <div className="close_icon" onClick={() => props.updateCartDrawerdisplay("hidden")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
            >
              <path d="M16 1L1 16M1 1L16 16" stroke="#272727" strokeWidth="2"></path>
            </svg>
          </div>
        </div>
        <div className="cart_product_main">
          {cartData.map((item, index) => (
            <div key={item.variants.edges[0].node.id} className="cart_product_list">
              <div className="featured_image">
                <img src={item.featuredImage?.url ? item.featuredImage?.url : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'} alt={item.featuredImage?.altText} />
              </div>
              <div className="cart_product_content">
                <div className="cart_title">
                  <h4>{item.title}</h4>
                </div>
                <div className="cart_price">
                  <span>
                    {item.variants.edges[0].node.price.amount}{' '}
                    {item.variants.edges[0].node.price.currencyCode}
                  </span>
                </div>
                <div className="cart_quantity">
                  <label className="qty_label">Quantity: </label>
                  <input type="number" value={item.quantity} readOnly />
                </div>
                <div className="cart_remove">
                  <button type="button" onClick={() => updateCartRemove(item.id)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="cart_total_section">
          <div className="cart_total_main">
            <div className="cart_total_heading">
              <h4>Total Price:</h4>
            </div>
            <div className="cart_total_price">
              <span>
                {cartData
                  .reduce(
                    (total, item) =>
                      total + item.variants.edges[0].node.price.amount * item.quantity,
                    0
                  )
                  .toFixed(2)}{' '}
                {currencyCode}
              </span>
            </div>
          </div>
          <div className="cart_checkout_btn">
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
