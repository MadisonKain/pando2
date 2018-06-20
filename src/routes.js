import React from "react";
import { Switch, Route } from "react-router-dom";

// ========= Components ========= //

import Landing from "./Components/Landing/Landing";
import Shop from "./Components/Shop/Shop";
import SelectedItem from "./Components/SelectedItem/SelectedItem";

export default (
    <Switch>
        <Route component={ Landing } exact path="/"/>
        <Route component={ Shop } path="/shop"/>
        <Route component={ SelectedItem } path="/products/:id"/>
    </Switch>
)