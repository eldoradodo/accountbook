
import { useParams } from 'react-router-dom';

export const Detail = () => {
  const { id } = useParams();

  return (
    <div>
      <h2>Detail Page</h2>
      <p>Expense ID: {id}</p>
      {/* Add additional details about the expense */}
    </div>
  );
};
