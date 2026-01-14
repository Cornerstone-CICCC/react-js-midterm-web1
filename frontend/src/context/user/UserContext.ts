import { createContext } from "react";
import type { LoginResultType } from "../../api/user";
import type { IProduct } from "../../api/products";


export type UserContextType = {
  logginUser: LoginResultType | null
  setLogginUser: React.Dispatch<React.SetStateAction<LoginResultType| null>>
  cart:IProduct[]
  setCart: React.Dispatch<React.SetStateAction<IProduct[]>>
}

export const UserContext = createContext<UserContextType|null>(null)