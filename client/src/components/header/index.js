import React, { Component }from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Button from "@material-ui/core/es/Button/Button";

import { withStyles } from '@material-ui/core/styles';

import { styles } from "./style";

class Header extends Component {
    constructor(props){
	    super(props);
	    this.state = {
                keyword: ''
	    };
	    this.handleSearch = this.handleSearch.bind(this);
    }

    handleSearch() {
	    this.props.search(this.state.keyword);
    }

    render() {
        const { classes } = this.props;

        const btns = this.props.user === '' ? (
		    <div className={classes.sectionDesktop}>
                <Button className={classes.sectionButton} href={"/sign-in"}>Sign up</Button>
                <Button className={classes.sectionButton} href={"/login"}>Login</Button>
		    </div>
        ) : (
		    <div className={classes.sectionDesktop}>
                <Button className={classes.sectionButton} href={"/profile"}>Profile</Button>
                <Button className={classes.sectionButton} href={"/"}>Logout</Button>
		    </div>
        );

        return (
		<div className={classes.root}>
            <AppBar className={classes.appBar}>
                <Toolbar position="static">
                    <IconButton className={classes.menuButton} href="/">
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} noWrap>
                        ETES
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search events..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange = {(event) => this.setState({keyword:event.target.value})}
                            onKeyPress = {(event) => {
                                if (event.key === 'Enter') {
                                    this.handleSearch();
                                }
                            }}
                        />
                    </div>
                    <div className={classes.grow} />
                    {btns}
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
