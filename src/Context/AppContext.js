import React, {createContext, useState} from 'react'

export const AppContext = createContext({})

export const AppProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    return (
        <AppContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
                user:user,
                setUser:setUser,
            }}>
            {props.children}
        </AppContext.Provider>
    )
}


