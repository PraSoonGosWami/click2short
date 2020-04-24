import React, { useState } from 'react'
import BG_LARGE from '../../../../Assets/bg_large.jpg'
import Style from './HomePage.module.css'
import { Parallax } from 'react-parallax';
import Button from "@material-ui/core/Button";
import AxiosInstance from '../../../../Services/AxiosInstance/AxiosInstance'

import { Alert } from '@material-ui/lab';
import Snackbar from '@material-ui/core/Snackbar';



const HomePage = (props) => {

    const [longURL, setLongURL] = useState("")
    const [conv, setConv] = useState(false)
    const [err, setErr] = useState(false)
    const [errMsg,setErrMsg] = useState("")

    const textHandler = (event) => {
        event.preventDefault()
        if (event.target.value.toString().length === 0) {
            setConv(false)
        }
        setLongURL(event.target.value)
    }

    const blurHandler = (event) => {
        event.preventDefault()
        if (event.target.value.toString().length === 0) {
            setConv(false)
        }
    }


    const formHandler = (event) => {
        event.preventDefault()
        if (conv) {
            navigator.clipboard.writeText(longURL)
            setLongURL("")
            setConv(false)
            return alert("Copied")

        }
        if (!longURL) {
            return alert("Enter URL")
        }
        if (longURL.length < 5) {
            return alert("Please enter a valid url")
        }

        const url = 'url/create/no-auth'
        const data = { longURL: longURL.trim() }
        AxiosInstance.post(url, data)
            .then(res => {
                setLongURL(process.env.REACT_APP_REDIRECT_URL + res.data.urlCode)
                setConv(true)
            })
            .catch(err => {
                setConv(false)
                setErrMsg(err.response.data.message)
                setErr(true)
               
            })


    }

    return (
        <div className={Style.HomePage}>
            <Snackbar open={err} autoHideDuration={6000} onClose={()=> setErr(false)} anchorOrigin={{vertical: "top", horizontal: "center" }} >
                <Alert severity="error" variant="filled" onClose={()=> setErr(false)} >
                    {errMsg}
                </Alert>
            </Snackbar>

            <Parallax blur={{ min: -15, max: 15 }}
                bgImage={BG_LARGE}
                bgImageAlt="BG IMG"
                strength={500}>
                <div className={Style.HomePageDiv}>
                    <h1>Create short links with a single click</h1>
                    <h2>Convert long boring URLs into short easily manageable links with click counter.</h2>
                    <Button variant="contained" color="primary" size={"large"}>Get started for free</Button>
                </div>
            </Parallax>

            <section>
                <form onSubmit={(event) => formHandler(event)}>
                    <input
                        type={"text"}
                        required={true}
                        placeholder="Paste long URL"
                        onChange={(event) => textHandler(event)}
                        value={longURL}
                        onBlur={(event) => blurHandler(event)} />
                    <Button
                        variant="contained"
                        color="primary"
                        size={"large"}
                        type={"submit"}
                    >{conv ? "Copy Link" : "Shorten"}</Button>
                </form>
            </section>

            <main>

            </main>
        </div>
    )
}

export default HomePage
