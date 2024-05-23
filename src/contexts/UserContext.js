const { createContext, useState, useContext, useEffect } = require("react");
import UsePersistState from "@/hooks/UsePersistState";

const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [user, setUser] = UsePersistState(null)

   

    return(
        <UserContext.Provider value={{user, setUser}}>
         {children}   
        </UserContext.Provider>
    )
}

export const useUserContext = () => {
    const context = useContext(UserContext)
    if(!context){
        throw new Error('useUser must be used within a UserProvider')
    }

    return context
}