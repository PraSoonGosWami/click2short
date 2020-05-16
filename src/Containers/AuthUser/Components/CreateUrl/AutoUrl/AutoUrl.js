import React, {useContext, useState} from 'react'
import TextField from "@material-ui/core/TextField";
import Style from './AutoUrl.module.css'
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import AxiosInstance from '../../../../../Services/AxiosInstance/AxiosInstance'
import {AppContext} from "../../../../../Context/AppContext";
import useAlert from "../../../../../Hooks/useAlert/useAlert";
import {useHistory} from "react-router";

const AutoUrl = (props) => {
    const [loading, setLoading] = useState(false)
    const [shortUrl, setShortUrl] = useState(null)
    const [longUrl, setLongUrl] = useState(null)
    const [disabled, setDisable] = useState(true)

    const history = useHistory()
    const {token} = useContext(AppContext)

    const {addAlert} = useAlert()

    const textHandler = event => {
        const value = event.target.value
        if (value === null || value.toString().trim().length === 0){
            setDisable(true)
            setShortUrl(null)
        }
        else {
            setLongUrl(value.toString().trim())
            setDisable(false)
        }
    }

    const formEventHandler = (event) => {
        event.preventDefault()
        setLoading(true)
        const url = 'url/create/auto'
        const data = {longURL: longUrl}
        AxiosInstance.post(url, data, {headers: {'Authorization': 'Bearer ' + token}})
            .then(res => {
                setShortUrl(process.env.REACT_APP_REDIRECT_URL +res.data.urlCode)
            })
            .catch(err => {
                if (err.response)
                    addAlert(err.response.data.message, 'error')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <div className={Style.AutoUrl}>
            <h4>Shorten you long URL and get real-time analytics and track total clicks</h4>
            <form onSubmit={event => formEventHandler(event)}>
                <TextField
                    label="Paste long URL"
                    variant="outlined"
                    size={"medium"}
                    required
                    onChange={(event => textHandler(event))}
                    fullWidth type="Paste long URL"/> <br/>
                {shortUrl && <a href={"http://" + shortUrl} target={"_blank"} rel="noopener noreferrer">{shortUrl}</a>}
                <Button type={"submit"} variant="contained" color="primary" size="large" fullWidth disabled={disabled}>
                    {loading ? <CircularProgress size={25} color={"secondary"}/> : "Shorten"}
                </Button>
            </form>

            <h5>By clicking SHORTEN, you are agreeing to Click2Short’s <span onClick={()=> {
                history.push('/terms-policy')
                props.onClose()
            }}>Terms of Service and Privacy Policy*</span></h5>
        </div>

    )
}

export default AutoUrl
