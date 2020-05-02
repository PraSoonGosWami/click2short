import React, {useContext, useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Style from './Login.module.css'
import Button from "@material-ui/core/Button";
import {AppContext} from "../../../../../Context/AppContext";
import AxiosInstance from '../../../../../Services/AxiosInstance/AxiosInstance'

const Login = (props) => {

    const contextVal = useContext(AppContext)

    const [check, setCheck] = useState(false)

    const [email, setEmail] = useState("")
    const [psd, setPsd] = useState("")

    // error messages for text fields
    const [emailError, setEmailError] = useState("")
    const [psdError, setPsdError] = useState(" ")

    const [disButton, setDisButton] = useState(true)

    const emailTextHandler = (event) => {
        const val = event.target.value
        setDisButton(false)
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        setEmail(val)
        if (val.length === 0) {
            setEmailError("Please enter your email")
            return
        }
        if(!regex.test(val)){
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
        setPsdError('')
    }

    const formEventHandler = (event) => {
        event.preventDefault()
        const url = 'user/signin'
        const data = {email : email.toString().trim(), password : psd.toString().trim()}

        AxiosInstance.post(url,data)
            .then(res => {
                contextVal.setUser(res.data)
                contextVal.setIsLoggedIn(true)
                localStorage.setItem("user", JSON.stringify(res.data.user))
            })
            .catch(err=> console.log(err.response.data.message))



    }
    return (
        <div className={Style.Login}>
            <h3>Welcome back</h3>
            <h4>Log in to continue</h4>
            <form onSubmit={(event) => formEventHandler(event)}>
                <TextField
                    label="Email"
                    variant="outlined"
                    size={"medium"}
                    required
                    helperText={emailError}
                    error={emailError.length >0}
                    value={email}
                    onChange={(event) => emailTextHandler(event)}
                    fullWidth type="email"/> <br/>
                <TextField
                    label="Password"
                    variant="outlined"
                    size={"medium"}
                    required
                    helperText={psdError}
                    error={psdError.length > 1}
                    value={psd}
                    onChange={(event) => psdTextHandler(event)}
                    fullWidth type={'password'}/> <br/>
                <span style={{display: "flex", alignItems: "center"}}>
                    <Checkbox
                        checked={check}
                        onChange={() => setCheck(prevState => !prevState)}
                        color={"primary"}
                        inputProps={{'aria-label': 'primary checkbox'}}
                    /> <h4 style={{fontWeight: "normal"}}>Remember me </h4>
                </span>
                <Button type={"submit"} variant="contained" color="primary" size="large"
                        disabled={disButton?true:(emailError.length !==0 || psdError.length !==0)}>Log
                    in</Button>
            </form>
            <h5 className={Style.LoginForgotPsd}>Forgot password</h5>
        </div>
    )
}

export default Login
