import React, { Component } from 'react';
import { connect } from 'react-redux';

import { search } from "../../actions/search/action";
import { eventSelectionFromSearch } from "../../actions/event_selection/action";
import { eventSelectionReset } from "../../actions/event_selection_reset/action";
import { eventListBuyingReset } from "../../actions/event_list_buy_reset/action";
import { getProfile } from "../../actions/profile/action";
import Search from "../../components/search";

class SearchContainer extends Component{
    componentDidMount(){
        this.props.eventSelectionReset();
        this.props.eventListBuyingReset();
	this.props.getProfile();
    }
    render(){
        return (
          <div>
            <Search
                search={this.props.search}
                logout={this.props.logout}
                user={this.props.user}
                result={this.props.result}
                eventSelectionFromSearch={this.props.eventSelectionFromSearch}
            />
          </div>
        )
      }
}

function mapStateToProps(state){
    return {
        result: state.result,
	    user  : state.user
    }
}

export default connect(mapStateToProps, { search, eventSelectionFromSearch, eventSelectionReset, eventListBuyingReset, getProfile })(SearchContainer);
