import React, {createContext, useState} from 'react'

export const AppContext = createContext({})

export const AppProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState(null)


    return (
        <AppContext.Provider
            value={{
                isLoggedIn: isLoggedIn,
                setIsLoggedIn: setIsLoggedIn,
                user:user,
                setUser:setUser,
                token:token,
                setToken:setToken
            }}>
            {props.children}
        </AppContext.Provider>
    )
}


