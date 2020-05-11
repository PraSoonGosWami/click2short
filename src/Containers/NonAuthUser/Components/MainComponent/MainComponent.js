import React,{Suspense} from 'react'
import {Redirect, Route, Switch} from "react-router";
import Style from './MainComponent.module.css'
import Spinner from "../../../../UI/Spinner/Spinner";

const HomePage = React.lazy(()=> import('../../Pages/HomePage/HomePage'))

const MainComponent = (props) => {
    return(
        <div className={Style.MainComponent}>
            <Suspense fallback={<Spinner/>} >
                <Switch>
                    <Route path={'/'} exact component={()=><HomePage login={props.login} signup={props.signup}/>}/>
                    <Redirect to={'/'}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default React.memo(MainComponent,(prevState, nextState) => prevState !== nextState)
