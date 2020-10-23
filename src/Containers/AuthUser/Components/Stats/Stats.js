import React, {useEffect, useState} from 'react'
import {getDate} from "../../../../Services/FormatDate/FormatDate";
import ClicksStats from "./ClicksStats/ClicksStats";
import DeviceStats from "./DeviceStats/DeviceStats";
import {Container} from "@material-ui/core";

const Stats = (props) => {
    const graphData = props.graphData
    const [clicksData, setClicksData] = useState(null)
    const [deviceData, setDeviceData] = useState(null)
    useEffect(()=>{
        const clicks = {}
        const device = {}
        graphData.map(item => {
            const key = getDate(item.date)
            if(clicks[key]){
                clicks[key] += 1
            }else{
                clicks[key] = 1
            }
            if(device[item.type]){
                device[item.type] += 1
            }else{
                device[item.type] = 1
            }
        })
        setClicksData(clicks)
        setDeviceData(device)
    },[graphData])
    return(
        <Container maxWidth={"md"} style={{padding:"0 12px"}}>
            {clicksData && <ClicksStats clicksData={clicksData}/>}
            {deviceData && <DeviceStats deviceData={deviceData}/>}
        </Container>
    )
}

export default Stats
