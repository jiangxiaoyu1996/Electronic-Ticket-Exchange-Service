import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles/index";
import Paper from "@material-ui/core/es/Paper/Paper";

import AccountContent from "./account_content";
import PostTicketContent from "./post_content";
import PurchaseContent from "./purchase_content";
import SellingContent from "./selling_content";
import * as ComponentString from "../../../static/component";
import { styles } from "./styles";

class ProfileContent extends Component {
    render(){
        const { classes } = this.props;

        let temp = null;
        switch(this.props.currentNav){
            case ComponentString.MY_ACCOUNT:
                temp = <AccountContent
                            userInfo={this.props.userInfo}
                            updateAddress={this.props.updateAddress}
                            updateUsername={this.props.updateUsername}
                            getProfile={this.props.getProfile}
                        />;
                break;
            case ComponentString.POST_TICKET:
                temp = <PostTicketContent
                        eventlist={this.props.eventlist}
                        user={this.props.userInfo.email}
                        address={this.props.userInfo.address}
                        sellTicket={this.props.sellTicket}
                        sellingTicketResult={this.props.sellingTicketResult}
                        sellTicketReset={this.props.sellTicketReset}
                        getEventListForPosting={this.props.getEventListForPosting}
                />;
                break;
            case ComponentString.PURCHASE_HISTORY:
                temp = <PurchaseContent
                            purchaseRecord={this.props.purchaseRecord}
                            getProfile={this.props.getProfile}
                        />;
                break;
            case ComponentString.SELLING_HISTORY:
                temp = <SellingContent
                            sellingRecord={this.props.sellingRecord}
                            getProfile={this.props.getProfile}
                        />;
                break;
            default:
                console.log("Unsupported navigation menu in profile page");
        }

        return(
            <div className={classes.container}>
                <Paper style={{boxShadow: "none"}} >
                    {temp}
                </Paper>
            </div>
        );
    }
}

ProfileContent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileContent);