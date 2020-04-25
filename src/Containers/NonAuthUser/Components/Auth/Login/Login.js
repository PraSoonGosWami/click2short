import React from 'react'
import DialogModal from "../../../../../UI/DialogModal/DialogModal";

const Login = (props) => {
    return(
        <DialogModal open={props.open} onClose={props.onClose}>
            <div>
                <h2>Login</h2>
                <input/>
                <input/>
                <input/>
            </div>
        </DialogModal>
    )
}

export default Login
