import React from 'react'
import Style from './UrlList.module.css'
import Divider from "@material-ui/core/Divider";
import BarIcon from "@material-ui/icons/BarChart"
import {getDate} from "../../../../Services/FormatDate/FormatDate";
import {NavLink} from "react-router-dom";

const UrlList = (props) => {


    const data = props.data
    const title = data.title
    const timeStamp = data.timestamp
    const clicks = data.clicked.length
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL + data.urlCode
    const date = getDate(timeStamp)


    return(
        <NavLink to={'/dashboard/'+data._id} className={Style.UrlList} onClick={props.onClick} activeClassName={Style.active} >
            <h5>{date}</h5>
            <h4>{title}</h4>
            <section>
                <h4 href={redirectUrl} target={"_blank"} rel="noopener noreferrer">{redirectUrl}</h4>
                <h5>{clicks} <BarIcon/> </h5>
            </section>
            <Divider/>
        </NavLink>
    )
}

export default UrlList
