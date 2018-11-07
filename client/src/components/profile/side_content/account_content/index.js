import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "../styles";

class AccountContent extends Component{
    render(){
        const { classes } = this.props;

        console.log("user: ", this.props.userInfo);
        return (
            <div className={classes.content}>
                <Typography style={{margin: 20}}>
                    Email: {this.props.userInfo.email}
                </Typography>
                <Typography style={{margin: 20}}>
                    Address: {this.props.userInfo.address}
                </Typography>
            </div>
        );
    }
}

AccountContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContent);