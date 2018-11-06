import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "../styles";

class AccountContent extends Component{
    render(){
        const { classes } = this.props;

        return (
            <div className={classes.content}>
                <Typography style={{margin: 20}}>
                    Email: TBD
                </Typography>
                <Typography style={{margin: 20}}>
                    Display Name: TBD
                </Typography>
                <Typography style={{margin: 20}}>
                    Address: TBD
                </Typography>
            </div>
        );
    }
}

AccountContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContent);