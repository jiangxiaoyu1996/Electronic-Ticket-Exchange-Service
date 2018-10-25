import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderContainer from "../header/container";

class ProfileContainer extends Component{
    render(){
        return(
            <div>
                <HeaderContainer/>
                <div style={{marginTop: 70}}>
                    Hello, {this.props.user}!
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(ProfileContainer);