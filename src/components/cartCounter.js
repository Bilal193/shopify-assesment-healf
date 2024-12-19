const cartCounter = () => {
    const cartData = JSON.parse(localStorage.getItem("CartData")) || [];
    const totalQuantity = cartData.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountElement = document.querySelectorAll(".cart_count");
    if (cartCountElement.length > 0) {
        cartCountElement.forEach(function (cartCount) {
            cartCount.innerHTML = totalQuantity;
        })
    }
  };
  
  export default cartCounter;