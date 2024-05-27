// src/pages/Detail.jsx
import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateExpense, deleteExpense } from '../redux/expenseSlice';
import { useExpenseContext } from '../context/ExpenseContext';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ced4da;
`;

function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const expense = useSelector((state) => state.expense.expenses.find((e) => e.id === id));

  const dateRef = useRef(null);
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (expense) {
      dateRef.current.value = expense.date;
      itemRef.current.value = expense.item;
      amountRef.current.value = expense.amount;
      descriptionRef.current.value = expense.description;
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateExpense({
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value
    }));
    navigate('/');
  };

  const handleDelete = () => {
    dispatch(deleteExpense(id));
    navigate('/');
  };

  return (
    <Container>
      <h2>지출 수정</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>날짜</InputLabel>
          <InputField type="text" name="date" ref={dateRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>항목</InputLabel>
          <InputField type="text" name="item" ref={itemRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>금액</InputLabel>
          <InputField type="text" name="amount" ref={amountRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>내용</InputLabel>
          <InputField type="text" name="description" ref={descriptionRef} />
        </InputGroup>
        <button type="submit">수정</button>
        <button type="button" onClick={handleDelete}>삭제</button>
        <button type="button" onClick={() => navigate('/')}>뒤로 가기</button>
      </form>
    </Container>
  );
}

export default Detail;
