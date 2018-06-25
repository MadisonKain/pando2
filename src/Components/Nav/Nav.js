import React from "react";
import "./Nav.css";
// ========== Redux Imports ========== //
import { connect } from "react-redux";
import { getUserInfoFromServer } from "../../ducks/reducer";

class Nav extends React.Component {
    
    componentDidMount(){
        this.props.getUserInfoFromServer()
    }

    render(){
        const navBarConditionalJSX = this.props.user.userName ? 
        (
            <nav>
                <h1>LoggedIn</h1>
            </nav>
        )
        :
        (
            <nav>
                <h1>NOTLoggedIn</h1>
            </nav>
        )
        return(
            <div>
                { navBarConditionalJSX }
            </div>
        )
    }
}

function mapStateToProps( state ){
    return {
        user: state.user
    }
}

export default connect( mapStateToProps, { getUserInfoFromServer } )( Nav );