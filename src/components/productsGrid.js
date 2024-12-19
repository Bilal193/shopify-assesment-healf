import React from 'react'
import cartCounter from './cartCounter.js';



const ProductsGrid = (props) => {

const handleClick = (productNode) => {
    const variantId = productNode?.variants?.edges[0]?.node?.id;
    const productWithQuantity = { ...productNode, quantity: 1 };
    let cartData = JSON.parse(localStorage.getItem("CartData")) || [];
    const existingProductIndex = cartData.findIndex(
      (item) => item.variants.edges[0].node.id === variantId
    );

    if (existingProductIndex !== -1) {
      cartData[existingProductIndex].quantity += 1;
    } else {
      cartData.push(productWithQuantity);
    }
    localStorage.setItem("CartData", JSON.stringify(cartData));

    console.log("Updated CartData:", cartData);
    cartCounter();
}

  return (
    <>
    <div class="product_grid_section">
        <div class="page-width">
            <div class="product_grid_main">
                {
                    props.productsData.map((edges) => (
                        <div key={edges.node.id}>
                            <div class="product_list">
                                    <a href={edges.node.onlineStoreUrl ? edges.node.onlineStoreUrl : "/products/" + edges.node.handle}>
                                        <div class="featured_image">
                                            <img src={edges.node?.featuredImage?.url ? edges.node?.featuredImage?.url : 'https://cdn.shopify.com/s/files/1/0533/2089/files/placeholder-images-image_large.png'} alt={edges.node?.featuredImage?.altText} />
                                        </div>
                                    </a>
                                    <div class="content">
                                        <div class="title">
                                            <a href={edges.node.onlineStoreUrl ? edges.node.onlineStoreUrl : "/products/" + edges.node.handle}>
                                                <h4>{edges.node?.title}</h4>
                                            </a>
                                        </div>
                                        <div class="price">
                                            <span>{edges.node?.variants?.edges[0]?.node?.price?.amount} {edges.node?.variants?.edges[0]?.node?.price?.currencyCode}</span>
                                        </div>
                                        <div class="add_cart">
                                            <button type='button' onClick={() => handleClick(edges.node)}>Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
    </>
  )
}

export default ProductsGrid