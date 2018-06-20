import React from "react";

// ========== Components ========== //

import Checkout from "./Checkout/Checkout";
import CartItem from "./CartItem/CartItem";

class Cart extends React.Component {
    render(){
        return(
            <div>
                <h2>CART CART CART COMPONENT</h2>
                <CartItem />
                <Checkout />
            </div>
        )
    }
}

export default Cart;