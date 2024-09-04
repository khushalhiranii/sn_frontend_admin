import React, { createContext, useContext, useEffect, useCallback, useReducer, useMemo } from 'react';
import { io } from 'socket.io-client';

const AdminSocketContext = createContext();

// Define the initial state and reducer for managing socket events
const initialState = {
  users: {},
  userData: {},
  accounts: {},
  transactions: {},
  loans: {},
  schemes: {},
  notifications: {},
};

const socketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return { ...state, users: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_ACCOUNTS':
      return { ...state, accounts: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_LOANS':
      return { ...state, loans: action.payload };
    case 'SET_SCHEMES':
      return { ...state, schemes: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    default:
      return state;
  }
};

// Custom hook for creating socket connection
const useSocket = (url) => {
  return useMemo(() => io(url, { transports: ['websocket', 'polling'] }), [url]);
};

export const SocketProvider = ({ children }) => {
  const socket = useSocket(import.meta.env.VITE_USER_SOCKET);
  const [state, dispatch] = useReducer(socketReducer, initialState);

  // Define socket event handlers
  const handleUserEvent = useCallback((data) => dispatch({ type: 'SET_USERS', payload: data.data.details.users }), []);
  const handleUserDataEvent = useCallback((data) => dispatch({ type: 'SET_USER_DATA', payload: data.data.details.data }), []);
  const handleAccountsEvent = useCallback((data) => dispatch({ type: 'SET_ACCOUNTS', payload: data.data.details.accounts }), []);
  const handleTransactionsEvent = useCallback((data) => dispatch({ type: 'SET_TRANSACTIONS', payload: data.data.details.transactions }), []);
  const handleLoansEvent = useCallback((data) => dispatch({ type: 'SET_LOANS', payload: data.data.details.loans }), []);
  const handleSchemesEvent = useCallback((data) => dispatch({ type: 'SET_SCHEMES', payload: data.data.details.schemes }), []);
  const handleNotificationsEvent = useCallback((data) => dispatch({ type: 'SET_NOTIFICATIONS', payload: data.data.details.notifications }), []);

  useEffect(() => {
    // Attach event listeners
    socket.on('60B7B5144444BDE4E0142BF0A4ED9839', handleUserEvent);
    socket.on('2E9ECBE30C6B14D8F4849DF1F4F7DCE2', handleUserDataEvent);
    socket.on('B0D448107911CFA3DB034F04F007C513', handleAccountsEvent);
    socket.on('7712D5ECDA9F00F842E470D02D381F9A', handleLoansEvent);
    socket.on('B23CD2AE771A705F2F5EF60173743B5B', handleSchemesEvent);
    socket.on('09BAE709245B6148A2EC9215735DAE33', handleNotificationsEvent);

    // Cleanup event listeners when the component unmounts
    return () => {
      socket.off('60B7B5144444BDE4E0142BF0A4ED9839', handleUserEvent);
      socket.off('2E9ECBE30C6B14D8F4849DF1F4F7DCE2', handleUserDataEvent);
      socket.off('B0D448107911CFA3DB034F04F007C513', handleAccountsEvent);
      socket.off('7712D5ECDA9F00F842E470D02D381F9A', handleLoansEvent);
      socket.off('B23CD2AE771A705F2F5EF60173743B5B', handleSchemesEvent);
      socket.off('09BAE709245B6148A2EC9215735DAE33', handleNotificationsEvent);
    };
  }, [socket, handleUserEvent, handleUserDataEvent, handleAccountsEvent, handleLoansEvent, handleSchemesEvent, handleNotificationsEvent]);

  // Subscribe to an event dynamically
  const subscribeToEvent = useCallback((eventName, callback) => {
    socket.on(eventName, callback);

    return () => {
      socket.off(eventName, callback);
    };
  }, [socket]);

  console.log(state)

  const value = useMemo(
    () => ({ subscribeToEvent, ...state }),
    [subscribeToEvent, state]
  );

  return <AdminSocketContext.Provider value={value}>{children}</AdminSocketContext.Provider>;
};

// Hook to use the socket context
export const useAdminSocket = () => useContext(AdminSocketContext);
