import React from 'react'
import logo from '../../../../../Assets/logo.png'
import Style from './Logo.module.css'

const Logo = (props) => {
    return(
        <img src={logo} alt={"Click2Short"} className={Style.Logo}/>
        /*
        <Link to={'/'}>

        </Link>*/
    )
}

export default Logo
