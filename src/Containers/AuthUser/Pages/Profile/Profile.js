import React, {useContext, useEffect, useState} from 'react'
import Heading from "../../../../UI/Heading/Heading";
import Style from './Profile.module.css'
import {AppContext} from "../../../../Context/AppContext";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import AxiosInstance from '../../../../Services/AxiosInstance/AxiosInstance'
import useAlert from "../../../../Hooks/useAlert/useAlert";
const Profile = (props) => {
    const {user,token,setUser} = useContext(AppContext)
    const {addAlert} = useAlert()
    const [fName, setFName] = useState("")
    const [lName, setLName] = useState("")
    const [phone, setPhone] = useState("")
    const [updated, setUpdated] = useState(false)
    const [loading, setLoading] = useState(false)

    const [phoneError, setPhoneError] = useState("")
    const [fNameError, setFNameError] = useState("")
    const [lNameError, setLNameError] = useState("")

    useEffect(()=>{
        const name = user.name.split(' ')
        setFName(name[0])
        setLName(name[1])
        setPhone(user.phone)
    },[user])

    const fNameTextHandler = (event) => {
        const val = event.target.value
        setUpdated(true)
        setFName(val)
        if (val.length === 0) {
            setFNameError("Please enter first name")
            setUpdated(false)
            return
        }
        setFNameError('')

    }
    const lNameTextHandler = (event) => {
        const val = event.target.value
        setUpdated(true)
        setLName(val)
        if (val.length === 0) {
            setLNameError("Please enter last name")
            setUpdated(false)
            return
        }
        setLNameError('')
    }
    const phoneTextHandler = (event) => {
        const val = event.target.value
        setUpdated(true)
        setPhone(val)
        const regex = /^\d+$/
        if (val.length === 0) {
            setPhoneError("Please enter phone")
            setUpdated(false)
            return
        }
        if (!regex.test(val) || val.length !== 10) {
            setPhoneError("Invalid phone entered!")
            setUpdated(false)
            return
        }
        setPhoneError('')
    }

    const onUpdateHandler = () => {
        if(fNameError.length !==0 || lNameError.length !==0 || phoneError.length !==0){
            addAlert('Invalid input passed!','error')
            setUpdated(false)
            return

        }
        if(updated){
            setLoading(true)
            const url = '/user/update'
            const data = {
                name: fName.toString().trim() + " " + lName.toString().trim(),
                phone: phone.toString().trim(),
            }
            AxiosInstance.patch(url,data,{headers: {'Authorization': 'Bearer ' + token}})
                .then(res => {
                    setUser(res.data.user)
                    addAlert(res.data.message,'success')
                })
                .catch(err=>{
                    if(err.response){
                        addAlert(err.response.data.message,'error')
                    }
                })
                .finally(()=>setLoading(false))
        }
    }

    return(
        <div className={Style.Profile}>
            <Heading>Profile Settings</Heading>
            <header>
                <h4>Custom Url: {user.customURLS.length}</h4>
                <h4>Auto Url: {user.autoURLS.length}</h4>
            </header>
            <main>
                <TextField label="First name" variant="outlined" size={"medium"} required value={fName} helperText={fNameError} error={fNameError.length > 0} type="name" onChange={(event => fNameTextHandler(event))} fullWidth/>
                <TextField label="Last name" variant="outlined" size={"medium"} required value={lName} helperText={lNameError} error={lNameError.length > 0} fullWidth onChange={event => lNameTextHandler(event)} type="name"
                /> <br/>
                <TextField label="Email" variant="outlined" size={"medium"} fullWidth disabled value={user.email} type="email"
                />
                <TextField label="Phone" variant="outlined" size={"medium"} fullWidth required value={phone} helperText={phoneError} error={phoneError.length > 0} onChange={event => phoneTextHandler(event)} type="tel" InputProps={{
                        startAdornment: <InputAdornment position="start">{"+91"}</InputAdornment>,
                    }}/>
                { updated && <Button variant="contained" color="primary" size="large"
                         disabled={!updated} fullWidth onClick={()=>onUpdateHandler()}>
                    {loading ? <CircularProgress size={25} color={"secondary"}/> : "Update"}
                </Button>}
                <h3>Current plan: {user.plan}</h3>
                <Button  variant="contained" color="primary" size="small" onClick={()=>{addAlert('This feature will be available soon!','info')}}>Change password</Button>

            </main>
        </div>
    )
}

export default Profile
