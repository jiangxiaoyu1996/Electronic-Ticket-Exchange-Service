import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import ProfileNav from "./side_navigation"
import { styles } from "./styles";

class Profile extends Component {
    render(){
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <ProfileNav user={this.props.user}/>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);