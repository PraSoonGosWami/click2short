import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import {AppProvider} from "./Context/AppContext";
import {SnackBarProvider} from "./Context/SnackbarContext";


ReactDOM.render(
    <AppProvider>
        <SnackBarProvider>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </SnackBarProvider>
    </AppProvider>,
    document.getElementById('root')
);


serviceWorker.register();
