import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from "../header/container";
import Profile from "../../components/profile";

import { getProfile } from "../../actions/profile/action";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class ProfileContainer extends Component{

    /*componentDidMount(){
        this.props.getProfile();
    }*/

    render(){
        if(this.props.profile === {} || this.props.profile === undefined){
            return (
                <div>
                    <HeaderContainer />
                    <div>
                        <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                    </div>
                </div>
            );
        }else{
            return(
                <div>
                    <HeaderContainer />
                    <Profile user={this.props.user}/>
                </div>
            )
        }
    }
}

function mapStateToProps(state){
    return {
        user: state.user,
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfile })(ProfileContainer);

const p = {
    "SellRecord": [
        {
            "event": "Event Three",
            "description": "Here is the description",
            "row": "1",
            "column": "10",
        },
        {
            "event": "Event Four",
            "description": "Here is the description",
            "row": "2",
            "column": "9",
        }
    ],
    "PurchaseRecord": [
        {
            "event": "Event One",
            "description": "Here is the description",
            "row": "1",
            "column": "10",
        },
        {
            "event": "Event Two",
            "description": "Here is the description",
            "row": "2",
            "column": "9",
        }
    ],
    "UserInfo": {
        "email": "charlene@gmail.com",
        "display_name": "Charlene"
    }
};