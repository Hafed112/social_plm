import { useState,useEffect,useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener(){
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('authUser')));
    const {firebase1} =useContext(FirebaseContext);

    useEffect(()=>{
        const listener = firebase1.auth().onAuthStateChanged((authUser) =>{
            if(authUser){
                // if we have user then we can store it in localstorage
                localStorage.setItem('authUser',JSON.stringify(authUser));
                setUser(authUser);
            }else{
                // we don't an authUser, therefore clear the localstorage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();

    },[firebase1])

    return {user};
}