import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Card from "@material-ui/core/es/Card/Card";
import { withStyles } from "@material-ui/core/styles/index";

import Header from "../header";
import { styles } from "./style";
import image from "../../img/main.jpeg";

class Main extends Component {
    render(){
        const { classes } = this.props;

        return(
            <div>
                <Header />
                <div style={{marginTop: 65}}>
                    <Card style={{height: "100%"}}>
                        <CardMedia
                            style={{height: "-webkit-fill-available", width: "-webkit-fill-available"}}
                            image={image}
                            title="Ready for fun?"
                        />
                    </Card>
                </div>
            </div>
        );
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
