import React, { Component } from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import TextField from "@material-ui/core/es/TextField/TextField";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

import {styles} from "../styles";

class PostTicketContent extends Component{
    constructor(props){
        super(props);
        this.state = {
            selectedEvent: "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            selectedEvent : event.target.value,
        });
    };

    render(){
        const { classes } = this.props;
        console.log("state: ", this.state.selectedEvent);
        const events = [
            {
                name: "Event 1"
            },
            {
                name: "Event 2"
            },
            {
                name: "Event 3"
            }
        ];

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
                        <MenuItem key={option.name} value={option.name}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        );
    }
}

PostTicketContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostTicketContent);