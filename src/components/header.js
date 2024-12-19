import React from 'react'

const Header = (props) => {
let location = window.location.pathname;

  return (
    <>
    <div class="header_section">
        <div class="page-width">
            <div class="header_main">
                <div class="shop_logo">
                    <a href={location}>{props.shopName}</a>
                </div>
                <div class="cart_icon_main" onClick={() => props.updateCartDrawerdisplay("active")}>
                    <span><svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="30" width="30" xmlns="http://www.w3.org/2000/svg"><g><path d="M20.756 5.345c-.191-.219-.466-.345-.756-.345h-13.819l-.195-1.164c-.08-.482-.497-.836-.986-.836h-2.25c-.553 0-1 .447-1 1s.447 1 1 1h1.403l1.86 11.164.045.124.054.151.12.179.095.112.193.13.112.065c.116.047.238.075.367.075h11.001c.553 0 1-.447 1-1s-.447-1-1-1h-10.153l-.166-1h11.319c.498 0 .92-.366.99-.858l1-7c.041-.288-.045-.579-.234-.797zm-1.909 1.655l-.285 2h-3.562v-2h3.847zm-4.847 0v2h-3v-2h3zm0 3v2h-3v-2h3zm-4-3v2h-3l-.148.03-.338-2.03h3.486zm-2.986 3h2.986v2h-2.653l-.333-2zm7.986 2v-2h3.418l-.285 2h-3.133z"></path><circle cx="8.5" cy="19.5" r="1.5"></circle><circle cx="17.5" cy="19.5" r="1.5"></circle></g></svg></span>
                    <div class="cart_count">0</div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header