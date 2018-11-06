import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";

import {styles} from "../styles";
import Table from "@material-ui/core/es/Table/Table";
import TableHead from "@material-ui/core/es/TableHead/TableHead";
import TableRow from "@material-ui/core/es/TableRow/TableRow";
import TableCell from "@material-ui/core/es/TableCell/TableCell";
import TableBody from "@material-ui/core/es/TableBody/TableBody";

class SellingContent extends Component{
    render(){
        const { classes } = this.props;

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
                        <TableRow>
                            <TableCell>SJSU2 Mentoring: There's More Power With Two</TableCell>
                            <TableCell>11/06/2018</TableCell>
                            <TableCell>San Jose State University</TableCell>
                            <TableCell>Row#1 Col#1</TableCell>
                            <TableCell>$10</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>IBM Female AI Conference</TableCell>
                            <TableCell>11/13/2018</TableCell>
                            <TableCell>San Jose State University</TableCell>
                            <TableCell>Row#1 Col#1</TableCell>
                            <TableCell>$10</TableCell>
                        </TableRow>
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