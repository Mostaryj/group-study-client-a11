import { createContext, useEffect, useState } from "react";
import {
    GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  
 
} from "firebase/auth";
import auth from "../firebase/firebase.config";

import axios from "axios";//


export const AuthContext = createContext(null);



//social auth
const googleProvider = new  GoogleAuthProvider();



const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
   console.log(user);

  //loading
   const [loading, setLoading] = useState(true);



  //create user
  const createUser = (email, password) => {
    setLoading(false);

      return createUserWithEmailAndPassword(auth, email, password )
 

  };


  // sign in user
  const signInUser = (email, password) => {
       setLoading(false);
    return signInWithEmailAndPassword(auth, email, password)
   
 

  };



  // google login
  const googleLogin = () => {
     setLoading(false);

  return signInWithPopup(auth, googleProvider) 
    

   
  };



  
  const logOut = () =>{
      setUser(null);
   return signOut(auth)
   
 
  };
  
 
   // OBSERVER
  //  useEffect(() => {
  //   const unsubscribe = 
  //  onAuthStateChanged(auth, (user) => {
     
  //       if(user){
  //         setUser(user);
  //       }
  //         setLoading(false);
    
  //   });
  //    return () => unsubscribe();
  // }, []);

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      const userEmail = user?.email || user?.email;
      const loggedUser = {email: userEmail};
      if (user) {
       
       
        axios.post('https://group-study-server-eight.vercel.app/jwt', loggedUser,{
         withCredentials: true
        })
        .then(res =>{
          console.log("token" , res.data);
        })
      }
      // else{
      //   axios.post('https://group-study-server-eight.vercel.app/logout', loggedUser,{
      //     withCredentials: true
      //    })
      //    .then(res =>{
      //     console.log("token logout" , res.data);
      //   })
      // }

      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);



  const allValue = {
    createUser,
    signInUser,
    googleLogin,
    logOut,
    user,
    setUser,
    loading

  };
  return (
    <AuthContext.Provider value={allValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
