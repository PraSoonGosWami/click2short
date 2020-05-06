import React, {useEffect} from 'react'
import DialogModal from "../../../../UI/DialogModal/DialogModal";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Style from './Auth.module.css'
import Login from "./Login/Login";
import Logo from '../../../../Assets/logo_white.png'
import Signup from "./Signup/Signup";


const Auth = (props) => {
    const [value, setValue] = React.useState(2)
    const activeTab = props.activeTab

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        setValue(activeTab)
    }, [activeTab])

    return (
        <DialogModal open={props.open} onClose={props.onClose}>
            <div className={Style.AuthHead}>
                <img src={Logo} alt={"App logo"}/>
            </div>
            <button className={Style.ModalCloseButton} onClick={props.onClose}>&#10006;</button>
            <div className={Style.AuthTabs}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    variant={"fullWidth"}>
                    <Tab label="Log in"/>
                    <Tab label="Sign up"/>
                </Tabs>
            </div>
            <main className={Style.Auth}>
                {value === 0 ? <Login/> : <Signup/>}
            </main>

        </DialogModal>
    )
}

export default Auth
