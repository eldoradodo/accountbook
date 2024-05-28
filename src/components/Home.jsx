
import { ExpenseList } from './ExpenseList';
import { ExpenseForm } from './ExpenseForm';

export const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <ExpenseForm />
      <ExpenseList />
    </div>
  );
};
