import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "../styles";

class AccountContent extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div>
                This is account information.
            </div>
        );
    }
}

AccountContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContent);