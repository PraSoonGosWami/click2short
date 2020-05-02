import React from 'react'
import Style from './Spinner.module.css'
const Spinner = (props) => {
    return(
        <div className={Style.spinner}>
            <div className={Style.cube1}></div>
            <div className={Style.cube2}></div>
        </div>
    )
}

export default Spinner
