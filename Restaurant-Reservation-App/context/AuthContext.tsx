import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { router, useRouter } from 'expo-router';

const SESSION_EXPIRATION_TIME = 2 * 24 * 60 * 60 * 1000;

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
  if (!context) 
  {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export function SessionProvider({ children }: PropsWithChildren)
{
  const [session, setSession] = useState<{ username: string | null; user: string | null; isGuest: boolean }>({
    username: null,
    user: null,
    isGuest: false,
  });

  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Restore session on app startup
  useEffect(() => {
    const restoreSession = async () => {
        const guestSession = await AsyncStorage.getItem('guest-session');
        if (guestSession) 
        {
            setSession({ user: guestSession, isGuest: true, username: 'Guest' });
        }

        const savedSession = await AsyncStorage.getItem('session');
        if (savedSession) 
        {
          const { username, user,  timestamp } = JSON.parse(savedSession);
          const currentTime = new Date().getTime();
  
          // Check if the session is expired (more than 2 days old)
          if (currentTime - timestamp < SESSION_EXPIRATION_TIME) {
            setSession({ username, user });
            router.replace('/(tabs)/profile'); // Navigate to profile if session is valid
          } else {
            // Session is expired
            setSession({ username: null, user: null  });
            router.replace('/(auth)/login'); // Redirect to login if session expired
          }
        } 
        else 
        {
          setSession({ user: null, username: null });
          router.replace('/(auth)/login'); // No session found, go to login
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

        if (data.token)
        {
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
    try 
    {
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
              const currentTime = new Date().getTime();
            // Store JWT token and set session state
                await AsyncStorage.setItem('auth-token', data.token);
                const sessionData = { username: data.username, user: email,  isGuest: false, timestamp: currentTime }
                
                await AsyncStorage.setItem('session', JSON.stringify(sessionData))
                setSession({ username: data.username, user: email,  isGuest: false});
                router.push('/(tabs)/profile'); // Navigate to home or desired screen after successful signin
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
            setSession({  username: 'Guest', user: guestName, isGuest: true });
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
      await AsyncStorage.removeItem('session');
      await AsyncStorage.removeItem('auth-token');
      await AsyncStorage.removeItem('guest-session');
      setSession({ username: null, user: null, isGuest: false,  });
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
