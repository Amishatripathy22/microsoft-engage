import { createContext, useEffect, useState, useContext } from 'react';
import { auth, provider, providerGit, providerMicrosoft } from "../lib/firebase";
const AddContext = createContext();

export function useLocalContext(){
    return useContext(AddContext);
}

export function ContextProvider({ children }){
    const [createClassDialog, setCreateClassDialog] = useState(false);
    const [joinClassDialog, setJoinClassDialog] = useState(false);
    const [todoClassDialog, setTodoClassDialog] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [loggedInMail, setLoggedInMail] = useState(null);
   
    const login = () => auth.signInWithPopup(provider);
    const loginGit = () => auth.signInWithPopup(providerGit);
    //const loginEmail = () => auth.signInWithEmailAndPassword(providerEmail);
    const loginMicrosoft = () => auth.signInWithPopup(providerMicrosoft);

    const logout = () => auth.signOut();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setLoggedInMail(authUser.email);
            setLoggedInUser(authUser);
          } else {
            setLoggedInMail(null);
            setLoggedInUser(null);
          }
        });

    return () => unsubscribe();
    }, []);
    const value = {
      createClassDialog,
      setCreateClassDialog,
      joinClassDialog,
      setJoinClassDialog,
      todoClassDialog, 
      setTodoClassDialog,
      login,
      loginGit,
      loginMicrosoft,
      logout,
      loggedInMail,
      loggedInUser,
    };
  
    return <AddContext.Provider value={value}>{children}</AddContext.Provider>;
  }
  