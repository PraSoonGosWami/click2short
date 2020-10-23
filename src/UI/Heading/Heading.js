import React from 'react'
import Style from './Heading.module.css'

const Heading = (props) => {
    return(
        <div className={Style.Heading}>
            <h3>{props.children}</h3>
        </div>
    )
}

export default Heading
