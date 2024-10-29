import { loginWithEmailPassword, logoutFirabase, registerUserWithEmailPassword, singInWithGoogle } from "../../firebase/provider"
import { checkingCredentials, login, logout } from "./authSlice"


export const estadoAutenticado = ( email, password ) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() )
    }
}

export const startInicioSesionGoogle = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials() )

        const result = await singInWithGoogle();
        if( !result.ok ) return dispatch( logout( result.errorMessage ))
        
        dispatch( login( result ) );
    
    }
}


export const startCreatingUserWithEmailPassword =  ( { email, password, displayName } ) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await registerUserWithEmailPassword({ email, password, displayName })
        console.log(result.errorMessage)
        if( !result.ok ) return dispatch( logout(result.errorMessage) )
            console.log(result)

        dispatch( login(result) )
    }
}

export const startloginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {

        dispatch(checkingCredentials() );

        const result = await loginWithEmailPassword({ email, password })

        if( !result.ok ) return dispatch( logout(result));

        dispatch( login(result) );
    
    }
}

export const starLogout = () => {

    return async( dispatch ) => {

        await logoutFirabase();

        dispatch( logout() );
    }

}
