import React, { Component } from 'react';
import { connect } from 'react-redux';

import { search } from "../../actions/search/action";
import {eventSelectionFromSearch} from "../../actions/event_selection/action";
import Search from "../../components/search";

class SearchContainer extends Component{
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

export default connect(mapStateToProps, { search, eventSelectionFromSearch })(SearchContainer);
