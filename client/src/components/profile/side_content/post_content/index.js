import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "../styles";

class PostTicketContent extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div>
                    Do you wanna post ticket?
            </div>
        );
    }
}

PostTicketContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostTicketContent);