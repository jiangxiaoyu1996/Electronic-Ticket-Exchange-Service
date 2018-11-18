import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "./styles";

class EventDetail extends Component {
    constructor(props){
        super(props);
    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.container}>
               event detail!
            </div>
        );
    }
}

EventDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetail);
