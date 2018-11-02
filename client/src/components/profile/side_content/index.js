import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import { styles } from "./styles";

class ProfileContent extends Component {
    render(){
        const { classes } = this.props;

        var temp = null;
        switch(this.props.type){
            case "My Account":

        }

        return(
            <div>
            </div>
        );
    }
}

ProfileContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileContent);