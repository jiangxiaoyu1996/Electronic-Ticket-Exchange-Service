import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import { styles } from "./style.js";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Header from "../../components/header/index";


class Search extends Component {
    constructor(props){
        super(props);
        var tableData = [];
    }

    parseTableData() {
	var first = true
	this.tableData = []
	if ( typeof this.props.result !== 'undefined' && this.props.result !== '' && this.props.result !== false ) {
            var rows = this.props.result;
            for (var row in rows) {
		var headers=[];
		var data=[];
		if ( rows.hasOwnProperty(row) ) {
		    for ( var col in rows[row] ) {
			if ( col !== 'max_rows' &&  col !== 'max_cols') {
			    if ( first ) {
				headers.push(col)
			    }
			    if ( rows[row].hasOwnProperty(col) ) {
				data.push(rows[row][col]);
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
		<div style={{marginTop: 70}}>
		<Header search={this.props.search} logout={this.props.logout} user={this.props.user} result={this.props.result}/>
		{this.parseTableData()>0?"Seach Results":"Your search did not match anything."} <br/>
		<Table>
		<TableHead>
		<TableRow>{this.getTableHeaders().map(d=>{return (<TableCell>{d.replace("_"," ").toUpperCase()}</TableCell>);})}</TableRow>
		</TableHead>
		<TableBody>{this.getTableData().map(row=>{return (<TableRow>{row.map(d=>{return (<TableCell>{d}</TableCell>);})}</TableRow>);})}</TableBody>
		</Table>
                </div>
		
        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
