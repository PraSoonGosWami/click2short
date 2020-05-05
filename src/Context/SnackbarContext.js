import React, {createContext, useState} from 'react'
import AlertNotification from "../UI/Alert/AlertNotification";

export const SnackBarContext = createContext([])


export function SnackBarProvider({ children }) {
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState([])

    const addAlert = (message,type) => {
        setShowAlert(true)
        setAlert([{message,type}])
    }

    const value = { addAlert }

    return (
        <SnackBarContext.Provider value={value}>
            {children}
            {alert.map(el =>
                <AlertNotification
                    key={el.message}
                    open={showAlert}
                    onClose={() => setShowAlert(false)}
                    type={el.type}>{el.message}
                </AlertNotification>
            )}
        </SnackBarContext.Provider>
    )
}