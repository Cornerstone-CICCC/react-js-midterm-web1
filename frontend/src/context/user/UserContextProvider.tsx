import { use, useEffect, useState, type ReactNode } from "react";
import type{ IProduct } from "../../api/products";
import type { IUser, LoginResultType } from "../../api/user";
import { UserContext, type CartType } from "./UserContext";

export const UserContextProvider = ({children}:{children:ReactNode})=>{
    const [cart, setCart] = useState<CartType[]>(()=>{
        const stored = sessionStorage.getItem("cart")
        return stored ? JSON.parse(stored):[]
    })
    const [logginUser, setLogginUser] = useState<IUser| null>(()=>{
        const stored = sessionStorage.getItem("loggedInUser")
        return stored? JSON.parse(stored): null
    })
    const [activeCartId, setActiveCartId] = useState<string|null>(()=>{
        const stored = sessionStorage.getItem("activeCartId")
        return stored? JSON.parse(stored):null
    })

    useEffect(()=>{
        sessionStorage.setItem("cart",JSON.stringify(cart))
    },[cart])
    useEffect(()=>{
        if (logginUser) {
        sessionStorage.setItem("loggedInUser", JSON.stringify(logginUser));
        } else {
        sessionStorage.removeItem("loggedInUser");
        }
    },[logginUser])

    useEffect(()=>{
        if (activeCartId) {
        sessionStorage.setItem("activeCartId", JSON.stringify(activeCartId));
        } else {
        sessionStorage.removeItem("activeCartId");
        }
    
    },[activeCartId])

    return (
        <UserContext.Provider value={{logginUser, setLogginUser, cart, setCart, activeCartId, setActiveCartId}}>
            {children}
        </UserContext.Provider>
    )
}