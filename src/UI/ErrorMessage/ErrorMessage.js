import React from 'react'
import Style from './ErrorMessage.module.css'
import Button from "@material-ui/core/Button";
const ErrorMessage = (props) => {
    return(
        <div className={Style.ErrorMessage}>
            <img src={props.src} alt={'Error logo'}/>
            <h4>{props.text}</h4>
            <Button
                variant={"outlined"}
                size={"medium"}
                color={"primary"}
                onClick={props.onClick}>
                {props.action}
            </Button>
        </div>
    )
}

export default ErrorMessage
