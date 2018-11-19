import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "./styles";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import SeatSelection from "../seatSelection";
import Button from "@material-ui/core/es/Button/Button";
import AlertDialog from "../alert_dialog";
import CheckoutDialog from "../checkout_dialog";
import Redirect from "react-router-dom/es/Redirect";

class EventDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRow: 'TBD',
            selectedColumn: 'TBD',
            price: 0,
            sellerAddress: '',
            validationOpen: false,
            loginAlertOpen: false,
            addressAlertOpen: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleCheckout = this.handleCheckout.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleCheckoutClose = this.handleCheckoutClose.bind(this);
        this.handleOrderConfimation = this.handleOrderConfimation.bind(this);
    }

    handleCheckout(){
        if(this.state.selectedRow === "TBD" || this.state.selectedColumn === "TBD" || this.state.price === 0){
            this.setState({
                validationOpen: true
            })
        }else if(JSON.stringify(this.props.profile) === JSON.stringify(
                {
                    "UserInfo": [{}],
                    "Record": [{}]
                }
            )){
            this.setState({
                loginAlertOpen: true
            })
        }else if(this.props.profile.UserInfo[0].address === null || this.props.profile.UserInfo[0].address.length < 1){
            this.setState({
                addressAlertOpen: true
            })
        }else{
            this.props.getSellerAddress(this.props.selectedEvent[0].name, this.state.selectedRow, this.state.selectedColumn);
            if(this.props.sellerAddress !== null){
                this.setState({
                    sellerAddress: this.props.sellerAddress
                });
                this.props.lockTicketForBuying(this.props.selectedEvent[0].name, this.state.selectedRow, this.state.selectedColumn);
            }else{
                return(
                    <div>
                        <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                    </div>
                )
            }
        }
    }

    handleClick(row, column){
        this.setState({
            selectedRow: row,
            selectedColumn: column,
            price: findAvaiableSeatForBuying(this.props.selectedEvent[0].maxRow,this.props.selectedEvent[0].maxCol,
                this.props.selectedEvent[0].buyableSeat)[row-1][column-1],
        })
    }

    handleClose = name => {
        if(name === "timestampAlertOpen"){
            this.props.lockTicketReset();
        }else{
            this.setState({
                [name]: false
            });
        }
    };

    handleCheckoutClose(){
        this.props.unlockTicketForBuying(this.props.selectedEvent[0].name, this.state.selectedRow, this.state.selectedColumn);
        this.props.sellerAddressReset();
        return (
            <Redirect to={'/'} />
        );
    }

    handleOrderConfimation(){
        this.props.unlockTicketForBuying(this.props.selectedEvent[0].name, this.state.selectedRow, this.state.selectedColumn);
        this.props.buyTicket(this.props.profile.UserInfo[0].email, this.props.selectedEvent[0].name, this.state.selectedRow, this.state.selectedColumn);
        this.props.sellerAddressReset();
        return (
            <Redirect to={'/profile'} />
        );
    }

    render(){
        const { classes } = this.props;
        //console.log("error: ", this.props.selectedEvent);
        console.log("seller address api: ", this.props.sellerAddress);
        console.log("seller address state: ", this.state.sellerAddress);

        if(this.props.selectedEvent !== undefined){
            const avaiableSeatForBuying = findAvaiableSeatForBuying(this.props.selectedEvent[0].maxRow,this.props.selectedEvent[0].maxCol,
                this.props.selectedEvent[0].buyableSeat);

            return(
                <div className={classes.container}>
                    <Typography variant="h6">
                        Event Name:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {this.props.selectedEvent[0].name}
                    </Typography>
                    <Typography variant="h6">
                        Event Description:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {this.props.selectedEvent[0].description}
                    </Typography>
                    <Typography variant="h6">
                        Event Location:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {this.props.selectedEvent[0].location}
                    </Typography>
                    <Typography variant="h6">
                        Event Date:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {this.props.selectedEvent[0].date}
                    </Typography>
                    <Typography variant="h6">
                        Event Seats:
                    </Typography>
                    <div className={classes.eventDetailContent}>
                        <SeatSelection list={avaiableSeatForBuying} handleClick={this.handleClick}/>
                    </div>
                    <Typography className={classes.eventDetailContent}>
                        Your Seat Selection: ({this.state.selectedRow},{this.state.selectedColumn})
                    </Typography>
                    <Typography variant="h6">
                        Seat Price: ${this.state.price}
                    </Typography>
                    <div>
                        <Button
                            className={classes.checkoutButton}
                            variant="outlined"
                            size={"medium"}
                            onClick={() => this.handleCheckout()}
                        >
                            Make an Order
                        </Button>
                    </div>
                    <AlertDialog
                        open={this.state.validationOpen}
                        handleClose={this.handleClose}
                        type={"validationOpen"}
                        title={"Purchase Requirement Incompletion"}
                        content={" Please check seat selection before checkout action."}
                    />
                    <AlertDialog
                        open={this.state.loginAlertOpen}
                        handleClose={this.handleClose}
                        type={"loginAlertOpen"}
                        title={"Account Requirement Incompletion"}
                        content={" Please log in or sign up before checkout process."}
                    />
                    <AlertDialog
                        open={this.state.addressAlertOpen}
                        handleClose={this.handleClose}
                        type={"addressAlertOpen"}
                        title={"Address Requirement Incompletion"}
                        content={" Please specify address in account profile before checkout process."}
                    />
                    <AlertDialog
                        open={this.state.addressAlertOpen}
                        handleClose={this.handleClose}
                        type={"addressAlertOpen"}
                        title={"Address Requirement Incompletion"}
                        content={" Please specify address in account profile before checkout process."}
                    />
                    <AlertDialog
                        open={this.props.lockTicket === null ? false : !this.props.lockTicket}
                        handleClose={this.handleClose}
                        type={"timestampAlertOpen"}
                        title={"Timestamp Error"}
                        content={" Please try again later or select a different seat."}
                    />
                    <CheckoutDialog
                        open={this.props.lockTicket === null ? false : this.props.lockTicket}
                        handleCheckoutClose={this.handleCheckoutClose}
                        handleOrderConfimation={this.handleOrderConfimation}
                        name={this.props.selectedEvent[0].name}
                        selectedRow={this.state.selectedRow}
                        selectedColumn={this.state.selectedColumn}
                        price={this.state.price}
                        dest={this.props.profile.UserInfo[0].address}
                        src={this.state.sellerAddress}
                    />
                </div>
            );
        }else{
            return (
                <div>
                    <CircularProgress size={50} style={{ color: "#FF8C00" }} thickness={7} />
                </div>
            )
        }
    }
}

function findAvaiableSeatForBuying(row, col, avoid){
    let set = new Set();
    avoid.forEach(seat => {
        let seatLocation = [];
        seatLocation.push(seat[0]);
        seatLocation.push(seat[1]);
        seatLocation.push(seat[2]);
        set.add(seatLocation);
    });
    //console.log(set);
    let result = [];
    for(let i = 0; i < row; i++){
        result[i] = [];
        for(let j = 0; j < col; j++){
            const temp = [i, j];
            //console.log("temp: ", temp);
            for(let s of set){
                const r = [s[0] - 1, s[1] - 1];
                //console.log("r: ", r);
                if(JSON.stringify(r) === JSON.stringify(temp)){
                    result[i][j] = s[2];break;
                }else{
                    result[i][j] = 0;
                }
                //console.log(i,j,result[i][j]);
            }

        }
    }
    //console.log(result);
    return result;
}

EventDetail.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EventDetail);
