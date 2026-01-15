import { createContext } from "react";
import type { IUser, LoginResultType } from "../../api/user";
import type { IProduct } from "../../api/products";

export interface CartType extends IProduct{
  quantity:number
}


export type UserContextType = {
  logginUser: IUser | null
  setLogginUser: React.Dispatch<React.SetStateAction<IUser| null>>
  activeCartId:string | null,
  setActiveCartId:React.Dispatch<React.SetStateAction<string| null>>
  cart:CartType[]
  setCart: React.Dispatch<React.SetStateAction<CartType[]>>
}

export const UserContext = createContext<UserContextType|null>(null)