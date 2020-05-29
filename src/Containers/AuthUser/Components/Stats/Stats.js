import React, {useEffect, useState} from 'react'
import {getDate} from "../../../../Services/FormatDate/FormatDate";
import ClicksStats from "./ClicksStats/ClicksStats";
import DeviceStats from "./DeviceStats/DeviceStats";

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
        <div>
            {clicksData && <ClicksStats clicksData={clicksData}/>}
            {deviceData && <DeviceStats deviceData={deviceData}/>}
        </div>
    )
}

export default Stats
