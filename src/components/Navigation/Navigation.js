import React from 'react'
import Style from './Navigation.module.css'
import Logo from "./Logo/Logo";
import NavigationItem from "./NavigationItem/NavigationItem";
import Button from '@material-ui/core/Button';


const Navigation = () => {
    return(
        <div className={Style.Navigation}>
            <Logo/>
            <div className={Style.NavigationItems}>
                <NavigationItem to='/' name={"Home"}/>
                <NavigationItem to='/login' name={"Log in"}/>
                <NavigationItem to='/signup' name={"Sign up"}/>
                <Button variant="contained" color="primary" size={"medium"} href={"https:prasoon.me/contact"} target={"_blank"}>Contact author</Button>
            </div>
        </div>
    )
}

export default Navigation
