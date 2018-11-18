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
import Button from "@material-ui/core/es/Button/Button";
import Link from "react-router-dom/es/Link";
import {eventSelectionFromSearch} from "../../actions/event_selection/action";

class Search extends Component {
    constructor(props){
        super(props);
	var eventNameColId = -1;
        var tableData = [];
    }

    parseTableData() {
	var first = true
	var cIdx = 0
	this.tableData = []
	if ( typeof this.props.result !== 'undefined' && this.props.result !== '' && this.props.result !== false ) {
            var rows = this.props.result;
            for (var row in rows) {
		var headers=[];
		var data=[];
		if ( rows.hasOwnProperty(row) ) {
		    for ( var col in rows[row] ) {
			if ( col !== 'max_rows' &&  col !== 'max_cols' && col !== "description") {
			    if ( first ) {
				if ( col == 'event_name' ) {
				    this.eventNameColId = cIdx;
				}
				var newName = col;
				if ( col == 'pop_index' ) {
				    newName='POPULARITY';
				}
				++cIdx;
				headers.push(newName)
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
		{this.parseTableData()>0?"":"Your search did not match anything."} <br/>
		<Table>
		<TableHead>
		<TableRow>{this.getTableHeaders().map(d=>{return (<TableCell>{d.split('_').join(' ').toUpperCase()}</TableCell>);})}</TableRow>
		</TableHead>
		<TableBody>{this.getTableData().map(row=>{
		    var cIdx=-1;
		    return (<TableRow>{row.map(d=>{
			++cIdx;
			if ( this.eventNameColId === cIdx ) {
			    return (
			        <TableCell >
                        <Button
                            variant = "outlined"
                            component={Link} to="/event"
                            onClick={() => this.props.eventSelectionFromSearch(d)}
                        >
                            {d}
                            </Button>
                    </TableCell>);
			}
			else {
			    return (<TableCell>{d}</TableCell>);
			}
			})}
			    </TableRow>);})}
	        </TableBody>
		</Table>
                </div>

        )
    }
}

Search.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Search);
