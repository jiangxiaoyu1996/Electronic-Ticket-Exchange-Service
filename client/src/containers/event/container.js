import React, { Component } from 'react';
import {connect} from "react-redux";

import HeaderContainer from "../header/container";
import EventDetail from "../../components/event";
import {getEventListForBuying} from "../../actions/event_list_buy/action";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";

class EventContainer extends Component {
    componentDidMount(){
        this.props.getEventListForBuying();
    }
    render(){
        if(this.props.selectedEvent !== undefined && this.props.selectedEvent !== '' && this.props.eventListBuying !== undefined
            && this.props.eventListBuying !== {}){
            return (
                <div>
                    <HeaderContainer />
                    <EventDetail selectedEvent={findTarget(makeList(this.props.eventListBuying),this.props.selectedEvent)}/>
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
        eventListBuying: state.eventListBuying
    }
}

export default connect(mapStateToProps, { getEventListForBuying})(EventContainer);