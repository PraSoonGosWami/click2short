import React, {useContext, useEffect, useState} from 'react'
import {AppContext} from "../../Context/AppContext";
import useAlert from "../../Hooks/useAlert/useAlert";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavMenu from "./Components/Navigation/NavMenu/NavMenu";
import MainComponent from "./Components/MainComponent/MainComponent";
import {useHistory} from "react-router";
import UpdateUser from "../../Services/UpdateUser/UpdateUser";
import CreateUrl from "./Components/CreateUrl/CreateUrl";

const AuthUser = (props) => {
    const contextValue = useContext(AppContext)
    const {addAlert} = useAlert()
    const history = useHistory()

    const [openModal,setOpenModal] = useState(false)


    //gets current user data only once the dashboard loads
    useEffect(()=>{
        UpdateUser(contextValue)

    },[])
    useEffect(()=>{
        if(contextValue.isLoggedIn) {

            if(contextValue.user && contextValue.user.customURLS.length >=1 || contextValue.user.autoURLS.length >=1) {
                history.replace('/dashboard/0')
                document.title = "Click2Short | "+contextValue.user.name
            }else{
                history.replace('/dashboard')
            }
        }
        else{
            logoutHandler()
        }
    },[contextValue.isLoggedIn])

    const modalHandler = () => {
        setOpenModal(true)
    }

    const logoutHandler = () => {
        contextValue.setIsLoggedIn(false)
        contextValue.setUser(null)
        contextValue.setToken(null)
        localStorage.clear()
        history.replace('/')
        addAlert("Logged out successfully!","info")
    }

    return(
        <div>
            <NavMenu logoutHandler={()=>logoutHandler()}/>
            <MainComponent/>
            <Fab color="primary" variant={"extended"} style={{position:"fixed",bottom:'26px',right:'16px'}} onClick={()=>modalHandler()}>
                <AddIcon fontSize={"small"}/>Create
            </Fab>
            <CreateUrl open={openModal} onClose={()=> setOpenModal(false)}/>
        </div>
    )
}

export default AuthUser
