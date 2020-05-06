import React, {useContext, useEffect, useState} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import  muiTheme from './UI/MaterialTheme/mui.json'
import {AppContext} from "./Context/AppContext";
import NoAuthUser from "./Containers/NonAuthUser/NoAuthUser";
import Spinner from "./UI/Spinner/Spinner";
import AuthUser from "./Containers/AuthUser/AuthUser";

const theme = createMuiTheme(muiTheme)

function App() {
    const contextValue = useContext(AppContext)
    const [isLoggedIn,setIsLoggedIn] = useState(null)

    useEffect( ()=>{
        const userData =  localStorage.getItem("user")
        if(!userData){
            contextValue.setIsLoggedIn(false)
            contextValue.setUser(null)
        }else {
            contextValue.setIsLoggedIn(true)
            contextValue.setUser(JSON.parse(userData))
        }
        setIsLoggedIn(contextValue.isLoggedIn)

    },[contextValue.isLoggedIn])


    return (
        <ThemeProvider theme={theme}>
            {isLoggedIn === null && <Spinner/>}
            { isLoggedIn !== null && isLoggedIn ? <AuthUser/> :<NoAuthUser/>}
        </ThemeProvider>

    );
}

export default App;
