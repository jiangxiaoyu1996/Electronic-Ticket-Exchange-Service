import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "../styles";
import TextField from "@material-ui/core/es/TextField/TextField";
import Grid from "@material-ui/core/es/Grid/Grid";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import Button from "@material-ui/core/es/Button/Button";
import AlertDialog from "../../../alert_dialog";

class AccountContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: '',
            username: '',
            addressAlertOpen: false
        }
        this.handleUpdateAddress = this.handleUpdateAddress.bind(this);
    }

    handleClose = name => {
            this.setState({
                [name]: false
            });
    };

    handleUpdateAddress(){
        if(this.state.address === ''){
            this.setState({addressAlertOpen: true})
        }else{
            this.props.updateAddress(this.state.address);
            this.props.getProfile();
        }
    }

    render(){
        const { classes } = this.props;

        console.log(this.state.address);
        if(this.state.address !== undefined){
            console.log("inner: ", this.state.address);
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
                                Address: {this.props.userInfo.address}
                            </Typography>
                            <TextField
                                id="outlined-name"
                                className={classes.textField}
                                value={this.state.address}
                                margin="normal"
                                variant="outlined"
                                onChange = {(event) => this.setState({address: event.target.value})}
                            />
                            <Button onClick={() => this.handleUpdateAddress()}>
                                Update address
                            </Button>
                        </Grid>
                    </Grid>
                    <AlertDialog
                        open={this.state.addressAlertOpen}
                        handleClose={this.handleClose}
                        type={"addressAlertOpen"}
                        title={"Address Requirement Incompletion"}
                        content={" Please enter nonempty address."}
                    />
                </div>
            );
        }else{
            return (
                <div>
                    <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                </div>
            );
        }
    }
}

AccountContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AccountContent);