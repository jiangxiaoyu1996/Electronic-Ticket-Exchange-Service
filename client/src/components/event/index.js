import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Typography from "@material-ui/core/es/Typography/Typography";

import {styles} from "./styles";
import CircularProgress from "@material-ui/core/es/CircularProgress/CircularProgress";
import SeatSelection from "../seatSelection";
import Button from "@material-ui/core/es/Button/Button";

class EventDetail extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedRow: 'TBD',
            selectedColumn: 'TBD',
            price: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(row, column){
        this.setState({
            selectedRow: row,
            selectedColumn: column,
            price: findAvaiableSeatForBuying(this.props.selectedEvent[0].maxRow,this.props.selectedEvent[0].maxCol,
                this.props.selectedEvent[0].buyableSeat)[row-1][column-1]
        })
    }

    render(){
        const { classes } = this.props;

        if(this.props.selectedEvent !== undefined){
            console.log("l:", this.props.selectedEvent);
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
                        >
                            Checkout
                        </Button>
                    </div>
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
