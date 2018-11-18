import React, { Component } from 'react';

import HeaderContainer from "../header/container";
import EventDetail from "../../components/event";

export default class EventContainer extends Component {
    render(){
        return (
            <div>
                <HeaderContainer />
                <EventDetail />
            </div>
        )
    }
}