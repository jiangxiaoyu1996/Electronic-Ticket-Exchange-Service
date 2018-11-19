import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/header/index";
import { search } from "../../actions/search/action";
import { logout } from "../../actions/logout/action";

class HeaderContainer extends Component{
    render() {
	return(
		<div>
		<Header search={this.props.search} logout={this.props.logout} user={this.props.user} result={this.props.result} loggedin={this.props.loggedin} />
		</div>
        )
    }
}

function mapStateToProps(state){
    return {
	result: state.result,
	user  : state.user
    }
}

export default connect(mapStateToProps, { search, logout })(HeaderContainer);
