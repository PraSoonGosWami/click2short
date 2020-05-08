import React, {useContext, useEffect, useState} from 'react'
import Style from './Dashboard.module.css'
import {AppContext} from "../../../../Context/AppContext";
import logo from '../../../../Assets/logo_only.png'
import Heading from "../../../../UI/Heading/Heading";
import ErrorMessage from "../../../../UI/ErrorMessage/ErrorMessage";
import AxiosInstance from "../../../../Services/AxiosInstance/AxiosInstance";
import Spinner from "../../../../UI/Spinner/Spinner";
import UrlList from "../../Components/UrlList/UrlList";
import Divider from "@material-ui/core/Divider";
import AppFooter from "../../../../UI/AppFooter/AppFooter";

const Dashboard = (props) => {

    const contextValue = useContext(AppContext)
    const [urls, setUrls] = useState(null)
    const [noData, setNoData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        AxiosInstance.get('url/get',{headers:{'Authorization': 'Bearer '+ contextValue.token}})
            .then(res=>{
                setUrls(res.data)
                if(!res.data)
                    setNoData(true)

            })
            .catch(err=>{
                console.log(err)
                setNoData(false)
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }, [contextValue.token])

    return (
        <div className={Style.Dashboard}>
            <Heading>Dashboard</Heading>
            {noData &&
            <ErrorMessage
                text={"It's lonely here! Create your own short urls and watch it grow!!"} src={logo}
                action={"Create URL"}/>
            }
            {isLoading && <Spinner/>}
            {urls && <header>
                <h5>{urls.length} Links</h5>
                <h5>Total clicks</h5>
            </header>}
            {urls && <aside><Divider/></aside>}
            {urls && <div className={Style.List}>
                {urls.map(obj => {
                    return <UrlList key={obj._id} data={obj}/>
                })}
            </div>}
            {urls && <AppFooter/>}
        </div>
    )
}

export default Dashboard
