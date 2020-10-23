import React,{Suspense} from 'react'
import Spinner from "../../../../UI/Spinner/Spinner";
import {Route, Switch} from "react-router";
import Dashboard from "../../Pages/Dashboard/Dashboard";

const TermsPolicies = React.lazy(()=>import('../../../../UI/TermsPolicies/TermsPolicies'))
const Profile = React.lazy(()=> import('../../Pages/Profile/Profile'))

const MainComponent = (props) => {
    return (
        <div style={{padding:"8px"}}>
            <Suspense fallback={<Spinner/>}>
                <Switch>
                    <Route path={'/terms-policy'} exact component={TermsPolicies}/>
                    <Route path={'/my-profile'} exact component={Profile}/>
                    <Route path={'/dashboard'}  component={()=><Dashboard createUrl={props.createUrl}/>}/>
                </Switch>
            </Suspense>
        </div>
    )
}

export default React.memo(MainComponent,(prevState, nextState) => prevState !== nextState)
