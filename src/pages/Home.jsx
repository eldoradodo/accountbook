import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import fakeData from '../fakeData.json';

const Banner = styled.div`
  background-color: #007bff;
  color: white;
  padding: 20px;
  text-align: center;
`;

const Header = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
`;

const MonthTab = styled.button`
  background-color: ${({ $active }) => ($active ? '#007bff' : 'transparent')};
  color: ${({ $active }) => ($active ? 'white' : 'black')};
  border: none;
  padding: 10px 20px;
  margin: 0 5px;
  cursor: pointer;
  font-size: 16px;
`;

const ListItem = styled.div`
  border: 1px solid #ced4da;
  padding: 10px;
  margin-bottom: 10px;
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

const Home = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    item: '',
    amount: '',
    description: ''
  });
  const [expenses, setExpenses] = useState(fakeData); // fakeData로 초기화

  const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.date || !formData.amount || Number(formData.amount) <= 0) {
      alert('날짜와 금액은 필수 입력값이며, 금액은 0보다 큰 값을 입력해야 합니다.');
      return;
    }

    const id = uuidv4();

    // 새로운 지출 내역 추가
    const newExpense = {
      id,
      ...formData
    };

    setExpenses([...expenses, newExpense]);

    // 입력폼 초기화
    setFormData({
      date: '',
      item: '',
      amount: '',
      description: ''
    });
  };

  return (
    <div>
      <Banner>
        <h1>Account Book</h1>
        <p>월별 지출을 확인해보세요.</p>
      </Banner>
      <Header>
        <div>
          {months.map((month, index) => (
            <MonthTab key={index} $active={selectedMonth === month} onClick={() => handleMonthClick(month)}>
              {month}
            </MonthTab>
          ))}
        </div>
      </Header>
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>날짜</InputLabel>
            <InputField type="text" placeholder='2024-01-01' name="date" value={formData.date} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <InputLabel>항목</InputLabel>
            <InputField type="text" placeholder='항목을 입력해주세요.' name="item" value={formData.item} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <InputLabel>금액</InputLabel>
            <InputField type="text" placeholder='0이상의 금액을 입력해주세요.' name="amount" value={formData.amount} onChange={handleChange} />
          </InputGroup>
          <InputGroup>
            <InputLabel>내용</InputLabel>
            <InputField type="text" placeholder='내용을 입력해주세요.' name="description" value={formData.description} onChange={handleChange} />
          </InputGroup>
          <button type="submit">지출 등록</button>
        </form>
      </div>
      {expenses.map((item) => (
        <ListItem key={item.id}>
          <Link to={`/detail/${item.id}`}>
            <p>날짜: {item.date}</p>
            <p>항목: {item.item}</p>
            <p>금액: {item.amount}</p>
            <p>내용: {item.description}</p>
          </Link>
        </ListItem>
      ))}
    </div>
  );
}

export default Home;
