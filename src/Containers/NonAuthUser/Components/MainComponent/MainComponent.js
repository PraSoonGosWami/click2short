import React,{Suspense} from 'react'
import {Route, Switch} from "react-router";
import Style from './MainComponent.module.css'

const HomePage = React.lazy(()=> import('../../Pages/HomePage/HomePage'))

const MainComponent = (props) => {
    return(
        <div className={Style.MainComponent}>
            <Suspense fallback={<h2>Loading...</h2>} >
                <Switch>
                    <Route path={'/'} exact component={()=><HomePage login={props.login}/>}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default React.memo(MainComponent,(prevState, nextState) => prevState !== nextState)
