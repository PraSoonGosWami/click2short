import React, {useEffect, useState} from 'react'
import {Bar} from 'react-chartjs-2';


const ClicksStats = (props) => {
    const [data, setData] = useState(null)
    useEffect(() => {
        const clicksData = props.clicksData
        const labels = []
        const values = []
        Object.keys(clicksData).map(key => {
            labels.push(key)
            values.push(clicksData[key])
        })

        const graphSet = {
            labels: labels,
            datasets: [
                {
                    label: 'Clicks',
                    backgroundColor: 'rgba(33, 150, 243, 0.6)',
                    borderColor: 'rgba(25, 118, 210, 1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(33, 150, 243, 0.8)',
                    hoverBorderColor: 'rgba(25, 118, 210, 1)',
                    data: values
                }
            ]
        }

        setData(graphSet)


    }, [])
    return (
        <div style={{marginTop:"12px",marginBottom:"20px"}}>
            {data &&
            <Bar
                data={data}

            />
            }
        </div>
    )
}

export default ClicksStats
