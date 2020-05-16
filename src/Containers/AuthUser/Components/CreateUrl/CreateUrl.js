import React from 'react'
import Style from "../../../NonAuthUser/Components/Auth/Auth.module.css";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import DialogModal from "../../../../UI/DialogModal/DialogModal";
import AutoUrl from "./AutoUrl/AutoUrl";
import CustomUrl from "./CustomUrl/CustomUrl";

const CreateUrl = (props) => {
    const [value, setValue] = React.useState(0)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return(
        <DialogModal open={props.open} onClose={props.onClose}>
            <div className={Style.AuthHead}>
                <h4 style={{color:"white",marginTop:"6px",letterSpacing: "2px"}}>Create Short Url</h4>
            </div>
            <button className={Style.ModalCloseButton} onClick={props.onClose}>&#10006;</button>
            <div className={Style.AuthTabs}>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    variant={"fullWidth"}>
                    <Tab label="Auto URL" style={{fontWeight:"bold"}}/>
                    <Tab label="Customized URL" style={{fontWeight:"bold"}}/>
                </Tabs>
            </div>
            <main className={Style.Auth}>
                {value === 0 ? <AutoUrl onClose={props.onClose}/> : <CustomUrl onClose={props.onClose}/>}
            </main>

        </DialogModal>
    )
}

export default CreateUrl
