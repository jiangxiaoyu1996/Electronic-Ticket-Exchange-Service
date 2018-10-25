import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderContainer from "../header/container";
import Login from "../../components/login";

class LoginContainer extends Component{
    render(){
        console.log(this.signin);
        return(
            <div>
                <HeaderContainer/>
                <Login/>
            </div>
        )
    }
}

export default connect(null, null)(LoginContainer);