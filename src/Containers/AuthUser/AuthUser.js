import React, {useContext, useEffect} from 'react'
import {AppContext} from "../../Context/AppContext";
import useAlert from "../../Hooks/useAlert/useAlert";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavMenu from "./Navigation/NavMenu/NavMenu";
import MainComponent from "./Components/MainComponent/MainComponent";
import {useHistory} from "react-router";

const AuthUser = (props) => {
    const contextValue = useContext(AppContext)
    const {addAlert} = useAlert()
    const history = useHistory()

    useEffect(()=>{
        if(contextValue.isLoggedIn)
            history.replace('/dashboard')
        else{
            logoutHandler()
        }
    },[contextValue.isLoggedIn])

    const logoutHandler = () => {
        contextValue.setIsLoggedIn(false)
        contextValue.setUser(null)
        localStorage.clear()
        history.goBack()
        addAlert("Logged out successfully!","info")
    }

    return(
        <div>
            <NavMenu logoutHandler={()=>logoutHandler()}/>
            <MainComponent/>
            <Fab color="primary" variant={"extended"} style={{position:"fixed",bottom:'26px',right:'16px'}}>
                <AddIcon fontSize={"large"}/>Create
            </Fab>
        </div>
    )
}

export default AuthUser
