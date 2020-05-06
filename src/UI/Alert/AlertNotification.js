import React from 'react'
import Snackbar from "@material-ui/core/Snackbar";
import Alert from '@material-ui/lab/Alert'

const AlertNotification = (props) => {

    return (
        <Snackbar open={props.open} autoHideDuration={6000} onClose={props.onClose}
                  anchorOrigin={{vertical: "bottom", horizontal: "left"}} style={{marginBottom:"6px",marginLeft:"6px",marginRight:"6px"}}>
            <Alert severity={props.type} variant="filled" onClose={props.onClose} >
                {props.children}
            </Alert>
        </Snackbar>
    )
}

export default AlertNotification
