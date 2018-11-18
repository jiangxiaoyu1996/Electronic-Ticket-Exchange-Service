import React, { Component } from 'react';
import {connect} from "react-redux";

import HeaderContainer from "../header/container";
import EventDetail from "../../components/event";

class EventContainer extends Component {
    render(){
        return (
            <div>
                <HeaderContainer />
                <EventDetail selectedEvent={this.props.selectedEvent}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        selectedEvent: state.selectedEvent,
    }
}

export default connect(mapStateToProps, null)(EventContainer);