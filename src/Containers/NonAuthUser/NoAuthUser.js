import React, {useState} from 'react'
import Navigation from "./Components/Navigation/Navigation";
import MainComponent from "./Components/MainComponent/MainComponent";
import Login from "./Components/Auth/Login/Login";

const NoAuthUser = (props) => {

    const [login,setLogin] = useState(false)
    const [signup, setSignup] = useState(false)

    const loginDialog = () => {
        setLogin(true)
    }

    const signupHandler =() => {
        setSignup(true)
    }

    return(
        <div>
            <Navigation login={()=>loginDialog()} signup={()=>signupHandler()}/>
            <MainComponent login={()=>loginDialog()}/>
            <Login open={login} onClose={()=>setLogin(false)}/>
        </div>
    )
}

export default NoAuthUser
