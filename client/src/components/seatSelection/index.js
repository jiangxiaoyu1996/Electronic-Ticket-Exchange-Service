import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/es/Grid/Grid";
import Button from "@material-ui/core/es/Button/Button";
import {withStyles} from "@material-ui/core/styles/index";

import {styles} from "./styles";

class SeatSelection extends Component{
    handleClick(row, column){
        this.props.handleClick(row,column);
    }

    renderSeatRow(row, rIndex){
        const { classes } = this.props;

        return row.map((cell, cIndex) => {
            const row = rIndex + 1;
            const column = cIndex + 1;

            let button = null;

            if(Number.isInteger(cell)){
                if(cell === 0){
                    button = <Button
                        className={classes.unselectableSeatButton}
                        size="small"
                        variant="outlined"
                        disabled={true}
                    >
                        ({row},{column})
                    </Button>
                }else{
                    button = <Button
                        className={classes.selectableSeatButton}
                        size="small"
                        variant="outlined"
                        onClick={() => this.handleClick(row, column)}
                    >
                        ({row},{column})
                    </Button>
                }
            }else{
                if(cell === false){
                    button = <Button
                        className={classes.unselectableSeatButton}
                        size="small"
                        variant="outlined"
                        disabled={true}
                    >
                        ({row},{column})
                    </Button>
                }else{
                    button = <Button
                        className={classes.selectableSeatButton}
                        size="small"
                        variant="outlined"
                        onClick={() => this.handleClick(row, column)}
                    >
                        ({row},{column})
                    </Button>
                }
            }

            return (
                <Grid item xs={"auto"}>
                    {button}
                </Grid>
            )
        })
    }

    render(){
        const { classes } = this.props;

        return this.props.list.map((row, rIndex) => {
            return (
                <Grid container>
                    {this.renderSeatRow(row, rIndex)}
                </Grid>
            )
        })
    }
}

SeatSelection.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SeatSelection);