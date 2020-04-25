import React from 'react'
import Card from '@material-ui/core/Card';
import Style from './CardLayout.module.css'

const CardLayout = (props) => {
    return(
        <Card className={Style.CardLayout}>
            <div className={Style.CardContent}>
                <img src={props.src} alt={props.alt}/>
                <section>
                    <h2>{props.heading}</h2>
                    <p>{props.content}</p>
                </section>
            </div>
        </Card>
    )
}

export default CardLayout
