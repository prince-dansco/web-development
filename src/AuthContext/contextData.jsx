// import { createContext, useContext, useState } from 'react'
// import { superbase } from '../superbaseClient';
// const AuthContext = createContext();

// export const AuthContextProvider=({children})=>{
//     const [session, setSession]= useState(undefined);

//     const signUpNewUser = async ()=>{
//         const  [data, error ] = await superbase.auth.signUp({
//            email: email,
//             password: password
//     })
     
//     if(error){
//         console.error('there was a proplem signing up:', error);
//         return [success: true, error];
//     }
//     return [success: true, data];
//     }


// useEffect(() => {
// superbase.auth.getSession().then(({data: {session}})=>{
//     setSession(session)
// })
// }, [])









//     return(
//         <AuthContext.Provider value={{session}}>{children}</AuthContext.Provider>
//     )
// }
// export const UseAuth =()=>{
//     return useContext(AuthContext);
// }