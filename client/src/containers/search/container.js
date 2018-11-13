import React, { Component } from 'react';
import { connect } from 'react-redux';
/*
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
*/

import { search } from "../../actions/search/action";
import Search from "../../components/search";

class SearchContainer extends Component{
    render(){
        return (
          <div>
            <Search search={this.props.search} logout={this.props.logout} user={this.props.user} result={this.props.result}/>
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

export default connect(mapStateToProps, {search})(SearchContainer);
