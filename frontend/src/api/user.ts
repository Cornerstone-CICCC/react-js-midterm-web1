import { endpoint } from "."
import type { ICart } from "./cart"
import type { ICartItem } from "./cartItem"

export interface IUser{
    _id:string,
    username:string,
    email:string,
    role:string,
}

export interface SignupUser{
    username:string,
    password:string,
    email:string,
    role:string,
}

export interface Login{
    email:string,
    password:string
}

export interface LoginResultType{
    message:string,
    result:{
        cart:ICart,
        cartItem:ICartItem[],
        user:IUser
    }
}

//If email is not unique, it will return error
export const signup = async(newUser:SignupUser):Promise<IUser|null>=>{
    try{
        const res = await fetch(`${endpoint}/users/signup`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(newUser)
        })

        const data:IUser = await res.json()
        return data
    }catch(error){
        console.error(error)
        return null
    }
}

export const getAllUsers = async():Promise<IUser[]>=>{
    try{
        const res = await fetch(`${endpoint}/users`,{
            method:"GET",
        })

        const data:IUser[] = await res.json()
        return data
    }catch(error){
        console.error(error)
        return []
    }
}

export const getUserByID = async(userId:string):Promise<IUser|null>=>{
    try{
        const res = await fetch(`${endpoint}/users/${userId}`)

        const data:IUser = await res.json()

        console.log(data)
        return data

    }catch(error){
        console.error(error)
        return null
    }
}

//this endpoint will set cookies session and return LoginResultType
export const login = async(loginInfo:Login):Promise<LoginResultType|null>=>{
    try{
        const res = await fetch(`${endpoint}/users/login`,{
            method:"POST",
            credentials: "include", 
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(loginInfo)
        })
        const data:LoginResultType = await res.json()
        console.log(data)
        return data
    }catch(err){
        console.error(err)
        return null
    }
}

export const logout = async()=>{
    try{
        const res = await fetch(`${endpoint}/users/logout`,{
            method:"GET",
            credentials: "include", 
        })

        const data = await res.json()

        return data
    }catch(err){
        console.error(err)
        return false
    }
}

export const deleteUserByUserId = async(userId:string):Promise<boolean>=>{
    try{
        const res = await fetch(`${endpoint}/users/${userId}`,{
            method:"DELETE"
        })

        const data = res.json()

        if(!data){
            return false
        }
        return true
    }catch(error){
        console.error(error)
        return false
    }
}

interface SessionType{
    userId:string,
    username:string,
    role:string
}
export const checkAuth = async()=>{
    try{
        const res = await fetch(`${endpoint}/users/checkAuth`,{
            method:"GET",
            credentials: "include"
        })
        const data:SessionType = await res.json()

        if(!data){
            return false
        }
        return true
    }catch(error){
        console.error(error)
        return false
    }
}