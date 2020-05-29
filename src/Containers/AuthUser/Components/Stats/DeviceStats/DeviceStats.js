import React, {useEffect, useState} from 'react'
import {Doughnut} from 'react-chartjs-2'

const DeviceStats = (props) => {
    const [data, setData] = useState(null)
    useEffect(()=>{
        const deviceData = props.deviceData
        const labels = []
        const values = []
        Object.keys(deviceData).map(key => {
            labels.push(key.toUpperCase())
            values.push(deviceData[key])
        })

        const graphSet = {
            labels: labels,
            datasets: [
                {
                    label: 'Devices',
                    data: values,
                    backgroundColor: [
                        'rgba(255,206,86,0.8)',
                        'rgba(54,162,235,0.9)',
                        'rgba(245,23,74,0.9)',
                        'rgba(7,154,41,0.9)',
                    ],
                    hoverBackgroundColor: [
                        'rgba(255,206,86,1)',
                        'rgba(54,162,235,1)',
                        'rgba(245,23,74,1)',
                        'rgba(7,154,41,1)',

                    ]
                }
            ]
        }

        setData(graphSet)
    },[])
    return(
        <div style={{marginTop:"80px"}}>
            <h4>Clicks from devices</h4>
            {data && <Doughnut data={data}/>}
        </div>
    )
}

export default DeviceStats
