import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from "../header/container";
import Profile from "../../components/profile";

import { getProfile } from "../../actions/profile/action";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class ProfileContainer extends Component{

    componentDidMount(){
        this.props.getProfile();
    }

    render(){
        console.log(this.props.profile);
        console.log("User in profile: ", this.props.user);
        if(this.props.profile === {
                "UserInfo": [{}],
                "Record": [{}]
            } || this.props.profile === undefined){
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
                    <Profile
                        user={this.props.user}
                        userInfo={this.props.profile.UserInfo[0]}
                        sellingRecord={findSellingRecord(this.props.profile.Record, this.props.user)}
                    />
                </div>
            )
        }
    }
}

function findSellingRecord(jsonArray, target){
    return jsonArray.filter((record) => {
        return record.seller === target;
    });
}

function mapStateToProps(state){
    return {
        user: state.user,
        profile: state.profile
    }
}

export default connect(mapStateToProps, { getProfile })(ProfileContainer);
