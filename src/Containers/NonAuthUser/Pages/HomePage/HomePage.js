import React, {useState} from 'react'
import BG_LARGE from '../../../../Assets/bg_large.jpg'
import CARD_ONE_IMG from '../../../../Assets/card_one.jpg'
import CARD_TWO_IMG from '../../../../Assets/card_two.jpg'
import CARD_THREE_IMG from '../../../../Assets/card_three.jpg'
import CARD_FOUR_IMG from '../../../../Assets/card_four.jpg'
import Style from './HomePage.module.css'
import {Parallax} from 'react-parallax';
import Button from "@material-ui/core/Button";
import AxiosInstance from '../../../../Services/AxiosInstance/AxiosInstance'

import CardLayout from "../../../../UI/Card/CardLayout";
import AppFooter from "../../../../UI/AppFooter/AppFooter";

import useAlert from "../../../../Hooks/useAlert/useAlert";
import {useHistory} from "react-router";

const HomePage = (props) => {

    const [longURL, setLongURL] = useState("")
    const [conv, setConv] = useState(false)

    const history = useHistory()
    const { addAlert } = useAlert()

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
            addAlert('Copied to clipboard !','success')
            return

        }
        if (!longURL) {
            addAlert('Pleas enter an url','error')
            return
        }
        if (longURL.length < 5) {
            addAlert('Please enter a valid url too short','error')
            return
        }

        const url = 'url/create/no-auth'
        const data = {longURL: longURL.trim()}
        AxiosInstance.post(url, data)
            .then(res => {
                setLongURL(process.env.REACT_APP_REDIRECT_URL + res.data)
                setConv(true)
            })
            .catch(err => {
                setConv(false)
                addAlert(err.response.data.message,'error')
            })


    }

    return (
        <div className={Style.HomePage}>
            <Parallax blur={{min: -15, max: 15}} bgImage={BG_LARGE} bgImageAlt="BG IMG" strength={500}>
                <div className={Style.HomePageDiv}>
                    <h1>Create short links with a single click</h1>
                    <h2>Convert long boring URLs into short easily manageable links with click counter.</h2>
                    <Button variant="contained" color="primary" size={"large"} onClick={props.login}>Get started for
                        free</Button>
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
                        onBlur={(event) => blurHandler(event)}/>
                    <Button
                        variant="contained"
                        color="primary"
                        size={"large"}
                        type={"submit"}
                    >{conv ? "Copy Link" : "Shorten"}</Button>
                </form>
                <p>By clicking SHORTEN, you are agreeing to Click2Short’s <span style={{textDecoration:"underline"}} onClick={()=>history.push('/terms-policy')}>Terms of Service and Privacy Policy</span></p>

            </section>
            <main>
                <h1>Create your account now!</h1>
                <p>Scroll to see benefits</p>
                <p style={{fontWeight: "bold", fontSize: "20px", color: "black"}}>&#8595;</p>
                <div className={Style.HomePageBenefits}>
                    <CardLayout
                        src={CARD_ONE_IMG}
                        alt="BG"
                        heading="Create custom URLs"
                        content="Customise your short links with your own keyword which is easy to remember and shorter. Your link never expires enjoy 24x7 hassle-free service "

                    />
                    <CardLayout
                        src={CARD_TWO_IMG}
                        alt="BG"
                        heading="Track clicks on you link"
                        content="Create your short links and track total number of clicks, creation date and much more. Our smart tracking feature helps you grow and maintain your resources"

                    />
                    <CardLayout
                        src={CARD_THREE_IMG}
                        alt="BG"
                        heading="Know your users"
                        content="Our smart device tracking feature gives you insight of your user base and type of devices being used, so that you can grow and track your hits on different devices"

                    />

                    <CardLayout
                        src={CARD_FOUR_IMG}
                        alt="BG"
                        heading="Single tap to copy"
                        content="Copy your short links and share it to your friends, emails, social networks and many more just with a single click. We keep your data safe and 24x7 available across the globe"

                    />
                </div>
                <Button variant="contained" color="primary" size={"large"} onClick={props.signup}>Create an account
                    now</Button>

            </main>
            <AppFooter/>
        </div>
    )
}

export default HomePage
