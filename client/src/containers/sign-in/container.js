import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signin } from "../../actions/sign-in/action";

import HeaderContainer from "../header/container";
import SignIn from "../../components/sign-in";

class SigninContainer extends Component{
    render(){
        console.log(this.signin);
        return(
            <div>
                <HeaderContainer/>
                <SignIn signin={this.props.signin}/>
            </div>
        )
    }
}

export default connect(null, { signin })(SigninContainer);