import { createUserWithEmailAndPassword, GoogleAuthProvider,  signInWithEmailAndPassword,  signInWithPopup, updateProfile } from "firebase/auth";
import { firebaseAuth } from "./config";
import { current } from "@reduxjs/toolkit";


const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {

    try {
        const result = await signInWithPopup( firebaseAuth, googleProvider );
        // const credential = GoogleAuthProvider.credentialFromResult( result );
        
        const { user, uid, email, displayName, photoURL } = result.user

        return {
            ok: true,
            user, uid, email, displayName, photoURL
        }
        
    } catch (error) {
        console.log(error)

        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage
        }
        
    }
}

export const registerUserWithEmailPassword = async ({email, password, displayName}) => {
    console.log({email, password, displayName})

    try {
        const resp = await createUserWithEmailAndPassword( firebaseAuth, email, password );
        const { uid, photoURL } = resp.user
        
        await updateProfile(firebaseAuth.currentUser, ({ displayName }))

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        return { ok: false, errorMessage: error.message }  
    }

}


export const loginWithEmailPassword = async({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(firebaseAuth, email, password)
        const { uid, photoURL, displayName} = resp.user

        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {

        return { ok: false, errorMessage: error.message }
        
    }
}

export const logoutFirabase = async() => {

    return await firebaseAuth.signOut()
}
