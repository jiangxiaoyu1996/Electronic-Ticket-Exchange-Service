import React, { Component } from 'react';
import { connect } from 'react-redux';
import Redirect from "react-router-dom/es/Redirect";

import { signin } from "../../actions/sign-in/action";
import HeaderContainer from "../header/container";
import SignIn from "../../components/sign-in";

class SigninContainer extends Component{
    render(){
        if(this.props.user === ''){
            return(
                <div>
                    <HeaderContainer/>
                    <SignIn signin={this.props.signin}/>
                </div>
            )
        }else if(this.props.user === 'error'){
            return(
                <div>
                    <HeaderContainer/>
                    <SignIn signin={this.props.signin} error={"Sign-up failed"}/>
                </div>
            )
        } else{
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
        user: state.user
    }
}

export default connect(mapStateToProps, { signin })(SigninContainer);