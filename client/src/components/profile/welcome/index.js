import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "./styles";


class ProfileWelcome extends Component{
    render(){
        const { classes } = this.props;
        console.log(this.props.userInfo);

        const user = this.props.userInfo.username === null || this.props.userInfo.username === '' ?
            this.props.userInfo.email : this.props.userInfo.username;

        console.log("user: ", user);
        return (
            <div className={classes.container}>
                <Typography variant="h4">
                    Hello, {user} !
                </Typography>
            </div>
        );
    }
}

ProfileWelcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileWelcome);