import React, { Component } from 'react';
import {connect} from "react-redux";

import HeaderContainer from "../header/container";
import EventDetail from "../../components/event";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import { getEventListForBuying } from "../../actions/event_list_buy/action";
import { lockTicketForBuying } from "../../actions/lock_ticket/action";
import { unlockTicketForBuying } from "../../actions/unlock_ticket/action";
import { buyTicket } from "../../actions/buying_ticket/action";
import { lockTicketReset } from "../../actions/lock_result_reset/action";

class EventContainer extends Component {
    componentDidMount(){
        this.props.getEventListForBuying();
    }
    render(){
        console.log("containerLevel: ", this.props.unlockTicketForBuying);
        if(this.props.selectedEvent !== undefined && this.props.selectedEvent !== '' && this.props.eventListBuying !== undefined
            && this.props.eventListBuying !== {}){
            console.log("reduxResult: ", this.props.eventListBuying);
            console.log("list: ", makeList(this.props.eventListBuying));
            console.log("target: ", findTarget(makeList(this.props.eventListBuying),this.props.selectedEvent));
            return (
                <div>
                    <HeaderContainer />
                    <EventDetail
                        selectedEvent={findTarget(makeList(this.props.eventListBuying),this.props.selectedEvent)}
                        profile={this.props.profile}
                        lockTicket={this.props.lockTicket}
                        lockTicketForBuying={this.props.lockTicketForBuying}
                        unlockTicketForBuying={this.props.unlockTicketForBuying}
                        buyTicket={this.props.buyTicket}
                        lockTicketReset={this.props.lockTicketReset}
                    />
                </div>
            )
        }else{
            return (
                <div>
                    <HeaderContainer />
                    <div>
                        <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                    </div>
                </div>
            );
        }
    }
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
                        "buyableSeat": event[7]
                    }
                )
            }
        );
    }
    return jsonObject;
}

function findTarget(list, name){
    if(list !== undefined && list.length > 0){
        return list.filter(object => object.name === name);
    }
}

function mapStateToProps(state){
    return {
        selectedEvent: state.selectedEvent,
        eventListBuying: state.eventListBuying,
        profile: state.profile,
        lockTicket: state.lockTicket
    }
}

export default connect(mapStateToProps, { getEventListForBuying, lockTicketForBuying, lockTicketReset,
    unlockTicketForBuying, buyTicket})(EventContainer);