import React from 'react';
import Button from '@material-ui/core/Button';
import {createMuiTheme} from '@material-ui/core/styles';
import {ThemeProvider} from '@material-ui/styles';
import muiTheme from './components/UI/MaterialTheme/mui.json'
import Navigation from "./components/Navigation/Navigation";
import MainComponent from "./components/MainComponent/MainComponent";
import {Router} from "react-router";

const theme = createMuiTheme(muiTheme)

function App() {
    return (
        <ThemeProvider theme={theme}>
            <div>
                <Navigation/>
                <MainComponent/>
            </div>
        </ThemeProvider>

    );
}

export default App;
