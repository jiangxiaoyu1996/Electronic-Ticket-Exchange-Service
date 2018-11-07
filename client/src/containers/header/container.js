import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/header/index";
import { search } from "../../actions/search/action";
import { logout } from "../../actions/logout/action";

class HeaderContainer extends Component{
    render(){
        console.log("User in header: ", this.props.user);
        return(
		    <div>
		        <Header search={this.props.search} logout={this.props.logout} user={this.props.user}/>
		    </div>
        )
    }
}

function mapStateToProps(state){
    return {
	    user: state.user,
    }
}

export default connect(mapStateToProps, { search, logout })(HeaderContainer);
