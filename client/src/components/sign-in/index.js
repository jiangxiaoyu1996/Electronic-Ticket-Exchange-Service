import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";
import {withStyles} from "@material-ui/core/styles/index";
import FormControl from "@material-ui/core/es/FormControl/FormControl";
import FormHelperText from "@material-ui/core/es/FormHelperText/FormHelperText";

import { styles } from "./styles";

class SignIn extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            errorTextEmail: '',
            errorTextPassword: '',
            errorTextPassword2: '',
        };
        this.checkEmailFormat = this.checkEmailFormat.bind(this);
        this.checkPassword = this.checkPassword.bind(this);
        this.onClickCreateAccount = this.onClickCreateAccount.bind(this);
    }

    checkEmailFormat(){
        if(this.state.email !== ''){
            if(!this.state.email.match(`^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$`)){
                this.setState({errorTextEmail: 'Invalid email format'})
            }else{
                this.setState({errorTextEmail: ''})
            }
        }else{
            this.setState({errorTextEmail: 'Email is required'})
        }
    }

    checkPassword(){
        if(this.state.password === ''){
            this.setState({errorTextPassword: 'Password is required'})
        }
    }

    checkConfirmedPassword(){
        if(this.state.password2 !== ''){
            if(this.state.password2 !== this.state.password){
                this.setState({errorTextPassword2: 'Please check password confirmation again',
                    errorTextPassword: 'Please check password again'})
            }else{
                this.setState({errorTextPassword2: '', errorTextPassword: ''})
            }
        }else{
            this.setState({errorTextPassword2: 'Password confirmation is required'})
        }
    }

    onClickCreateAccount(){
        this.checkEmailFormat();
        this.checkPassword();
        this.checkConfirmedPassword();

        if(this.state.errorTextEmail === '' && this.state.errorTextPassword === ''){
            console.log("perfect");
            this.props.signin(this.state.email, this.state.password);
        }
    }

    render(){
        const { classes } = this.props;

        const errorStyle = {
            color: "#FF0000",
            marginTop: 0,
            marginLeft: 5
        };

        console.log("original email: ", this.state.email);
        console.log("original password: ", this.state.password);
        console.log("original password2: ", this.state.password2);
        console.log("original erroremail: ", this.state.errorTextEmail);
        console.log("original errorpassword: ", this.state.errorTextPassword);

        return(
            <div className={classes.container}>
                <Grid container justify="center" spacing={256}>
                    <Grid item xs={12}>
                        <FormControl>
                            <TextField
                                label="Email"
                                margin="normal"
                                variant="outlined"
                                onChange = {(event) => this.setState({email: event.target.value})}
                            />
                            <FormHelperText style={errorStyle}>{this.state.errorTextEmail}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                        <TextField
                            label="Password"
                            margin="normal"
                            variant="outlined"
                            onChange = {(event) => this.setState({password: event.target.value})}
                        />
                        <FormHelperText style={errorStyle}>{this.state.errorTextPassword}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl>
                        <TextField
                            label="Confirm Password"
                            margin="normal"
                            variant="outlined"
                            onChange = {(event) => this.setState({password2: event.target.value})}
                        />
                            <FormHelperText style={errorStyle}>{this.state.errorTextPassword2}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}><br/><br/></Grid>
                    <Grid item xs={12}>
                        <Button
                            className={classes.signinBtn}
                            variant="outlined"
                            onClick={this.onClickCreateAccount}
                        >
                            Create Account
                        </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

SignIn.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);
