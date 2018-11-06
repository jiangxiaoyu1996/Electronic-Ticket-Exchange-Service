import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";

import {styles} from "../styles";

class SellingContent extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div>
                    This is selling history.
            </div>
        );
    }
}

SellingContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SellingContent);