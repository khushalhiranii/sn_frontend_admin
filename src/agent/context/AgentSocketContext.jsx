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
  
  const AgentSocketContext = createContext();
  
  // Define the initial state and reducer for managing socket events
  const initialState = {
    users: {},
    properties: {},
    agent: {},
    transactions: {},
    activeLoans: {},
    bufferLoans: {},
    notifications: {},
    overdueLoans: {},
    closedLoans: {},
    todaysLoans: {}
  };
  
  const socketReducer = (state, action) => {
    switch (action.type) {
      case 'SET_USER':
        return { ...state, users: action.payload };
      case 'SET_PROPERTIES':
        return { ...state, properties: action.payload };
      case 'SET_AGENT':
        return { ...state, agent: action.payload };
      case 'SET_TRANSACTIONS':
        return { ...state, transactions: action.payload };
      case 'SET_ACTIVE_LOANS':
        return { ...state, activeLoans: action.payload };
      case 'SET_BUFFER_LOANS':
        return { ...state, bufferLoans: action.payload };
      case 'SET_NOTIFICATIONS':
        return { ...state, notifications: action.payload };
      case 'SET_OVERDUE_LOANS':
        return { ...state, overdueLoans: action.payload };
    case 'SET_CLOSED_LOANS':
        return { ...state, closedLoans: action.payload };
    case 'SET_TODAYS_LOANS':
        return { ...state, todaysLoans: action.payload };
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
  
  export const AgentSocketProvider = ({ children }) => {
    const socket = useSocket(import.meta.env.VITE_AGENT_SOCKET);
    const [state, dispatch] = useReducer(socketReducer, initialState);
    const Identifier = sessionStorage.getItem('Identifier');
  
    // Function to send the user's "Identifier" after login
    const sendAgentIdentifier = useCallback((identifier) => {
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
      (data) => dispatch({ type: 'SET_USER', payload: data.data?.details?.users }),
      []
    );
    const handlePropertiesEvent = useCallback(
      (data) => dispatch({ type: 'SET_PROPERTIES', payload: data.data?.details?.verifications }),
      []
    );
    const handleAgentEvent = useCallback(
      (data) => dispatch({ type: 'SET_AGENT', payload: data.data?.details?.user?.data }),
      []
    );
    const handleActiveLoansEvent = useCallback(
      (data) => dispatch({ type: 'SET_ACTIVE_LOANS', payload: data.data?.details?.loans }),
      []
    );
    const handleBufferLoansEvent = useCallback(
      (data) => dispatch({ type: 'SET_BUFFER_LOANS', payload: data.data?.details?.loans }),
      []
    );
    const handleNotificationsEvent = useCallback(
      (data) => dispatch({ type: 'SET_NOTIFICATIONS', payload: data.data?.details?.notification }),
      []
    );
    const handleOverdueLoanEvent = useCallback(
        (data) => dispatch({ type: 'SET_OVERDUE_LOANS', payload: data.data?.details?.loans }),
        []
    );
    const handleClosedLoansEvent = useCallback(
        (data) => dispatch({ type: 'SET_CLOSED_LOANS', payload: data.data?.details?.loans }),
        []
    );
    const handleTodaysLoansEvent = useCallback(
        (data) => dispatch({ type: 'SET_TODAYS_LOANS', payload: data.data?.details?.loans }),
        []
    );
  
    useEffect(() => {
      // Attach event listeners
      socket.on('0280777F37D4F4JBBU78D21CEC701463', handleUserEvent);
      socket.on('B5EC69CF4BCVJBIJN8CABF5851E284ED7', handlePropertiesEvent);
      socket.on('0280777F37D4F4E7C478D21CEC701463', handleAgentEvent);
      socket.on('B5EC69CF4C7428ND8CAGJB851E284EE7', handleActiveLoansEvent);
      socket.on('B5EC69CF4C7428ND8CAGJI851E284EE7', handleBufferLoansEvent);
      socket.on('B5EC69CF4C7328EE8CABF3851E284EE3', handleNotificationsEvent);
      socket.on('B5EC69CF4C7428ND8CABF5851E284EE7', handleOverdueLoanEvent);
      socket.on('B5EC69CF4C74BIJN8CABF5851E284EE7', handleClosedLoansEvent);
      socket.on('B5EC69CF4C7428EE8CABF5851E284EE7', handleTodaysLoansEvent)
  
      socket.on('connect', () => {
        const identifier = sessionStorage.getItem('Identifier');
        sendAgentIdentifier(identifier);
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
      handlePropertiesEvent,
      handleAgentEvent,
      handleActiveLoansEvent,
      handleBufferLoansEvent,
      handleNotificationsEvent,
      handleOverdueLoanEvent,
      handleClosedLoansEvent,
      handleTodaysLoansEvent
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
      () => ({ subscribeToEvent, sendAgentIdentifier, logout, ...state }),
      [subscribeToEvent, sendAgentIdentifier, logout, state]
    );
  
    return <AgentSocketContext.Provider value={value}>{children}</AgentSocketContext.Provider>;
  };
  
  // Hook to use the socket context
  export const useAgentSocket = () => useContext(AgentSocketContext);
  