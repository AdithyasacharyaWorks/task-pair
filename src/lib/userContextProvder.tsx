'use client'
// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import Cookies from "js-cookie";

// // Define the shape of the context state
// interface AppContextState {
//     userEmail: string;
//     userId: string;
//     userName: string;
// }

// // Define the shape of the context, including the state and setState function
// interface AppContextType {
//     state: AppContextState;
//     setState: React.Dispatch<React.SetStateAction<AppContextState>>;
//     clearState: () => void; // Function to clear the state
// }

// // Create the context with the extended type
// const AppContext = createContext<AppContextType | undefined>(undefined);

// export function AppWrapper({ children }: { children: ReactNode }) {
//     const [state, setState] = useState<AppContextState>(() => {
//         const cookieState = Cookies.get('appContextState');
//         return cookieState ? JSON.parse(cookieState) : { userEmail: "", userId: "", userName: "" };
//     });

//     // Update the appContextState cookie whenever state changes
//     useEffect(() => {
//         Cookies.set('appContextState', JSON.stringify(state), { expires: 1 }); // Set expiration for 1 day
//     }, [state]);

//     // Function to clear the state and cookie
//     const clearState = () => {
//         setState({ userEmail: "", userId: "", userName: "" });
//         Cookies.remove('appContextState', { Path: '/' });
//     };

//     return (
//         <AppContext.Provider value={{ state, setState, clearState }}>
//             {children}
//         </AppContext.Provider>
//     );
// }

// // Custom hook to use the AppContext
// export function useAppContext() {
//     const context = useContext(AppContext);
//     if (context === undefined) {
//         throw new Error("useAppContext must be used within an AppWrapper");
//     }
//     return context;
// }


// AppWrapper.tsx
// import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// import Cookies from "js-cookie";

// // Define the shape of the context state
// interface AppContextState {
//     userEmail: string;
//     userId: string;
//     userName: string;
// }

// // Define the shape of the context, including the state and setState function
// interface AppContextType {
//     state: AppContextState;
//     setState: React.Dispatch<React.SetStateAction<AppContextState>>;
//     clearState: () => void; // Function to clear the state
// }

// // Create the context with the extended type
// const AppContext = createContext<AppContextType | undefined>(undefined);

// export function AppWrapper({ children }: { children: ReactNode }) {
//     const [state, setState] = useState<AppContextState>(() => {
//         const cookieState = Cookies.get('appContextState');
//         return cookieState ? JSON.parse(cookieState) : { userEmail: "", userId: "", userName: "" };
//     });

//     // Update the appContextState cookie whenever state changes
//     useEffect(() => {
//         Cookies.set('appContextState', JSON.stringify(state), { expires: 1, sameSite: 'strict', secure: true }); // Set expiration for 1 day, sameSite and secure options
//     }, [state]);

//     // Function to clear the state and cookie
//     const clearState = () => {
//         setState({ userEmail: "", userId: "", userName: "" });
//         Cookies.remove('appContextState', { path: '/', sameSite: 'strict', secure: true }); // Clear cookie with proper options
//         Cookies.remove('token', { path: '/', sameSite: 'strict', secure: true }); // Also clear token cookie if needed
//     };

//     return (
//         <AppContext.Provider value={{ state, setState, clearState }}>
//             {children}
//         </AppContext.Provider>
//     );
// }

// // Custom hook to use the AppContext
// export function useAppContext() {
//     const context = useContext(AppContext);
//     if (context === undefined) {
//         throw new Error("useAppContext must be used within an AppWrapper");
//     }
//     return context;
// }


import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

// Define the shape of the context state
interface AppContextState {
    userEmail: string;
    userId: string;
    userName: string;
}

// Define the shape of the context, including the state and setState function
interface AppContextType {
    state: AppContextState;
    setState: React.Dispatch<React.SetStateAction<AppContextState>>;
    clearState: () => void; // Function to clear the state
}

// Create the context with the extended type
const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppWrapper({ children }: { children: ReactNode }) {
    const [state, setState] = useState<AppContextState>(() => {
        const cookieState = Cookies.get('appContextState');
        return cookieState ? JSON.parse(cookieState) : { userEmail: "", userId: "", userName: "" };
    });

    // Update the appContextState cookie whenever state changes
    useEffect(() => {
        Cookies.set('appContextState', JSON.stringify(state), { expires: 1, sameSite: 'strict', secure: true }); // Set expiration for 1 day, sameSite and secure options
    }, [state]);

    // Function to clear the state and cookie
    const clearState = () => {
        setState({ userEmail: "", userId: "", userName: "" });
        Cookies.remove('appContextState', { path: '/', sameSite: 'strict', secure: true }); // Clear appContextState cookie with proper options
        Cookies.remove('token', { path: '/', sameSite: 'strict', secure: true }); // Clear token cookie with proper options
    };

    return (
        <AppContext.Provider value={{ state, setState, clearState }}>
            {children}
        </AppContext.Provider>
    );
}

// Custom hook to use the AppContext
export function useAppContext() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useAppContext must be used within an AppWrapper");
    }
    return context;
}
