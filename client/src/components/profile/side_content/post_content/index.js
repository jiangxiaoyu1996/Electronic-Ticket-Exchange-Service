import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import TextField from "@material-ui/core/es/TextField/TextField";
import Typography from '@material-ui/core/Typography';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

import {styles} from "../styles";
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";

class PostTicketContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedEvent: "",
            selectedRow: "",
            selectedColumn: "",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name] : event.target.value,
        });
    };

    handleClick(row, column){
        this.setState({
            selectedRow: row,
            selectedColumn: column
        })
    }

    renderEventInfo(){
        const { classes } = this.props;

        if(this.state.selectedEvent !== ""){
            const targetEvent = findTargetEvent(this.props.eventlist, this.state.selectedEvent)[0];
            //const avaiableSeatForSelling = findAvaiableSeatForSelling(targetEvent.maxRow, targetEvent.maxCol, targetEvent.notSellableSeat);
            return (
                <div className={classes.textField}>
                    <Typography variant="h6" color={"#FF8C00"}>
                        Event Name:
                    </Typography>
                    <Typography>
                        {"     "}  {   targetEvent.name}
                    </Typography>
                    <Typography variant="h6" color={"#FF8C00"}>
                        Event Description:
                    </Typography>
                    <Typography>
                        {"     "} {   targetEvent.description}
                    </Typography>
                    <Typography variant="h6" color={"#FF8C00"}>
                        Event Location:
                    </Typography>
                    <Typography>
                        {"     "} {   targetEvent.location}
                    </Typography>
                    <Typography variant="h6" color={"#FF8C00"}>
                        Event Date:
                    </Typography>
                    <Typography>
                        {"     "} {   targetEvent.date}
                    </Typography>
                    <Grid container spacing={24}>
                    </Grid>
                </div>
            )
        }
    }

    /*static renderSeat(list){
        return list.map((row, rIndex) => {
            return row.map((cell, cIndex) => {
                return (
                    <Grid item xs={1}>
                        <Button onClick={this.handleClick(rIndex, cIndex)}/>
                    </Grid>
                )
            })
        })
    }*/

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
    let result2 = [];
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
                    result2.push([s[0] - 1, s[1] - 1]);
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