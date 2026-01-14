import { useState, type ReactNode } from "react";
import type{ IProduct } from "../../api/products";
import type { IUser, LoginResultType } from "../../api/user";
import { UserContext, type CartType } from "./UserContext";

export const UserContextProvider = ({children}:{children:ReactNode})=>{
    const [cart, setCart] = useState<CartType[]>([])
    const [logginUser, setLogginUser] = useState<IUser| null>(null)
    const [activeCartId, setActiveCartId] = useState<string|null>(null)

    return (
        <UserContext.Provider value={{logginUser, setLogginUser, cart, setCart, activeCartId, setActiveCartId}}>
            {children}
        </UserContext.Provider>
    )
}