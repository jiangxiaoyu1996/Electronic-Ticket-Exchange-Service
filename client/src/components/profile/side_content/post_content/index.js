import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

import {styles} from "../styles";
import SeatSelection from "../../../seatSelection"
import Button from "@material-ui/core/es/Button/Button";
import Dialog from "@material-ui/core/es/Dialog/Dialog";
import DialogTitle from "@material-ui/core/es/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/es/DialogContent/DialogContent";
import DialogContentText from "@material-ui/core/es/DialogContentText/DialogContentText";
import DialogActions from "@material-ui/core/es/DialogActions/DialogActions";

class PostTicketContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedEvent: "",
            selectedRow: "TBD",
            selectedColumn: "TBD",
            price: "",
            open: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name] : event.target.value,
            selectedRow: "TBD",
            selectedColumn: "TBD",
            price: ""
        });
    };

    handleClick(row, column){
        this.setState({
            selectedRow: row,
            selectedColumn: column
        })
    }

    handlePrice(event){
        this.setState({
            price: event.target.value
        })
    }

    handlePost(){
        if(this.state.selectedEvent !== "" && this.state.selectedRow !== "TBD" && this.state.selectedColumn !== "TBD"
            && this.state.price !== ""){
            this.props.sellTicket(this.state.selectedEvent, this.state.selectedRow,
                this.state.selectedColumn, this.props.user, this.state.price);
        }else{
            this.setState({ open: true });
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };

    renderEventInfo(){
        const { classes } = this.props;

        console.log("row: ", this.state.selectedRow);
        console.log("column: ", this.state.selectedColumn);
        console.log("price: ", this.state.price);

        if(this.state.selectedEvent !== ""){
            const targetEvent = findTargetEvent(this.props.eventlist, this.state.selectedEvent)[0];
            const avaiableSeatForSelling = findAvaiableSeatForSelling(targetEvent.maxRow, targetEvent.maxCol, targetEvent.notSellableSeat);
            console.log(avaiableSeatForSelling);
            return (
                <div className={classes.textField}>
                    <Typography variant="h6">
                        Event Name:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                       {targetEvent.name}
                    </Typography>
                    <Typography variant="h6">
                        Event Description:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {targetEvent.description}
                    </Typography>
                    <Typography variant="h6">
                        Event Location:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {targetEvent.location}
                    </Typography>
                    <Typography variant="h6">
                        Event Date:
                    </Typography>
                    <Typography className={classes.eventDetailContent}>
                        {targetEvent.date}
                    </Typography>
                    <Typography variant="h6">
                        Event Sellable Seats:
                    </Typography>
                    <div className={classes.eventDetailContent}>
                        <SeatSelection list={avaiableSeatForSelling} handleClick={this.handleClick}/>
                    </div>
                    <Typography className={classes.eventDetailContent}>
                        Your Seat Selection: ({this.state.selectedRow},{this.state.selectedColumn})
                    </Typography>
                    <Typography variant="h6">
                        Seat Price:
                    </Typography>
                    <TextField
                        id="outlined-number"
                        label="Price"
                        value={this.state.price}
                        onChange={(event) => this.handlePrice(event)}
                        type="number"
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                    />
                    <div>
                        <Button
                            className={classes.postingButton}
                            variant="outlined"
                            size={"medium"}
                            onClick={() => this.handlePost()}
                        >
                            Post Ticket
                        </Button>
                    </div>
                </div>
            )
        }
    }

    render(){
        const { classes } = this.props;
        const events = getEventNames(this.props.eventlist);

        return (
            <div className={classes.content}>
                <TextField
                    id="outlined-select-currency"
                    select
                    label="Select"
                    className={classes.textField}
                    value={this.state.selectedEvent}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    helperText="Please select a event for posting"
                    margin="normal"
                    onChange={this.handleChange('selectedEvent')}
                >
                    {events.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                {this.renderEventInfo()}
                <div>
                    <Dialog
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Posting Requirement Incompletion"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Please check event and seat selection as well as price input field before posting action.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleClose} autoFocus>
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </div>
        );
    }
}

function getEventNames(array){
    let result = [];
    if(array !== undefined){
        array.forEach(event => {
            result.push(event.name)
        });
    }
    return result;
}

function findTargetEvent(array, target){
    return array.filter(event => event.name === target);
}

function findAvaiableSeatForSelling(row, col, avoid){
    let set = new Set();
    avoid.forEach(seat => {
        let seatLocation = [];
        seatLocation.push(seat[0]);
        seatLocation.push(seat[1]);
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
                    result[i][j] = false;break;
                }else{
                    result[i][j] = true;
                }
                //console.log(i,j,result[i][j]);
            }

        }
    }
    //console.log(result);
    return result;
}

PostTicketContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostTicketContent);
