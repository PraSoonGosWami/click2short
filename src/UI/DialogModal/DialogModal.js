import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const DialogModal = (props) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.open}
            onClose={props.onClose}
        >
            <DialogContent style={{maxWidth:"600px", padding:"0"}}>{props.children}</DialogContent>
        </Dialog>
    )
}

export default DialogModal
