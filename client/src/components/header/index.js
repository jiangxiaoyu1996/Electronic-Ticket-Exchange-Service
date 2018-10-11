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
            <AppBar position="static">
                <Toolbar>
                    <Typography style={{color: "#FFFFFF", fontSize: "20px"}}>ETES</Typography>
                    <div>
                        <div>
                            <SearchIcon/>
                        </div>
                        <InputBase/>
                    </div>
                    <div/>
                    <div>
                        <Button href={"/sign-in"}>Sign-in</Button>
                        <Button href={"/login"}>Login</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Header;