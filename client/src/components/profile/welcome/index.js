import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "./styles";
import Typography from "@material-ui/core/es/Typography/Typography";

class ProfileWelcome extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.container}>
                <Typography variant="h4">
                    Hello, {this.props.user} !
                </Typography>
            </div>
        );
    }
}

ProfileWelcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileWelcome);