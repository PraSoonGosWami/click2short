import React, {useContext, useState} from 'react'
import Style from "../Login/Login.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";

import AxiosInstance from '../../../../../Services/AxiosInstance/AxiosInstance'
import {AppContext} from "../../../../../Context/AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";
import useAlert from "../../../../../Hooks/useAlert/useAlert";


const Signup = (props) => {

    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))

    const contextVal = useContext(AppContext)

    const {addAlert} = useAlert()
    const [email, setEmail] = useState("")
    const [psd, setPsd] = useState("")
    const [phone, setPhone] = useState("")
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")

    // error messages for text fields
    const [emailError, setEmailError] = useState("")
    const [psdError, setPsdError] = useState(" ")
    const [phoneError, setPhoneError] = useState("")
    const [fNameError, setFNameError] = useState("")
    const [lNameError, setLNameError] = useState("")

    const [disButton, setDisButton] = useState(true)
    const  [loading, setLoading] = useState(false)

    const fNameTextHandler = (event) => {
        const val = event.target.value
        setDisButton(false)
        setFName(val)
        if (val.length === 0) {
            setFNameError("Please enter first name")
            return
        }
        setFNameError('')

    }
    const lNameTextHandler = (event) => {
        const val = event.target.value
        setDisButton(false)
        setLName(val)
        if (val.length === 0) {
            setLNameError("Please enter first name")
            return
        }

        setLNameError('')
    }
    const emailTextHandler = (event) => {
        const val = event.target.value
        setDisButton(false)
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        setEmail(val)
        if (val.length === 0) {
            setEmailError("Please enter your email")
            return
        }
        if (!regex.test(val)) {
            setEmailError("Invalid email entered!")
            return
        }
        setEmailError('')

    }
    const psdTextHandler = (event) => {
        setDisButton(false)
        const val = event.target.value
        setPsd(val)
        if (val.length === 0) {
            setPsdError("Please enter a password")
            return
        }
        if (val.length <= 7) {
            setPsdError("Password must be at least 8 characters long")
            return
        }
        setPsdError('')
    }
    const phoneTextHandler = (event) => {
        setDisButton(false)
        const val = event.target.value
        setPhone(val)
        const regex = /^\d+$/
        if (val.length === 0) {
            setPhoneError("Please enter phone")
            return
        }
        if (!regex.test(val) || val.length !== 10) {
            setPhoneError("Invalid phone entered!")
            return
        }
        setPhoneError('')
    }

    const formEventHandler = (event) => {
        event.preventDefault()
        setLoading(true)
        const url = 'user/signup'
        const data = {
            name: fName.toString().trim() + " " + lName.toString().trim(),
            email: email.toString().trim(),
            phone: phone.toString().trim(),
            password: psd.toString().trim()
        }

        AxiosInstance.post(url, data)
            .then(res=>{
                console.log(res.data)
                contextVal.setUser(res.data.user)
                contextVal.setIsLoggedIn(true)
                localStorage.setItem("user", JSON.stringify(res.data.user))
            })
            .catch(err => {addAlert(err.response.data.message,'error')})
            .finally(() => setLoading(false))

    }
    return (
        <div className={Style.Login}>
            <h3>Let's get started</h3>
            <h4>Sign up to unlock awesome features</h4>
            <form onSubmit={(event) => formEventHandler(event)}>
                <TextField
                    label="First name"
                    variant="outlined"
                    size={"medium"}
                    required
                    fullWidth={fullScreen}
                    helperText={fNameError}
                    error={fNameError.length > 0}
                    value={fName}
                    type="name" onChange={(event) => {
                    fNameTextHandler(event)
                }}/>
                <TextField
                    label="Last name"
                    variant="outlined"
                    size={"medium"}
                    required
                    fullWidth={fullScreen}
                    helperText={lNameError}
                    error={lNameError.length > 0}
                    value={lName}
                    type="name" onChange={(event) => {
                    lNameTextHandler(event)
                }}/> <br/>
                <TextField
                    label="Email"
                    variant="outlined"
                    size={"medium"}
                    required
                    helperText={emailError}
                    error={emailError.length > 0}
                    value={email}
                    onChange={(event) => {
                        emailTextHandler(event)
                    }}
                    fullWidth type="email"/> <br/>
                <TextField
                    label="Phone"
                    variant="outlined"
                    size={"medium"}
                    required
                    helperText={phoneError}
                    error={phoneError.length > 0}
                    value={phone}
                    onChange={(event) => {
                        phoneTextHandler(event)
                    }}
                    fullWidth type="tel"/> <br/>
                <TextField
                    label="Password"
                    variant="outlined"
                    size={"medium"}
                    required
                    helperText={psdError}
                    error={psdError.length > 1}
                    value={psd}
                    onChange={(event) => {
                        psdTextHandler(event)
                    }}
                    fullWidth type={'password'}/> <br/>
                <Button
                    type={"submit"}
                    variant="contained" color="primary" size="large"
                    disabled={disButton ? true : (
                        emailError.length !== 0 || psdError.length !== 0 ||
                        fNameError.length !== 0 || lNameError.length !== 0 ||
                        phoneError.length !== 0
                    )}
                >{loading? <CircularProgress color={"secondary"}/> : "Sign up"}</Button>
            </form>
            <h5 className={Style.LoginForgotPsd}>** Your data is encrypted and stored securely in our database</h5>
        </div>
    )
}

export default Signup
