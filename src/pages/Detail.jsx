import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import fakeData from '../fakeData.json';

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

  // 상태 관리를 위한 useState 훅 사용
  const [formData, setFormData] = useState({});
  const [expenses, setExpenses] = useState([]);

  const dateRef = useRef(null);
  const itemRef = useRef(null);
  const amountRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {

    const expense = fakeData.find(expense => expense.id === id);
    if (expense) {
      setFormData(expense);
    }
  }, [id]);

  // 수정 함수
  const handleUpdate = () => {
    const updatedData = {
      id,
      date: dateRef.current.value,
      item: itemRef.current.value,
      amount: amountRef.current.value,
      description: descriptionRef.current.value
    };

    // 기존의 expenses 배열에서 해당 id에 해당하는 지출 항목을 업데이트
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? updatedData : expense
    );

    // 업데이트된 expenses 배열로 상태 업데이트
    setExpenses(updatedExpenses);
    
    // 홈으로 이동
    navigate('/');
  };

  // 삭제 함수
  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      // 해당 id에 해당하는 지출 항목을 제외한 새로운 배열 생성
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      
      // 업데이트된 expenses 배열로 상태 업데이트
      setExpenses(updatedExpenses);
      
      // 홈으로 이동
      navigate('/');
    }
  };

  return (
    <Container>
      <h2>지출 수정</h2>
      <form onSubmit={handleUpdate}>
        <InputGroup>
          <InputLabel>날짜</InputLabel>
          <InputField type="text" name="date" defaultValue={formData.date} ref={dateRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>항목</InputLabel>
          <InputField type="text" name="item" defaultValue={formData.item} ref={itemRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>금액</InputLabel>
          <InputField type="text" name="amount" defaultValue={formData.amount} ref={amountRef} />
        </InputGroup>
        <InputGroup>
          <InputLabel>내용</InputLabel>
          <InputField type="text" name="description" defaultValue={formData.description} ref={descriptionRef} />
        </InputGroup>
        <button type="submit">수정</button>
        <button type="button" onClick={handleDelete}>삭제</button>
        <button type="button" onClick={() => navigate('/')}>뒤로 가기</button>
      </form>
    </Container>
  );
}

export default Detail;
