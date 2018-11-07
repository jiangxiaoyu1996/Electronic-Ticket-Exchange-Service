import React, { Component } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Header from "../../components/header/index";
import { search } from "../../actions/search/action";

class SearchContainer extends Component{
    constructor(props) {
	super(props);
	var tableData = [];
    }
    
    parseTableData() {
	var first = true
	this.tableData = []
	if ( typeof this.props.result !== 'undefined' && this.props.result != '') {
	    var jsonData = this.props.result;
	    for (var obj in jsonData) {
		var headers=[];
		var data=[];
		if ( jsonData.hasOwnProperty(obj) ) {
		    for ( var key in jsonData[obj] ) {
			if ( first ) {
			    headers.push(key)
			}
			if ( jsonData[obj].hasOwnProperty(key) ) {
			    data.push(jsonData[obj][key]);
			}
			else {
			    data.push("");
			}
		    }
		}
		if ( first ) {
		    this.tableData.push(headers)
		    first = false;
		}
		this.tableData.push(data)
	    }
	}
	return this.tableData.length
    }

    getTableHeaders() {
	if ( this.tableData.length > 0 ) {
	    return this.tableData[0];
	}
	return [];
    }

    getTableData() {
	if ( this.tableData.length > 1 ) {
	    return this.tableData.slice(1);
	}
	return [];
    }
    
    render(){
        return(
            <div>
  	      <div>
		<Header search={this.props.search} result={this.props.result}/>
	      </div>
              <div style={{marginTop: 70}}>
		{this.parseTableData()>0?"Seach Results":"Your search did not match anything."} <br/>
		  <Table>
		    <TableHead>
		      <TableRow>
		        {this.getTableHeaders().map(d=>{return (<TableCell>{d.replace("_"," ").toUpperCase()}</TableCell>);})}
		      </TableRow>
		    </TableHead>
		    <TableBody>
		      {this.getTableData().map(row=>{return (<TableRow>{row.map(d=>{return (<TableCell>{d}</TableCell>);})}</TableRow>);})}
		    </TableBody>
		  </Table>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        result: state.result
    }
}

export default connect(mapStateToProps, {search})(SearchContainer);
