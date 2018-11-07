import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/es/Redirect";

import Header from "../../components/header/index";
import { search } from "../../actions/search/action";
import { logout } from "../../actions/logout/action";

class HeaderContainer extends Component{
    render(){
	if (typeof this.props.result === 'undefined' || this.props.result == '' ) {
	    return(
		    <div>
		    <Header search={this.props.search} result={this.props.result}/>
		    </div>
            )
 	}
	else {
          return(
              <div>
		  <Redirect to={'/search'} />
              </div>
          )
	}
    }
}

function mapStateToProps(state){
    return {
	result: state.result
    }
}

export default connect(mapStateToProps, { search, logout })(HeaderContainer);
