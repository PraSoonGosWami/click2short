import React, {useContext, useEffect} from 'react'
import {getDateAndTime} from "../../../../Services/FormatDate/FormatDate";
import CloseIcon from '@material-ui/icons/Cancel'
import Style from './UrlDetails.module.css'
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import BarIcon from "@material-ui/icons/BarChart"
import useAlert from "../../../../Hooks/useAlert/useAlert";
import {AppContext} from "../../../../Context/AppContext";
import AxiosInstance from '../../../../Services/AxiosInstance/AxiosInstance'
import Stats from "../Stats/Stats";

const UrlDetails = (props) => {
    const data = props.data
    const redirectUrl = process.env.REACT_APP_REDIRECT_URL + data.urlCode
    const {addAlert} = useAlert()
    const contextVal = useContext(AppContext)
    const date = getDateAndTime(data.timestamp)

    useEffect(()=>{
        window.scrollTo(0,0)
    })

    const copyButtonHandler = () => {
        navigator.clipboard.writeText(redirectUrl)
        addAlert("Short link copied to clipboard",'success')
    }
    const deleteButtonHandler =() => {
        const url = '/url/delete'
        AxiosInstance.delete(url,{headers: {'Authorization': 'Bearer ' + contextVal.token}, data:{urlId: data._id}})
            .then(res => {
                if(res.data){
                    props.refreshData()
                    addAlert(res.data.message,'success')
                }
            })
            .catch(err => {
                if(err.response){
                    addAlert(err.response.data.message,'error')
                }
            })

    }
    return(
        <div className={Style.UrlDetails}>
            <p>CREATED ON {date}</p>
            <div className={Style.Cancel} onClick={props.onClick} ><CloseIcon color={"primary"} fontSize={"large"}/></div>
            <h3>{data.title}</h3>
            <a href={data.longURL} target={"_blank"} rel="noopener noreferrer">{data.longURL}</a>
            <section>
                <a href={"http://" +redirectUrl} target={"_blank"} rel="noopener noreferrer">{redirectUrl}</a>
                <article>
                    <Button variant={"contained"} size={"small"} color={"primary"} onClick={()=>copyButtonHandler()}>Copy</Button>
                    <Button variant={"outlined"} size={"small"} color={"primary"} onClick={()=>deleteButtonHandler()}>Delete</Button>
                </article>
            </section>
            <Divider/>
            <div className={Style.UrlClickGraph}>
                <h3>{data.clicked.length}<BarIcon /></h3>
                <p>Total Clicks</p>
                {data.clicked.length > 0 && <Stats graphData={data.clicked}/>}
            </div>
        </div>
    )
}

export default UrlDetails
