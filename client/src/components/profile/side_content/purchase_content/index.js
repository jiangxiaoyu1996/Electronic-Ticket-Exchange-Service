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

class PurchaseContent extends Component{

    renderTableRow(){
        return this.props.purchaseRecord.map((record) => {
            return (
                <TableRow>
                    <TableCell>{record.event}</TableCell>
                    <TableCell>TBD</TableCell>
                    <TableCell>TBD</TableCell>
                    <TableCell>({record.row_Number}, {record.col_Number})</TableCell>
                    <TableCell>TBD</TableCell>
                </TableRow>
            )
        })
    }

    render(){
        const { classes } = this.props;

        if(this.props.purchaseRecord.length === 0){
            return (
                <div className={classes.content}>
                    <Typography>
                        No Purchase Record
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

PurchaseContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PurchaseContent);