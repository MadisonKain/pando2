import React from "react";
import { Switch, Route } from "react-router-dom";

// ========= Components ========= //

import Landing from "./Components/Landing/Landing";
import Shop from "./Components/Shop/Shop";
import SelectedItem from "./Components/SelectedItem/SelectedItem";
import Profile from "./Components/Profile/Profile";
import Cart from "./Components/Cart/Cart";

export default (
    <Switch>
        <Route component={ Landing } exact path="/"/>
        <Route component={ Shop } path="/shop"/>
        <Route component={ SelectedItem } path="/products/:product_id"/>
        <Route component={ Profile } path="/users/:user_id"/>
        <Route component={ Cart } path="/cart"/>
    </Switch>
)