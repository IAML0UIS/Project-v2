import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../store/auth/authSlice";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../firebase/config";


export const useCheckAuth = () => {
    const { status } = useSelector( state => state.auth);

    const dispatch = useDispatch()
  
    useEffect(() => {
      onAuthStateChanged( firebaseAuth, async ( user ) => {
        if( !user ) return dispatch( logout() );
  
        const {displayName, email, photoURL, uid } = user;
        dispatch(login({displayName, email, photoURL, uid}))     
      }) 
    }, [])

    return {
        status
    }
}
