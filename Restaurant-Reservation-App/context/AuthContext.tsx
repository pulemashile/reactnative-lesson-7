import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

type AuthContextType = {
  SignIn: (email?: string, password?: string) => Promise<void>;
  Register: (username: string, email: string, password: string) => Promise<void>;
  SignOut: () => Promise<void>;
  session: { user: string | null; isGuest: boolean; username: string | null };
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useSession() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<{ username: string | null; user: string | null; isGuest: boolean }>({
    username: null,
    user: null,
    isGuest: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  // Restore session on app startup
  useEffect(() => {
    const restoreSession = async () => {
        const guestSession = await AsyncStorage.getItem('guest-session');
        if (guestSession) 
        {
            setSession({ user: guestSession, isGuest: true, username: 'Guest' });
        }
        setIsLoading(false);
    };
    restoreSession();
  }, []);

  const Register = async (username: string, email: string, password: string) => {
    setIsLoading(true);
    try 
    { 
        console.log("Attempt Reg: ", username, email)
      // Send POST request to your backend to register the user
      const response = await fetch('http://10.196.0.124:5000/api/auth/signup', { // Replace with your server URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();

      if (data.token) {
        // Store JWT token and set session state
        await AsyncStorage.setItem('auth-token', data.token);
        setSession({ user: email, isGuest: false, username });
        router.push('/(auth)/login'); // Navigate to home or desired screen after successful signup
      } 
      else { alert('Signup failed: ' + data.message); }
    } 
    catch (error: any) 
    {
      console.error('Registration failed:', error.message);
      alert('Registration failed: ' + error.message);
    } 
    finally { setIsLoading(false); }
  };

  const SignIn = async (email?: string, password?: string, isGuest: boolean = false) => {
    setIsLoading(true);
    try {
        if (email && password) 
        {
            // Send POST request to your backend to sign in the user
            const response = await fetch('http://10.196.0.124:5000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (data.token) 
            {
            // Store JWT token and set session state
                await AsyncStorage.setItem('auth-token', data.token);
                setSession({ user: email, isGuest: false, username: data.username });
                router.push('/(app)/profile'); // Navigate to home or desired screen after successful signin
            } 
            else 
            {
                alert('Signin failed: ' + data.message);
            }
        } 
        else if (isGuest) 
        {
            const guestName = email || 'Guest';
            await AsyncStorage.setItem('guest-session', guestName);
            setSession({ user: guestName, isGuest: true, username: 'Guest' });
        }
    } 
    catch (error: any) 
    {
      console.error('Login failed:', error.message);
      alert('Login failed: ' + error.message);
    } 
    finally { setIsLoading(false); }
  };

  const SignOut = async () => {
    setIsLoading(true);
    try 
    {
      await AsyncStorage.removeItem('auth-token');
      await AsyncStorage.removeItem('guest-session');
      setSession({ user: null, isGuest: false, username: null });
      router.push('/(auth)/login'); // Navigate to login page after signout
    } 
    finally { setIsLoading(false); }
  };

  return (
    <AuthContext.Provider value={{ Register, SignIn, SignOut, session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
