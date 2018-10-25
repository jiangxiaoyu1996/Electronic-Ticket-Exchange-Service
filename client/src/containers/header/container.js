import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from "../../components/header/index";

class HeaderContainer extends Component{
    render(){
        return(
            <div>
                <Header user={this.props.user}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(HeaderContainer);