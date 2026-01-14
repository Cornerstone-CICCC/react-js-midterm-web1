import { useState, type ReactNode } from "react";
import type{ IProduct } from "../../api/products";
import type { LoginResultType } from "../../api/user";
import { UserContext } from "./UserContext";

export const UserContextProvider = ({children}:{children:ReactNode})=>{
    const [cart, setCart] = useState<IProduct[]>([])
    const [logginUser, setLogginUser] = useState<LoginResultType| null>(null)

    return (
        <UserContext.Provider value={{logginUser, setLogginUser, cart, setCart}}>
            {children}
        </UserContext.Provider>
    )
}