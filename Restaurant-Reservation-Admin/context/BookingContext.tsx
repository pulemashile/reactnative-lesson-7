import React, { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

const ServerURL = "https://reactnative-lesson-7.onrender.com";

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
  filteredBookings: {
    today: Booking[];
    upcoming: Booking[];
    completed: Booking[];
  };
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

// Helper functions for date filtering
const getTodayDate = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0]; // Returns in format 'YYYY-MM-DD'
};

const isToday = (bookingDate: string): boolean => {
  const today = getTodayDate();
  return bookingDate === today;
};

const isUpcoming = (bookingDate: string): boolean => {
  const today = new Date();
  const bookingDateObj = new Date(bookingDate);
  return bookingDateObj > today;
};

const isCompleted = (bookingDate: string, status: string): boolean => {
  const today = new Date();
  const bookingDateObj = new Date(bookingDate);
  return bookingDateObj < today && status === 'completed';  // Adjust 'completed' if necessary
};

// Provider component
interface BookingProviderProps {
  children: ReactNode;
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Filtered bookings
  const [filteredBookings, setFilteredBookings] = useState({
    today: [] as Booking[],
    upcoming: [] as Booking[],
    completed: [] as Booking[],
  });

  // Function to fetch bookings and filter them
  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ServerURL}/api/all-bookings`);
      const allBookings = response.data;

      // Filter the bookings
      const todayBookings = allBookings.filter((booking: Booking) => isToday(booking.date));
      const upcomingBookings = allBookings.filter((booking: Booking) => isUpcoming(booking.date));
      const completedBookings = allBookings.filter((booking: Booking) => isCompleted(booking.date, booking.status));

      // Update state with filtered bookings
      setFilteredBookings({
        today: todayBookings,
        upcoming: upcomingBookings,
        completed: completedBookings,
      });

      setBookings(allBookings);  // If you want to keep the full list too
    } catch (err) {
      setError('Failed to fetch bookings');
    } finally {
      setLoading(false);
    }
  };

  // Context value to provide
  const value = {
    bookings,
    loading,
    error,
    fetchBookings,
    filteredBookings, // Provide filtered bookings
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
