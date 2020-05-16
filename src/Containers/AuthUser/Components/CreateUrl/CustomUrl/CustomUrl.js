import React, {useContext, useState} from 'react'
import Style from './CustomUrl.module.css'
import AxiosInstance from '../../../../../Services/AxiosInstance/AxiosInstance'
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import {AppContext} from "../../../../../Context/AppContext";
import useAlert from "../../../../../Hooks/useAlert/useAlert";
import InputAdornment from "@material-ui/core/InputAdornment";
import {useHistory} from "react-router";

const CustomUrl = (props) => {

    const [loading, setLoading] = useState(false)
    const [shortUrl, setShortUrl] = useState(null)
    const [longURL, setLongUrl] = useState(null)
    const [urlCode, setUrlCode] = useState(null)
    const [disabled, setDisable] = useState(true)

    const redirectUrlBegin = process.env.REACT_APP_REDIRECT_URL

    const {token} = useContext(AppContext)
    const history = useHistory()
    const {addAlert} = useAlert()

    const longUrlHandler = (event) => {
        const value = event.target.value
        if (value === null || value.toString().trim().length === 0) {
            setDisable(true)
            setShortUrl(null)
        } else {
            setLongUrl(value.toString().trim())
        }
    }

    const urlCodeHandler = (event) => {
        const value = event.target.value
        if (value === null || value.toString().trim().length === 0) {
            setDisable(true)
            setUrlCode(null)
        } else {
            setUrlCode(value.toString().trim())
            setDisable(false)
        }
    }

    const copyButtonHandler = () => {
        if (shortUrl) {
            navigator.clipboard.writeText(shortUrl)
            addAlert("Short link copied to clipboard", 'success')
        }
    }

    const formEventHandler = (event) => {
        event.preventDefault()
        setLoading(true)
        const url = 'url/create/custom'
        const data = {longURL, urlCode}
        AxiosInstance.post(url, data, {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => {
                console.log(res.data)
                setShortUrl("http://" + redirectUrlBegin + urlCode)
                addAlert(res.data.message, 'info')
            })
            .catch(err => {
                setShortUrl(null)
                if (err.response)
                    addAlert(err.response.data.message, 'error')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <div className={Style.CustomUrl}>
            <h4>Create your custom short URL which is easy to remember and share</h4>
            <form onSubmit={event => formEventHandler(event)}>
                <TextField
                    label="Paste long URL"
                    variant="outlined"
                    size={"medium"}
                    required
                    onChange={(event => longUrlHandler(event))}
                    fullWidth type="text"/> <br/> <br/>
                <section>
                    <TextField
                        label="Customize back-half"
                        variant="outlined"
                        size={"medium"}
                        helperText={"Ex. " + redirectUrlBegin + "xyz"}
                        required
                        InputProps={{
                            startAdornment: <InputAdornment position="start">{redirectUrlBegin}</InputAdornment>,
                        }}
                        onChange={(event => urlCodeHandler(event))}
                        type="text"/>
                    {<Button onClick={() => copyButtonHandler()} variant="text" color="primary" size="small"
                             disabled={!Boolean(shortUrl)}>Copy</Button>}
                </section>
                <Button type={"submit"} variant="contained" color="primary" size="large" fullWidth disabled={disabled}>
                    {loading ? <CircularProgress size={25} color={"secondary"}/> : "Shorten"}
                </Button>
            </form>
            <h5>By clicking SHORTEN, you are agreeing to Click2Short’s
                <span onClick={() => {
                    history.push('/terms-policy')
                    props.onClose()
                }}> Terms of Service and Privacy Policy*
                </span></h5>

        </div>

    )
}

export default CustomUrl
