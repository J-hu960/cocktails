import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';
import { IUser, TDrink } from '../types';

// Define the shape of the state
interface UserState {
  user: IUser;
  userFavDrinks:TDrink[]
}

// Define the action types
type UserAction =
  | { type: 'ADD_NAME'; payload: string }
  | { type: 'ADD_PHOTO'; payload: string }
  | { type: 'RESET_USER' }
  | {type:'ADD_FAVDRINK'; payload:TDrink}
  | {type:'REMOVE_FAVDRINK'; payload:TDrink}
  | {type:'SET_USERFAVSINITIAL'; payload:TDrink[]}


// Define the initial state
const initialState: UserState = {
  user: {username:""},
  userFavDrinks:[]

};

// Create the UserContext with default values
const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// User reducer function
const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case 'ADD_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };
    case 'ADD_PHOTO':
      return {
        ...state,
        user: {
          ...state.user,
          photo: action.payload,
        },
      };
    case 'RESET_USER':
      return {
        ...state,
        user: { username: ' ' },
      };
    case 'ADD_FAVDRINK':
      const alreadyInList = state.userFavDrinks.some(drink=>drink.PK_Drink === action.payload.PK_Drink)
        if(alreadyInList) return{
          ...state,
        }
      return{
        ...state,
        userFavDrinks:[...state.userFavDrinks,action.payload]
      }
      
    case 'REMOVE_FAVDRINK':
      if(!( state.userFavDrinks.some(drink=>drink.PK_Drink === action.payload.PK_Drink))) 
        return{
            ...state,
      }
        const newList:TDrink[] = state.userFavDrinks.filter(drink=>drink.PK_Drink!==action.payload.PK_Drink)
        return{
          ...state,
          userFavDrinks:[...newList]
        }
    case 'SET_USERFAVSINITIAL':
      return{
        ...state,
        userFavDrinks:action.payload
      }
    default:
      return state;
  }
};

// Define UserProvider props type
interface UserProviderProps {
  children: ReactNode;
}

// UserProvider component
export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
