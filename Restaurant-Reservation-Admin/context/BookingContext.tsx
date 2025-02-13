import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

// Define the type for a Booking
interface Booking {
  _id: string;
  guestName: string;
  email: string;
  phone: string;
  restaurantName: string;
  guestCount: number;
  mealType: string;
  date: string;  // This can be a string or Date depending on how you manage it
  time: string;  // Same for time
  hoursIn: number;
  slots: string;
  notes: string;
  specialRequest: string;
  totalPrice: number;
  status: string;
  __v: number;
  paymentId: string;
}

// Define the context type
interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  fetchBookings: () => void;
}

// Create the Booking Context
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Custom hook to use BookingContext
export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

// Provider component
interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch bookings by email
  const fetchBookings = async () => {
    setLoading(true);
    try 
    {                
      const response = await axios.get(` http://10.196.0.124:5000/api/all-bookings`);
      console.log("Context: ", response.data);
      
      setBookings(response.data);
    } 
    catch (err) { setError('Failed to fetch bookings'); } 
    finally { setLoading(false); }
  };

  // Context value to provide
  const value = {
    bookings,
    loading,
    error,
    fetchBookings,
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
