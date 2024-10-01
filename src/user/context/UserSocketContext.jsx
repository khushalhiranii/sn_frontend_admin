import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useReducer,
  useMemo,
} from 'react';
import { io } from 'socket.io-client';
import Error from '../../error';

const UserSocketContext = createContext();

// Define the initial state and reducer for managing socket events
const initialState = {
  user: {},
  userData: {},
  account: {},
  transactions: {},
  loans: {},
  schemes: {},
  notifications: {},
  products: {},
  requests: {}
};

const socketReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_USER_DATA':
      return { ...state, userData: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case 'SET_TRANSACTIONS':
      return { ...state, transactions: action.payload };
    case 'SET_LOANS':
      return { ...state, loans: action.payload };
    case 'SET_SCHEMES':
      return { ...state, schemes: action.payload };
    case 'SET_NOTIFICATIONS':
      return { ...state, notifications: action.payload };
    case 'SET_PRODUCTS':
      return { ...state, products: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload };
    case 'RESET_STATE':  // New action for resetting state
      return initialState;
    default:
      return state;
  }
};

// Custom hook for creating socket connection
const useSocket = (url) => {
  return useMemo(() => io(url, { transports: ['websocket', 'polling'] }), [url]);
};

export const UserSocketProvider = ({ children }) => {
  const socket = useSocket(import.meta.env.VITE_USER_SOCKET);
  const [state, dispatch] = useReducer(socketReducer, initialState);
  const Identifier = sessionStorage.getItem('Identifier');

  // Function to send the user's "Identifier" after login
  const sendUserIdentifier = useCallback((identifier) => {
    if (identifier) {
      socket.emit('EAADB0027AD4AD504A1AA179270D6CED', {
        "data": {
          "Identifier": identifier
        }
      });
    } else {
      socket.emit('EAADB0027AD4AD504A1AA179270D6CED', {
        "data": {
          "Identifier": Identifier
        }
      });
    }
  }, [socket]);

  // Define socket event handlers
  const handleUserEvent = useCallback(
    (data) => dispatch({ type: 'SET_USER', payload: data.data?.details?.user }),
    []
  );
  const handleUserDataEvent = useCallback(
    (data) => dispatch({ type: 'SET_USER_DATA', payload: data.data?.details?.data }),
    []
  );
  const handleAccountsEvent = useCallback(
    (data) => dispatch({ type: 'SET_ACCOUNT', payload: data.data?.details?.account }),
    []
  );
  const handleTransactionsEvent = useCallback(
    (data) => dispatch({ type: 'SET_TRANSACTIONS', payload: data.data?.details?.Transactions }),
    []
  );
  const handleLoansEvent = useCallback(
    (data) => dispatch({ type: 'SET_LOANS', payload: data.data?.details?.loans }),
    []
  );
  const handleSchemesEvent = useCallback(
    (data) => dispatch({ type: 'SET_SCHEMES', payload: data.data?.details?.scheme }),
    []
  );
  const handleNotificationsEvent = useCallback(
    (data) => dispatch({ type: 'SET_NOTIFICATIONS', payload: data.data?.details?.notification }),
    []
  );
  const handleProductsEvent = useCallback((data) => dispatch({ type: 'SET_PRODUCTS', payload: data.data?.details?.products }), []);
  const handleLoanRequestsEvent = useCallback((data) => dispatch({ type: 'SET_REQUESTS', payload: data.data?.details?.request }), []);

  useEffect(() => {
    // Attach event listeners
    socket.on('0280777F37D4F4E7C478D21CEC701463', handleUserEvent);
    socket.on('764723AD6458ACC527B82A04ED5C5BC2', handleUserDataEvent);
    socket.on('02A1F60DB26C4A78CAA677A35D1B452B', handleAccountsEvent);
    socket.on('97A70F223BA2A5F5C4E04E2235AE3553', handleLoansEvent);
    socket.on('6E6ED2EDEE685CF214DD64167EEDCC2C', handleSchemesEvent);
    socket.on('B5EC69CF4C7328EE8CABF3851E284EE3', handleNotificationsEvent);
    socket.on('97A70F223BA2A5F5C4E04E2235AE3R53', handleLoanRequestsEvent);
    socket.on('7712D5EQDA9F00F842E470D02D381F9P', handleProductsEvent);

    socket.on('connect', () => {
      const identifier = sessionStorage.getItem('Identifier');
      sendUserIdentifier(identifier);
    });

    // Cleanup event listeners when the component unmounts
    return () => {
      // socket.off('0280777F37D4F4E7C478D21CEC701463', handleUserEvent);
      // socket.off('764723AD6458ACC527B82A04ED5C5BC2', handleUserDataEvent);
      // socket.off('02A1F60DB26C4A78CAA677A35D1B452B', handleAccountsEvent);
      // socket.off('97A70F223BA2A5F5C4E04E2235AE3553', handleLoansEvent);
      // socket.off('6E6ED2EDEE685CF214DD64167EEDCC2C', handleSchemesEvent);
      // socket.off('B5EC69CF4C7328EE8CABF3851E284EE3', handleNotificationsEvent);
      // socket.off('97A70F223BA2A5F5C4E04E2235AE3R53', handleLoanRequestsEvent);
      // socket.off('7712D5EQDA9F00F842E470D02D381F9P', handleProductsEvent);
    };
  }, [
    socket,
    handleUserEvent,
    handleUserDataEvent,
    handleAccountsEvent,
    handleLoansEvent,
    handleSchemesEvent,
    handleNotificationsEvent,
    handleProductsEvent,
    handleLoanRequestsEvent
  ]);

  // Subscribe to an event dynamically
  const subscribeToEvent = useCallback(
    (eventName, callback) => {
      socket.on(eventName, callback);

      return () => {
        socket.off(eventName, callback);
      };
    },
    [socket]
  );

  // Function to logout and reset the state
  const logout = useCallback(() => {
    dispatch({ type: 'RESET_STATE' });
    socket.disconnect(); // Disconnect socket on logout
  }, [socket]);

  console.log(state);

  const value = useMemo(
    () => ({ subscribeToEvent, sendUserIdentifier, logout, ...state }),
    [subscribeToEvent, sendUserIdentifier, logout, state]
  );

  return <UserSocketContext.Provider value={value}>{children}</UserSocketContext.Provider>;
};

// Hook to use the socket context
export const useUserSocket = () => useContext(UserSocketContext);
