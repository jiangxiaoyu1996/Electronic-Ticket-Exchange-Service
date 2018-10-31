import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles/index";
import PropTypes from 'prop-types';

import { styles } from "./style";

class Login extends Component {
    constructor(props){
		super(props);
		this.state = {
	    	email: '',
	    	password: ''
		};
		this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
		this.props.login(this.state.email, this.state.password);
    }

    render(){
		const { classes } = this.props;

        return(
			<div className={classes.container}>
				<Grid container justify="center" spacing={256}>
				<Grid item xs={12}>
					<TextField
	    				id="outlined-name"
	    				label="Email"
	    				className={classes.textField}
	    				margin="normal"
	    				variant="outlined"
	    				helperText="Enter your Email"
	    				onChange = {(event) => this.setState({email:event.target.value})}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
	    				id="outlined-name"
	    				label="Password"
	    				className={classes.textField}
	    				type="password"
	    				margin="normal"
	    				variant="outlined"
	    				helperText="Enter your password"
	    				onChange = {(event) => this.setState({password:event.target.value})}
					/>
				</Grid>
				<Grid item xs={12}><br/><br/></Grid>
				<Grid item xs={12}>
					<Button
						variant="outlined"
						className={classes.loginBtn}
						onClick={() => this.handleClick() }
					>
						Log In
					</Button>
				</Grid>
				</Grid>
		</div>
        );
    }
}


Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);
