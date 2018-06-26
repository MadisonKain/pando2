import React from "react";
import "./Nav.css";
// ========== Redux Imports ========== //
import { connect } from "react-redux";
import { getUserInfoFromServer } from "../../ducks/reducer";
// ========== Other Imports ========= //
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    
    componentDidMount(){
        this.props.getUserInfoFromServer()
    }

    render(){

        const navBarConditionalJSX = !this.props.user.userName ? 
        (
            <div className="conditionalNavBar" style={{"padding": "0 40px 0 0"}}>
                <Link to="/"><p>Home</p></Link>
                <Link to="/shop"><p>Shop</p></Link>
            </div>
        )
        :
        (
            <div className="conditionalNavBar" style={{"padding": "0 40px 0 0"}}>
                <Link to="/"><p>Home</p></Link>
                <Link to="/shop"><p>Shop</p></Link>
                <Link to={`/profile/${this.props.user.id}`}><p>Profile</p></Link>
                <Link to="/cart"><p>Cart</p></Link>
            </div>
        )

        return(
            <div>
                <nav className="navBarContainer">
                    <h2 className="navTitle">Pando</h2>
                    { navBarConditionalJSX }
                </nav>
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