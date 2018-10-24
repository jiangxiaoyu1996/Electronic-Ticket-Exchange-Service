import React, { Component } from 'react';
import Header from "../header";
import Grid from "@material-ui/core/es/Grid/Grid";
import TextField from "@material-ui/core/es/TextField/TextField";
import Button from "@material-ui/core/es/Button/Button";

export default class SignIn extends Component {
    state = {
        email: '',
        password: '',
        password2: '',
    };

    render(){
        const { classes } = this.props;

        return(
            <div style={{marginTop: 65, paddingLeft: "40%"}}>
                <Header />
                <Grid container justify="center" spacing={256}>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-name"
                            label="Email"
                            margin="normal"
                            variant="outlined"
                            helperText="Enter your Email"
                            onChange = {(event,newValue) => this.setState({username:newValue})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-name"
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            helperText="Enter your password"
                            onChange = {(event,newValue) => this.setState({password:newValue})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="outlined-name"
                            label="Password"
                            type="password"
                            margin="normal"
                            variant="outlined"
                            helperText="Enter your password again"
                            onChange = {(event,newValue) => this.setState({password2:newValue})}
                        />
                    </Grid>
                    <Grid item xs={12}><br/><br/></Grid>
                    <Grid item xs={12}>
                        <Button variant="outlined">Create Account</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}