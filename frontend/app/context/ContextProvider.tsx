"use client"
import { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface UserDetails {
    [key: string]: number | string;
}

interface AppContextType {
    userDetails: UserDetails;
    setUserDetails: Dispatch<SetStateAction<UserDetails>>;
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
    bookingId: string;
    setBookingId: Dispatch<SetStateAction<string>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    const [userDetails, setUserDetails] = useState<UserDetails>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [bookingId, setBookingId] = useState<string>('');

    return (
        <AppContext.Provider value={{ userDetails, setUserDetails, currentPage, setCurrentPage, bookingId, setBookingId }}>
            {children}
        </AppContext.Provider>
    );
};
