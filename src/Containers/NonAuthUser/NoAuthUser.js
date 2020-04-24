import React, {useState} from 'react'
import Navigation from "./Components/Navigation/Navigation";
import MainComponent from "./Components/MainComponent/MainComponent";

const NoAuthUser = (props) => {
    const [show,setShow] = useState(false)
    const loginHandler = () => {
        setShow(prevState => !prevState)
    }
    return(
        <div>
            <Navigation loginHandler={()=>loginHandler()}/>
            <MainComponent/>
        </div>
    )
}

export default NoAuthUser
