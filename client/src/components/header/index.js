import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';

const Header = () => {
    return (
        <div>
            <AppBar position="static" style={{backgroundColor: "#4169e1"}}>
                <Toolbar>
                    <Typography style={{color: "#FFFFFF", fontSize: "20px"}}>ETES</Typography>
                    <div>
                        <div style={{position: 'relative'}}>
                            <SearchIcon/>
                        </div>
                        <InputBase/>
                    </div>
                    <div/>
                    <div style={{textAlign: "right"}}>
                        <Button href={"/sign-in"} style={{color: "#FFFFFF"}}>Sign-in</Button>
                        <Button href={"/login"} style={{color: "#FFFFFF"}}>Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;