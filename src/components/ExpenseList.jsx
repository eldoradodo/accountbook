
import { useExpense } from '../contexts/ExpenseContext';

export const ExpenseList = () => {
  const { expenses } = useExpense();

  return (
    <div>
      <h2>Expense List</h2>
    </div>
  );
};
