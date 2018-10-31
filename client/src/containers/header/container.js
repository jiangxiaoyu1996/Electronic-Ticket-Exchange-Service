import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/header/index";
import { search } from "../../actions/search/action";

class HeaderContainer extends Component{
    render(){
        return(
		    <div>
		        <Header search={this.props.search} user={this.props.user}/>
		    </div>
        )
    }
}

function mapStateToProps(state){
    return {
	    user: state.user
    }
}

export default connect(mapStateToProps, { search })(HeaderContainer);
