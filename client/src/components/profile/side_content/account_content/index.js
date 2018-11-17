import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "../styles";
import TextField from "@material-ui/core/es/TextField/TextField";
import Grid from "@material-ui/core/es/Grid/Grid";

class AccountContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            username: ''
        }
    }

    render(){
        const { classes } = this.props;

        //console.log(this.state.address);
        return (
            <div className={classes.content}>
                <Grid container justify="center" spacing={256}>
                    <Grid item xs={12}>
                        <Typography>
                            Email
                        </Typography>
                        <TextField
                            id="outlined-read-only-input"
                            value={this.props.userInfo.email}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Username
                        </Typography>
                        <TextField
                            id="outlined-name"
                            className={classes.textField}
                            value={this.props.userInfo.username}
                            margin="normal"
                            variant="outlined"
                            onChange = {(event) => this.setState({username: event.target.value})}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Address
                        </Typography>
                        <TextField
                            id="outlined-name"
                            className={classes.textField}
                            value={this.props.userInfo.address}
                            margin="normal"
                            variant="outlined"
                            onChange = {(event) => this.setState({address: event.target.value})}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }
}

AccountContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContent);