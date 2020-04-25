import React from 'react'
import Style from './AppFooter.module.css'
import logo from '../../Assets/logo.png'
import me from '../../Assets/me.jpg'
const AppFooter = (props) => {
    return(
        <div className={Style.AppFooter}>
            <aside>
                <img src={logo} alt={"Click2Short"}/>
                <p>© 2020 Click2Short , INDIA</p>
            </aside>
            <main>
                <h2>About the creator</h2>
                <p>This website is created and maintained by</p>
                <section className={Style.Author}>
                    <img src={me} alt={"Prasoon Goswami"}/>
                    <h3><a href="https:prasoon.me"
                           target="_blank"
                           aria-labelledby="Visit Prasoon's website"
                           rel="noopener noreferrer">Prasoon Goswami &#x2750;</a></h3>
                </section>
            </main>
        </div>
    )
}

export default AppFooter
