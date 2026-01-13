import { Response, Request } from "express";
import userService,{IUserLogin} from "../services/user.service";
import { IUser } from "../models/user.model";
import { ICart } from "../models/cart.model";
import { ICartItem } from "../models/cartItem.model";

//Get All User
const getAllUsers = async(req:Request, res:Response)=>{
    try{
        const users = await userService.getAll()

        if(!users){
            res.status(500).json({message:"Unable to fetch users"})
            return
        }

        res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}

//Check if user email exist in database or not
const ValidateUser = async(req:Request<{},{},{},{email:string}>, res:Response)=>{
    const { email} = req.query
    try{
        const users = await userService.getValidateByEmail(email)

        res.status(200).json(users)
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}

//get user by id
const getUserById = async(req:Request<{id:string}>,res:Response)=>{
    try{
        const user = await userService.getById(req.params.id)

        if(!user){
            res.status(500).json({message:"User not found"})
            return
        }

        res.status(200).json(user)
    }catch(error){
        console.error(error)
        res.status(500).json({messege:'Server Error'})
    }
}


//create user -sign up
const createUsers = async(req:Request<{},Partial<IUser>>, res:Response)=>{
    const {email, password, username, role } = req.body

    try{
        if(!username||!email||!password||!role){
            res.status(500).json({
                message:"Missing information"
            })
            return
        }
        const newUser = await userService.add({username,email, password, role})

        if(!newUser){
            res.status(500).json({message:"Unable to create user"})
            return
        }

        res.status(201).json(newUser)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
}

//update user
const updateUserById = async(req:Request<{id:string},Partial<IUser>>,res:Response)=>{
    const {username,email, password, role} = req.body

    try{
        const updatedUser = await userService.update(req.params.id,{
            username,
            email,
            password,
            role,
        })

        if(!updatedUser){
            res.status(404).json({message:"User not found"})
            return
        }
        res.status(200).json(updatedUser)
    }catch(error){
        console.error(error)
        res.status(500).json({message:"server error"})
    }

}

interface LoginResult{
    user:IUser,
    cart?:ICart,
    cartItems?:ICartItem[]
}
//log in
const login = async (req: Request<{}, {}, IUserLogin>, res:Response) => {
  const {email, password} = req.body
  try{
    if (!email.trim() || !password.trim()) {
      res.status(400).json({
        message: "Email or password is empty!"
      })
      return
    }

    const result = await userService.login({email, password})
    if(!result){
      res.status(401).json({message:"Invalid credentials!"})
      return
    }
    
    if(req.session){
      req.session.isLoggedIn = true
      req.session.user = {
        _id:result.user._id,
        username:result.user.username,
        role:result.user.role,
        cartId:result.cart?._id
      }
    }

    res.status(200).json({
      message: "Login successful!",
      result
    })

  }catch(err){
    console.error(err)
    res.status(500).json({message: "Server error"})
  }

}

//Check auth
const checkAuth = (req: Request, res: Response) => {
  if(!req.session || !req.session.user){
    res.status(401).json({
      message: "You are not allowed to access this"
    })
  }else{
    res.status(200).json(req.session.user)
  }
  
}

// Logout
const logout = (req: Request, res: Response) => {
  if(req.session) {
    req.session = null
  }
  res.status(200).json({
    message: "Logout successful"
  })
}

//Delete user by id
const deleteUser = async(req: Request<{id: string}>, res:Response ) => {
  try{
    const deletedUser = await userService.remove(req.params.id)
    if(!deletedUser) {
      res.status(404).json({
        message: "User not found!"
      })
      return
    }
    res.status(200).json(deletedUser)
  }catch(err){
    console.error(err)
    res.status(500).json({ message: "Server error" })
  }
}

export default{
    getAllUsers,
    ValidateUser,
    getUserById,
    createUsers,
    updateUserById,
    login,
    checkAuth,
    logout,
    deleteUser
}