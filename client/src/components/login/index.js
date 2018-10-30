import React, { Component } from 'react';
import Header from "../header";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

export default class Login extends Component {
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
	const classes = this.props;
        return(
		<div style={{marginTop: 65, paddingLeft: "40%"}}>
		<Grid container justify="center" spacing={256}>
		<Grid item xs={12}>
		<TextField
	    id="outlined-name"
	    label="Username"
	    className={classes.textField}
	    margin="normal"
	    variant="outlined"
	    helperText="Enter your Username"
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
	    helperText="Enter your Password"
	    onChange = {(event) => this.setState({password:event.target.value})}
		/>
		</Grid>
		<Grid item xs={12}><br/><br/></Grid>
		<Grid item xs={12}>
		<Button variant="outlined" className={classes.button} onClick={() => this.handleClick() } >Log In</Button>
		</Grid>
		</Grid>
		</div>
        );
    }
}
