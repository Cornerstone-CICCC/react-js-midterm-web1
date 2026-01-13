import { useEffect } from "react"
import { getAllProducts, getProductById, updateProductById } from "./api/products"
import { createCart, UpdateCart } from "./api/cart"
import { signup, getAllUsers, getUserByID, login, logout, checkAuth } from "./api/user"

type Props = {}

const App = (props: Props) => {
  useEffect(()=>{
    const newUser ={
      email:"ayaka@gamil.com",
      password:"ayaka",
      // role:"customer",
      // username:"ayaka"
    }
    //login(newUser)
    //logout()
  checkAuth()

  },[])
  return (
    <div>App</div>
  )
}

export default App
