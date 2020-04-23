import React from 'react'
import BG_LARGE from '../../Assets/bg_large.jpg'
import Style from './HomePage.module.css'
import { Parallax } from 'react-parallax';
import Button from "@material-ui/core/Button";


const HomePage = (props) => {
    return (
        <div className={Style.HomePage}>
            <Parallax blur={{ min: -15, max: 15 }} bgImage={BG_LARGE} bgImageAlt="BG IMG" strength={500}>
                <div className={Style.HomePageDiv}>
                    <h1>Create short links with a single click</h1>
                    <h2>Convert long boring URLs into short easily manageable links with click counter.</h2>
                    <Button variant="contained" color="primary" size={"large"}>Get started for free</Button>
                </div>
            </Parallax>

            <section>
                <div>

                </div>
            </section>

        </div>
    )
}

export default HomePage
