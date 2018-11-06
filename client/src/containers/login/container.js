import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/es/Redirect";

import { login } from "../../actions/login/action";

import HeaderContainer from "../header/container";
import Login from "../../components/login";

class LoginContainer extends Component{
    render(){
      if (this.props.user === '' || this.props.loggedin === false ){
        //  console.log(this.login);
        return(
          <div>
              <HeaderContainer/>
              <Login login={this.props.login} user={this.props.user}/>
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
        result: state.result
    }
}

export default connect(mapStateToProps, { login })(LoginContainer);
