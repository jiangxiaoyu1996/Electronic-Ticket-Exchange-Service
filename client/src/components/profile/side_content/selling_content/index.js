import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "../styles";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";
import Typography from "@material-ui/core/es/Typography/Typography";

class SellingContent extends Component{
    componentDidMount(){
        this.props.getProfile();
    }

    renderTableRow(){
        return this.props.sellingRecord.map((record) => {
            return (
                <TableRow>
                    <TableCell>{record.event}</TableCell>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{record.location}</TableCell>
                    <TableCell>({record.row_Number}, {record.col_Number})</TableCell>
                    <TableCell>${record.price}</TableCell>
                </TableRow>
            )
        })
    }

    render(){
        const { classes } = this.props;

        if(this.props.sellingRecord.length === 0){
            return (
                <div className={classes.content}>
                    <Typography>
                        No Selling Record
                    </Typography>
                </div>
            )
        }
        return (
            <div className={classes.content}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Event Name</TableCell>
                            <TableCell>Event Date</TableCell>
                            <TableCell>Event Location</TableCell>
                            <TableCell>Event Seat</TableCell>
                            <TableCell>Event Ticket Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.renderTableRow()}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

SellingContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellingContent);