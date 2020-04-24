import React, {useContext, useState} from 'react';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import  muiTheme from './UI/MaterialTheme/mui.json'
import {AppContext} from "./Context/AppContext";
import Navigation from "./Containers/NonAuthUser/Components/Navigation/Navigation";
import MainComponent from "./Containers/NonAuthUser/Components/MainComponent/MainComponent";
import NoAuthUser from "./Containers/NonAuthUser/NoAuthUser";

const theme = createMuiTheme(muiTheme)

function App() {
    const contextValue = useContext(AppContext)
    const [isLoggedIn] = useState(contextValue.isLoggedIn)

    return (
        <ThemeProvider theme={theme}>
            { isLoggedIn ?<div><h2>Auth user</h2></div>
                :<NoAuthUser/>}
        </ThemeProvider>

    );
}

export default App;
