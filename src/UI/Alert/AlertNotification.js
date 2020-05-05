import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert'

const AlertNotification = (props) => {

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}
                  anchorOrigin={{vertical: "top", horizontal: "left"}}>
            <Alert severity={props.type} variant="filled" onClose={props.onClose}>
                {props.children}
            </Alert>
        </Snackbar>
    )
}

export default AlertNotification
