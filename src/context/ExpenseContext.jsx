import { createContext, useReducer, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const ExpenseContext = createContext();

const initialState = [
  {
    id: uuidv4(),
    date: '2024-05-27',
    item: 'Example Item 1',
    amount: '10000',
    description: 'Example Description 1'
  },
  {
    id: uuidv4(),
    date: '2024-05-28',
    item: 'Example Item 2',
    amount: '20000',
    description: 'Example Description 2'
  }
];

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'UPDATE_EXPENSE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense
      );
    case 'DELETE_EXPENSE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <ExpenseContext.Provider value={{ state, dispatch }}>
      {children}
    </ExpenseContext.Provider>
  );
};

ExpenseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// eslint-disable-next-line react-refresh/only-export-components
export const useExpenseContext = () => {
  return useContext(ExpenseContext);
};
