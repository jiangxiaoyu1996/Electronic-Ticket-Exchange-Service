import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";

import ProfileNav from "./side_navigation";
import ProfileContent from "./side_content";
import ProfileWelcome from "./welcome";
import * as ComponentString from "../../static/component";
import { styles } from "./styles";

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentNav: ComponentString.MY_ACCOUNT,
        };
        this.updateCurrentNav = this.updateCurrentNav.bind(this);
    }

    updateCurrentNav(event, newNav){
        this.setState({currentNav: newNav});
    }

    render(){
        const { classes } = this.props;
        const navMenu = [ComponentString.MY_ACCOUNT, ComponentString.POST_TICKET, ComponentString.PURCHASE_HISTORY,
            ComponentString.SELLING_HISTORY];

        return(
            <div className={classes.container}>
                <ProfileWelcome user={this.props.user}/>
                <div className={classes.navigation}>
                    <ProfileNav
                        menu={navMenu}
                        updateCurrentNav={this.updateCurrentNav}
                    />
                    <ProfileContent
                        currentNav={this.state.currentNav}
                        userInfo={this.props.userInfo}
                        sellingRecord={this.props.sellingRecord}
                        purchaseRecord={this.props.purchaseRecord}
                        eventlist={this.props.eventlist}
                    />
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);