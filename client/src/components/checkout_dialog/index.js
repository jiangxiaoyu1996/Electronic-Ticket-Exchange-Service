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
            payment: '',
            deliveryErrorOpen: false,
            paymentErrorOpen: false
        }
    }

    handleClose = name => {
            this.setState({
                [name]: false
            });
    };

    render() {
        console.log("payment: ", this.state.payment);
        const { classes } = this.props;
        const methods = ['Uber: Same day delivery', 'FedEx: One business day delivery', 'UPS: Two business days delivery'];

        const CheckoutClose = () => this.props.handleCheckoutClose();
        const ConfirmOrder = () => this.props.handleOrderConfimation(this.state.payment);

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
                            Please specify your payment card number:
                        </DialogContentText>
                        <DialogContentText>
                            <TextField
                                id="outlined-name"
                                label="Card number"
                                type="number"
                                margin="normal"
                                variant="outlined"
                                onChange = {(event) => this.setState({payment:event.target.value})}
                            />
                        </DialogContentText>
                        <DialogContentText>
                            Your card type: {validateCardNumber(parseInt(this.state.payment, 10)) ? getCardType(this.state.payment) :
                            (this.state.payment === '' ? '' : 'Cannot recognize')}
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
                            if(validateCardNumber(parseInt(this.state.payment, 10)) && getCardType(this.state.payment) !== ''){
                                if(this.state.delivery !== ''){
                                    this.setState({confirm: true})
                                }else{
                                    this.setState({deliveryErrorOpen: true})
                                }
                            }else{
                                this.setState({paymentErrorOpen: true})
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
                <AlertDialog
                    open={this.state.paymentErrorOpen}
                    handleClose={this.handleClose}
                    type={"paymentErrorOpen"}
                    title={"Payment Requirement Incompletion"}
                    content={" Please specify card number in correct format."}
                />
            </div>

        );
    }
}

function validateCardNumber(number) {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(number))
        return false;

    return luhnCheck(number);
}

function luhnCheck(val) {
    var sum = 0;
    for (var i = 0; i < val.length; i++) {
        var intVal = parseInt(val.substr(i, 1));
        if (i % 2 == 0) {
            intVal *= 2;
            if (intVal > 9) {
                intVal = 1 + (intVal % 10);
            }
        }
        sum += intVal;
    }
    return (sum % 10) == 0;
}

function getCardType(number)
{
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null)
        return "Visa";

    // Mastercard
    // Updated for Mastercard 2017 BINs expansion
    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "Mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "AMEX";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "Discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "Diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        return "Diners - Carte Blanche";

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "JCB";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        return "Visa Electron";

    return "";
}

CheckoutDialog.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckoutDialog);