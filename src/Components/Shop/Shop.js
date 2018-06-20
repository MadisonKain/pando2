import React from "react";

// ========== COMPONENTS ========== //

import SearchBar from "./SearchBar/SearchBar";
import Item from "../Item/Item";

class Shop extends React.Component {
    constructor(){
        super()
        this.state ={

        }
    }

    render(){
        return(
            <div>
                <h1>THIS IS THE SHOP COMPONENT</h1>
                <SearchBar />
            </div>
        )
    }
}

export default Shop;