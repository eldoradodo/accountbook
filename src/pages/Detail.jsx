import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateExpense, deleteExpense } from '../redux/expenseSlice';

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
  const expense = useSelector(state => state.expense.expenses.find(expense => expense.id === id));
  const [formData, setFormData] = useState({});

  const dateRef = useRef(null);
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    }
  }, [expense]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 수정된 데이터를 업데이트하는 로직
    dispatch(updateExpense(formData));
    navigate('/');
  };

  const handleDelete = () => {
    // 삭제 로직
    dispatch(deleteExpense(id));
    navigate('/');
  };

  const handleChange = () => {
    // Form 데이터 변경 처리
    setFormData({
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value
    });
  };

  return (
    <Container>
      <h2>지출 수정</h2>
      <form onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>날짜</InputLabel>
          <InputField type="text" name="date" defaultValue={formData.date} ref={dateRef} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <InputLabel>항목</InputLabel>
          <InputField type="text" name="item" defaultValue={formData.item} ref={itemRef} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <InputLabel>금액</InputLabel>
          <InputField type="text" name="amount" defaultValue={formData.amount} ref={amountRef} onChange={handleChange} />
        </InputGroup>
        <InputGroup>
          <InputLabel>내용</InputLabel>
          <InputField type="text" name="description" defaultValue={formData.description} ref={descriptionRef} onChange={handleChange} />
        </InputGroup>
        <button type="submit">수정</button>
        <button type="button" onClick={handleDelete}>삭제</button>
        <button type="button" onClick={() => navigate('/')}>뒤로 가기</button>
      </form>
    </Container>
  );
}

export default Detail;
