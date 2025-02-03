// /context/AuthContext.tsx
import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';

// import { auth } from '@/firebase/config';
// import { 
//     createUserWithEmailAndPassword, 
//     signInWithEmailAndPassword, 
//     updateProfile,
//     signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the auth context type
type AuthContextType = {
    SignIn: (email?: string, password?: string) => Promise<void>;
    Register: (username: string, email: string, password: string) => Promise<void>;
    SignOut: () => Promise<void>;
    session: { user: string | null; isGuest: boolean; username: string | null };
    isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession() 
{
    const context = useContext(AuthContext);
    if (!context) 
    {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}

export function SessionProvider({ children }: PropsWithChildren) 
{
    const [session, setSession] = useState<{ username: string | null, user: string | null; isGuest: boolean;  }>({
        username: null,
        user: null,
        isGuest: false,        
      });
    const [isLoading, setIsLoading] = useState(true);

    // Restore session on app startup
    useEffect(() => {
        const restoreSession = async () => {
            const guestSession = await AsyncStorage.getItem("guest-session");
            if (guestSession) 
            {
                setSession({ user: guestSession, isGuest: true, username:"Guest" });
            }

            setIsLoading(false);
        };
        restoreSession();
    }, []);
    
    const Register = async (username: string, email: string, password: string ) => {
        setIsLoading(true);
        try 
        {
            // const userCredential = await createUserWithEmailAndPassword(auth, email, password);

            // await updateProfile(userCredential.user, { displayName: username }); // Save username in Firebase profile
            // setSession({ username, user: email, isGuest: false,  });
        } 
        catch (error: any) 
        {
            console.error("Registration failed:", error.message);
            alert(error.message);
        } 
        finally { setIsLoading(false); }
    };

    const SignIn = async (email?: string, password?: string, isGuest: boolean=false) => {
        setIsLoading(true);
        try 
        {
            if (email && password) 
            {
                // const userCredential = await signInWithEmailAndPassword(auth, email, password);
                // const username = userCredential.user.displayName || email.split("@")[0]; // Retrieve username or fallback to email prefix
                // setSession({ user: email, isGuest: false, username });
            } 
            else if(isGuest)
            {                
                const guestName = email || "Guest";
                await AsyncStorage.setItem("guest-session", guestName);
                setSession({ user: guestName, isGuest: true, username: "Guest" });
            }
        } 
        catch (error: any) 
        {
            console.error('Login failed:', error.message);
            alert(error.message);
        } 
        finally { setIsLoading(false); }
    };    

    const SignOut = async () => {
        setIsLoading(true);
        try 
        {
        //   await signOut(auth);
          await AsyncStorage.removeItem("guest-session");
          setSession({ user: null, isGuest: false, username: null });
        } 
        finally { setIsLoading(false); }
    };

    return (
        <AuthContext.Provider value={{ Register, SignIn, SignOut, session, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}