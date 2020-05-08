import React, {useContext, useEffect, useState} from 'react'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import PersonIcon from '@material-ui/icons/Person'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Style from './NavMenu.module.css'
import Button from "@material-ui/core/Button"
import {AppContext} from "../../../../../Context/AppContext"
import Divider from '@material-ui/core/Divider';
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery"

import Logo from '../../../../../Assets/logo_white.png'
import LogoSm  from '../../../../../Assets/logo_only.png'


const NavMenu = (props) => {
    const contextVal = useContext(AppContext)
    const [name, setName] = useState("")
    const [anchorEl, setAnchorEl] = useState(null);
    const [logo, setLogo] = useState(null)

    const theme = useTheme()
    const phoneScreenSize = useMediaQuery(theme.breakpoints.down('xs'))

    useEffect(() => {
        if (contextVal.user)
            setName(contextVal.user.name)
    },[contextVal.user])

    useEffect(()=>{
        if (phoneScreenSize){
            setLogo(LogoSm)
        }else{
            setLogo(Logo)
        }
    },[phoneScreenSize])

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={Style.NavMenu}>
            <img src={logo} alt={"Click2Short"}/>
            <Button
                variant={"text"}
                size={"medium"}
                color={"inherit"}
                onClick={(event => handleClick(event))}
                startIcon={<PersonIcon color={"secondary"} fontSize={"large"}/>}
                endIcon={<ArrowDropDownIcon color={"secondary"}/>}>
                {name}
            </Button>

            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                elevation={2}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
                <MenuItem onClick={handleClose}>Account Settings</MenuItem>
                <Divider/>
                <MenuItem onClick={handleClose}>Contact Us</MenuItem>
                <MenuItem onClick={handleClose}>Terms & Conditions</MenuItem>
                <MenuItem onClick={props.logoutHandler}>Log Out</MenuItem>
            </Menu>
        </div>
    )
}

export default NavMenu
