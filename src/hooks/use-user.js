import { useState,useEffect,useContext } from "react";
import UserContext from "../context/user";
import { getUserByUserId } from "../services/firebase";

export default function useUser(){
    const [activeUser,setActiveUser] =useState({});
    const {user} = useContext(UserContext);

    useEffect(()=>{
        const getUserObjByUserId = async()=>{
            //we build function that we can call firebase service that gets user data based on id
            const [response] = await getUserByUserId(user.uid);
            setActiveUser(response ||{});
        } 
        if(user?.uid){
            getUserObjByUserId();
        }
    },[user])

    return {user : activeUser};
}