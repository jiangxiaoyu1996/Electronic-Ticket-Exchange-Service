import React, { Component } from 'react';
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";
import Button from "@material-ui/core/es/Button/Button";
import Countdown from 'react-countdown-now';

export default class CheckoutDialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            cancel: false,
            confirm: false,
        }
    }

    render() {
        console.log("checkoutOpen: ", this.props.open);

        const CheckoutClose = () => this.props.handleCheckoutClose();
        const ConfirmOrder = () => this.props.handleOrderConfimation();
        return (
            <div>
                <Dialog
                    open={this.props.open}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
                    <DialogContent>
                        <Countdown date={Date.now() + 20000}>
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
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.setState({cancel: true})} color="primary">
                            Cancel
                        </Button>
                        {this.state.cancel === true ? <CheckoutClose/> : null}
                        <Button onClick={() => this.setState({confirm: true})} color="primary">
                            Confirm Order
                        </Button>
                        {this.state.confirm === true ? <ConfirmOrder/> : null}
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}