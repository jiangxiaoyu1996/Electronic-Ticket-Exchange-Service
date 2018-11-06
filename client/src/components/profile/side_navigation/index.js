import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import { styles } from "./styles";
import Paper from "@material-ui/core/es/Paper/Paper";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuList from "@material-ui/core/es/MenuList/MenuList";

class ProfileNav extends Component {
    renderMenuItem(){
        return this.props.menu.map((menuItem) => {
            return (
                <MenuItem onClick={event => this.props.updateCurrentNav(event, menuItem)}>
                    {menuItem}
                </MenuItem>
            );
        })
    }

    render(){
        const { classes } = this.props;

        return(
            <div className={classes.container}>
                <Paper>
                    <MenuList>
                        {this.renderMenuItem()}
                    </MenuList>
                </Paper>
            </div>
        );
    }
}

ProfileNav.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileNav);