import { createContext, useContext, useState } from 'react';

// 초기 상태
const initialExpenses = [];

// Context 생성
const ExpenseContext = createContext();

// Context Provider
export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState(initialExpenses);

  // 지출 목록 추가 함수
  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  // 지출 목록 수정 함수
  const updateExpense = (id, updatedExpense) => {
    setExpenses(expenses.map((expense) => (expense.id === id ? updatedExpense : expense)));
  };

  // 지출 목록 삭제 함수
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, updateExpense, deleteExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};

// 커스텀 훅 생성
export const useExpense = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpense must be used within an ExpenseProvider');
  }
  return context;
};
