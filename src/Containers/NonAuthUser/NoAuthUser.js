import React, {useEffect, useState} from 'react'
import Navigation from "./Components/Navigation/Navigation";
import MainComponent from "./Components/MainComponent/MainComponent";
import Auth from "./Components/Auth/Auth";

const NoAuthUser = (props) => {

    const [auth,setAuth] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    const authDialog = (tabValue) => {
        setActiveTab(tabValue)
        setAuth(true)
    }


    return(
        <div>
            <Navigation login={()=>authDialog(0)} signup={()=>authDialog(1)}/>
            <MainComponent login={()=>authDialog(0)} signup={()=>authDialog(1)}/>
            <Auth open={auth} onClose={()=>setAuth(false)} activeTab={activeTab}/>
        </div>
    )
}

export default NoAuthUser
