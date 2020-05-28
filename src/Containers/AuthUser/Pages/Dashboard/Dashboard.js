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
import UrlDetails from "../../Components/UrlDetails/UrlDetails";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {Route, Switch, useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import RefreshIcon from '@material-ui/icons/Refresh'

const Dashboard = (props) => {

    const contextValue = useContext(AppContext)
    const [urls, setUrls] = useState(null)
    const [noData, setNoData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [passedData, setPassedData] = useState(null)
    const [show, setShow] = useState({})

    const isPhone = useMediaQuery('(max-width:700px)')

    useEffect(() => {
        getData()
    }, [contextValue.token])

    const history = useHistory()
    const getData = () => {
        setIsLoading(true)
        AxiosInstance.get('url/get', {headers: {'Authorization': 'Bearer ' + contextValue.token}})
            .then(res => {
                if (!res.data || res.data.length === 0){
                    setNoData(true)
                    setPassedData(null)
                    setUrls(null)
                }
                else{
                    setUrls(res.data)
                    setPassedData(res.data[0])
                    history.replace('/dashboard/'+res.data[0]._id)
                    setNoData(false)
                }
            })
            .catch(err => {
                setNoData(false)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const listClickHandler = (index,id,event) => {
        event.preventDefault()
        history.replace('/dashboard/'+id)
        setPassedData(urls[index])
        if(isPhone)
            setShow({transform:"translateX(0)"})
        else
            setShow({})
    }

    return (
        <div className={Style.Dashboard}>
            <Heading>Dashboard</Heading>
            <Button variant="text" color="primary" size="small" startIcon={<RefreshIcon/>} onClick={()=>getData()}>
                Refresh
            </Button>
            {noData && <ErrorMessage onClick={props.createUrl}
                text={"It's lonely here! Create your own short urls and watch it grow!!"} src={logo}
                action={"Create URL"}/>
            }
            {isLoading && <Spinner/>}
            {!isLoading && urls && <div className={Style.DataView}>
                <aside>

                    <header>
                        <h5>{urls.length} Links</h5>
                        <h5>Total clicks</h5>
                    </header>
                    <Divider/>
                    <div>
                        {urls.map((obj, index) => {
                            return <UrlList key={obj._id} data={obj} onClick={(event) => listClickHandler(index,obj._id,event)} />
                        })}
                    </div>
                </aside>
                {passedData && <main style={show}>
                    <Switch>
                        <Route path={'/dashboard/:id'} component={
                            ()=><UrlDetails refreshData={()=>getData()} data={passedData} onClick={()=>{setShow({transform:"translateX(100%)"})}}/>
                        }/>
                    </Switch>

                </main>}
            </div>}
           {/* {urls && <AppFooter/>}*/}
        </div>
    )
}

export default Dashboard
