import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import { styles } from "./styles";
import Paper from "@material-ui/core/es/Paper/Paper";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import MenuList from "@material-ui/core/es/MenuList/MenuList";

class ProfileNav extends Component {
    render(){
        const { classes } = this.props;

        return(
            <div>
                <Paper style={{width: "30%", height: "100%"}}>
                    <MenuList>
                        <MenuItem style={{selected: "false"}}>
                            Hi, {this.props.user}
                        </MenuItem>
                        <MenuItem>
                            My Account
                        </MenuItem>
                        <MenuItem>
                            Post Tickets
                        </MenuItem>
                        <MenuItem>
                            Selling Record
                        </MenuItem>
                        <MenuItem>
                            Purchase Record
                        </MenuItem>
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