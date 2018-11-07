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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

class Header extends Component {
    constructor(props){
	    super(props);
	    this.state = {
                keyword: '',
		event_filter:  'event_name'
	    };
	    this.handleSearch = this.handleSearch.bind(this);
	    this.handleFilter = this.handleFilter.bind(this);
	    this.handleLogout = this.handleLogout.bind(this);
    }

    handleSearch() {
	this.props.search(this.state.event_filter, this.state.keyword);
    }

    handleFilter(event) {
	this.setState ( { event_filter : event.target.value} );
    }
    
    handleLogout() {
        this.props.logout();
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
                <Button className={classes.sectionButton} onClick={this.handleLogout} href={"/"}>Logout</Button>
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
		   <Select
	              value={this.state.event_filter}
	              onChange={this.handleFilter}
	              inputProps={{
		          name: 'event_filter',
			  id  : 'event_id',
	             }}
	           >
		    <MenuItem value={'event_name'}><em>Event Name</em></MenuItem>
		    <MenuItem value={'location'}>Event Location</MenuItem>
		    <MenuItem value={'event_date'}>Event Date</MenuItem>
		    <MenuItem value={'event_ID'}>Event ID</MenuItem>
		  </Select>
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
