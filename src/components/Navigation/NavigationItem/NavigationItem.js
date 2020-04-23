import React from 'react'
import Style from './NavigationItem.module.css'
import {NavLink} from "react-router-dom";

const NavigationItem = (props) => {
    return(
        <div className={Style.NavigationItem}>
            <NavLink to={props.to} exact activeClassName={Style.active}>{props.name}</NavLink>
        </div>
    )
}

export default NavigationItem
