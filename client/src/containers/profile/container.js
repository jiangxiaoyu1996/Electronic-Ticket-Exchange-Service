import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from "../header/container";
import Profile from "../../components/profile";

import { getProfile } from "../../actions/profile/action";
import { getEventListForPosting } from "../../actions/event_list_post/action";
import { sellTicket } from "../../actions/selling_ticket/action";
import { sellTicketReset } from "../../actions/selling_result_reset/action";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import {updateAddress} from "../../actions/update_address/action";
import {updateUsername} from "../../actions/update_username/action";

class ProfileContainer extends Component{

    componentDidMount(){
        this.props.getProfile();
        this.props.getEventListForPosting();
    }

    render(){
        if(this.props.profile === {
                "UserInfo": [{}],
                "Record": [{}]
            } || this.props.profile === undefined || this.props.eventListPosting === {} || this.props.eventListPosting === undefined){
            return (
                <div>
                    <HeaderContainer />
                    <div>
                        <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                    </div>
                </div>
            );
        }else{
            console.log("Profile: ", this.props.profile);
            //console.log("List: ", makeList(this.props.eventListPosting));
            return(
                <div>
                    <HeaderContainer />
                    <Profile
                        userInfo={this.props.profile.UserInfo[0]}
                        sellingRecord={findSellingRecord(this.props.profile.Record, this.props.profile.UserInfo[0].email)}
                        purchaseRecord={findPurchaseRecord(this.props.profile.Record, this.props.profile.UserInfo[0].email)}
                        eventlist={makeList(this.props.eventListPosting)}
                        sellTicket={this.props.sellTicket}
                        sellingTicketResult={this.props.sellingTicketResult}
                        sellTicketReset={this.props.sellTicketReset}
                        getEventListForPosting={this.props.getEventListForPosting}
                        getProfile={this.props.getProfile}
                        updateAddress={this.props.updateAddress}
                        updateUsername={this.props.updateUsername}
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

function findPurchaseRecord(jsonArray, target){
    return jsonArray.filter((record) => {
        return record.buyer === target;
    });
}

function makeList(list){
    let jsonObject = [];
    if(list !== {} && list.length >= 1){
        list.forEach(event =>
            {
                jsonObject.push(
                    {
                        "name": event[0],
                        "date": event[1],
                        "location": event[2],
                        "totalTicket": event[3],
                        "maxRow": event[4],
                        "maxCol": event[5],
                        "description": event[6],
                        "notSellableSeat": event[7]
                    }
                )
            }
        );
    }
    return jsonObject;
}

function mapStateToProps(state){
    return {
        profile: state.profile,
        eventListPosting: state.eventListPosting,
        sellingTicketResult: state.sellingTicketResult
    }
}

export default connect(mapStateToProps, { getProfile, getEventListForPosting, sellTicket, sellTicketReset,
    updateAddress, updateUsername})(ProfileContainer);
