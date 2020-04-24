import React from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const DialogModal = (props) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
    return(
        <Dialog
            fullScreen={fullScreen}
            open={props.show}
            onClose={props.handler}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogContent>{props.content}</DialogContent>
        </Dialog>
    )
}

export default DialogModal
