import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import Countdown from 'react-countdown-now';
import TextField from "@material-ui/core/es/TextField/TextField";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Map from "../map";
import {styles} from "./styles";
import {withStyles} from "@material-ui/core/styles/index";
import AlertDialog from "../alert_dialog";

class CheckoutDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            cancel: false,
            confirm: false,
            delivery: '',
            deliveryErrorOpen: false
        }
    }

    handleClose = name => {
            this.setState({
                [name]: false
            });
    };

    render() {
        //console.log("checkoutOpen: ", this.props.open);
        const { classes } = this.props;
        const methods = ['Uber: Same day delivery', 'FedEx: One business day delivery', 'UPS: Two business days delivery'];

        const CheckoutClose = () => this.props.handleCheckoutClose();
        //const ConfirmOrder = () => this.props.handleOrderConfimation();
        const ConfirmOrder = () => {
            this.props.handleOrderConfimation();
            this.props.sendEmail(this.props.email, this.props.name, this.props.selectedRow, this.props.selectedColumn, this.state.delivery);
            this.props.handleOrderConfimation();
        };


        return (
            <div>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
                    <DialogContent>
                        <Countdown date={Date.now() + 90000}>
                            <CheckoutClose/>
                        </Countdown>
                        <DialogContentText>
                            Please complete registration within 10:00 minutes.
                            After 10:00 minutes, the reservation we're holding will be released to others.
                        </DialogContentText>
                        <DialogContentText>
                            Ticket seat: ({this.props.selectedRow},{this.props.selectedColumn})
                        </DialogContentText>
                        <DialogContentText>
                            Ticket price: ${this.props.price}
                        </DialogContentText>
                        <DialogContentText>
                            Please select your delivery plan:
                        </DialogContentText>
                        <DialogContentText>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select"
                                value={this.state.delivery}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu,
                                    },
                                }}
                                helperText="Please select a delivery method"
                                margin="normal"
                                onChange={(event) => this.setState({delivery: event.target.value})}
                            >
                                {methods.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            {this.state.delivery === 'Uber: Same day delivery' ?
                                <Map
                                    dest={this.props.dest}
                                    src={this.props.src}
                                /> : null}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({cancel: true})} color="primary">
                            Cancel
                        </Button>
                        {this.state.cancel === true ? <CheckoutClose/> : null}
                        <Button onClick={() => {
                            if(this.state.delivery !== ''){
                                this.setState({confirm: true})
                            }else{
                                this.setState({deliveryErrorOpen: true})
                            }
                        }
                        } color="primary">
                            Confirm Order
                        </Button>
                        {this.state.confirm === true ? <ConfirmOrder/> : null}
                    </DialogActions>
                </Dialog>
                <AlertDialog
                    open={this.state.deliveryErrorOpen}
                    handleClose={this.handleClose}
                    type={"deliveryErrorOpen"}
                    title={"Delivery Requirement Incompletion"}
                    content={" Please specify delivery option."}
                />
            </div>

        );
    }
}

CheckoutDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckoutDialog);