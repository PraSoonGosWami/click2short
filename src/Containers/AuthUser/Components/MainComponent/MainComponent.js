import React,{Suspense} from 'react'
import Spinner from "../../../../UI/Spinner/Spinner";
import {Route, Switch} from "react-router";
import Dashboard from "../../Pages/Dashboard/Dashboard";

const MainComponent = (props) => {
    return (
        <div style={{padding:"8px"}}>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route path={'/dashboard'}  component={Dashboard}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default React.memo(MainComponent,(prevState, nextState) => prevState !== nextState)
