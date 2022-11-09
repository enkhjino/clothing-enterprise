import { useState, createContext, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from '../utilities/firebase/firebase.utilities';

//as the actual value you want to access
export const UserContext = createContext({
    setCurrentUser: () => null,
    currentUser: null,
})

//provider
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser };
    
    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={ value }>{ children }</UserContext.Provider>
};