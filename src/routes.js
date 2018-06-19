import React from "react";
import { Switch, Route } from "react-router-dom";

// ========= Components ========= //

import Landing from "./Components/Landing/Landing";

export default (
    <Switch>
        <Route component={ Landing } exact path="/"/>
    </Switch>
)