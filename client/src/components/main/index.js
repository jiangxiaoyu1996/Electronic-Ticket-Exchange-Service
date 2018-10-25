import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardMedia from "@material-ui/core/es/CardMedia/CardMedia";
import Card from "@material-ui/core/es/Card/Card";
import { withStyles } from "@material-ui/core/styles/index";

import HeaderContainer from "../../containers/header/container";
import { styles } from "./style";
import image from "../../img/main.jpg";

class Main extends Component {
    render(){
        const { classes } = this.props;

        return(
            <div>
                <HeaderContainer/>
                <div className={classes.image}>
                    <Card>
                        <CardMedia
                            className={classes.cardMedia}
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
