import { useState } from 'react';
import { useExpense } from '../contexts/ExpenseContext';

export const ExpenseForm = () => {
  const { addExpense } = useExpense();
  const [formData, setFormData] = useState({
    date: '',
    item: '',
    amount: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.date || !formData.item || !formData.amount) {
      alert('Please fill in all fields');
      return;
    }
    addExpense(formData);
    setFormData({
      date: '',
      item: '',
      amount: '',
      description: ''
    });
  };

  return (
    <div>
      <h2>Expense Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Date:</label>
          <input type="text" name="date" value={formData.date} onChange={handleChange} />
        </div>
        <div>
          <label>Item:</label>
          <input type="text" name="item" value={formData.item} onChange={handleChange} />
        </div>
        <div>
          <label>Amount:</label>
          <input type="text" name="amount" value={formData.amount} onChange={handleChange} />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
};
