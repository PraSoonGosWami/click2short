import React from 'react'
import Style from './UrlList.module.css'
import Divider from "@material-ui/core/Divider";
import BarIcon from "@material-ui/icons/BarChart"
const UrlList = (props) => {
    const data = props.data
    const title = data.title
    const timeStamp = data.timestamp
    const clicks = data.clicked.length
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL + data.urlCode
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    const d = new Date(timeStamp)
    const date = d.getDay()+' '+months[d.getMonth()]+', '+d.getFullYear()
    return(
        <div className={Style.UrlList}>
            <h5>{date}</h5>
            <h4>{title}</h4>
            <section>
                <a href={redirectUrl} target={"_blank"} rel="noopener noreferrer">{redirectUrl}</a>
                <h5>{clicks} <BarIcon/> </h5>
            </section>
            <Divider/>
        </div>
    )
}

export default UrlList
