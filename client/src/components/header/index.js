/*const Header = () => {
    return (
        <div>
            <AppBar position="static" style={{backgroundColor: "#4169e1"}}>
                <Toolbar>
                    <Typography style={{color: "#FFFFFF", fontSize: "20px"}}>ETES</Typography>
                    <div>
                        <div style={{position: 'relative'}}>
                            <SearchIcon/>
                        </div>
                        <InputBase/>
                    </div>
                    <div/>
                    <div style={{textAlign: "right"}}>
                        <Button href={"/sign-in"} style={{color: "#FFFFFF"}}>Sign-in</Button>
                        <Button href={"/login"} style={{color: "#FFFFFF"}}>Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};*/

import React, { Component }from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { withStyles } from '@material-ui/core/styles';

import { styles } from "./style";
import Button from "@material-ui/core/es/Button/Button";

class Header extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            ETES
                        </Typography>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search event"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Button href={"/sign-in"} style={{color: "#FFFFFF"}}>Sign-in</Button>
                            <Button href={"/login"} style={{color: "#FFFFFF"}}>Login</Button>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
