import React from 'react'
import Style from './Navigation.module.css'
import Logo from "./Logo/Logo";
import Button from '@material-ui/core/Button';


const Navigation = (props) => {
    return(
        <div className={Style.Navigation}>
            <Logo/>
            <div className={Style.NavigationItems}>
                <Button variant="contained" color="primary" size="medium"
                        onClick={props.login}>Log in</Button>
                <Button variant="outlined" color="primary" size="medium"
                        onClick={props.signup}>Sign up</Button>
            </div>
        </div>
    )
}

export default Navigation
