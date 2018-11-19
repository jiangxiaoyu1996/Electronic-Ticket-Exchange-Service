import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/es/Redirect";

import { login } from "../../actions/login/action";

import HeaderContainer from "../header/container";
import Login from "../../components/login";

class LoginContainer extends Component{
    render(){
      if (typeof this.props.loggedin === 'undefined' || this.props.loggedin === '' || this.props.loggedin === false || this.props.user === '' || this.props.user === 'error'){
        return(
          <div>
              <HeaderContainer user={this.props.user} loggedin={this.props.loggedin}/>
              <Login login={this.props.login} user={this.props.user} loggedin={this.props.loggedin}/>
          </div>
      )
    } else {
          return(
              <div>
                  <Redirect to={'/profile'} />
              </div>
          )
        }
      }
}

function mapStateToProps(state){
    return {
        user: state.user,
        loggedin: state.loggedin
    }
}

export default connect(mapStateToProps, { login })(LoginContainer);
