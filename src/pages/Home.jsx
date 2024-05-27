// src/pages/Home.jsx
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useExpenseContext } from "../context/ExpenseContext";

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
  background-color: ${({ $active }) => ($active ? "#007bff" : "transparent")};
  color: ${({ $active }) => ($active ? "white" : "black")};
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

function Home() {
  // eslint-disable-next-line no-unused-vars
  const { state: expenses, dispatch } = useExpenseContext();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [formData, setFormData] = useState({
    date: "",
    item: "",
    amount: "",
    description: "",
  });

  const months = [
    "1월",
    "2월",
    "3월",
    "4월",
    "5월",
    "6월",
    "7월",
    "8월",
    "9월",
    "10월",
    "11월",
    "12월",
  ];

  const handleMonthClick = (month) => {
    setSelectedMonth(month);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateDate = (date) => {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      return "날짜는 YYYY-MM-DD 형식이어야 합니다.";
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "유효한 날짜를 입력하세요.";
    }
    return "";
  };

  const validateAmount = (amount) => {
    if (isNaN(amount)) {
      return "금액은 숫자여야 합니다.";
    }
    if (amount < 0) {
      return "금액은 0보다 작을 수 없습니다.";
    }
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    const dateError = validateDate(formData.date);
    const amountError = validateAmount(formData.amount);

    if (dateError || amountError) {
      // 유효성 검사 실패 시 alert 창으로 오류 메시지 표시
      if (dateError) {
        alert(dateError);
      }
      if (amountError) {
        alert(amountError);
      }
    } else {
      // 유효성 검사 통과 시 데이터를 처리하는 로직 추가 (예: 서버로 전송, 로컬 상태에 저장 등)
      const newExpense = {
        ...formData,
        id: uuidv4(), // UUID 라이브러리를 사용하여 고유한 ID 생성
      };

      console.log("폼 데이터 제출:", newExpense);

      // 제출 후 폼 초기화
      setFormData({
        date: "",
        item: "",
        amount: "",
        description: "",
      });

      // 새로 추가한 항목을 fakeData에 추가 (기존 fakeData는 임시 데이터이므로 업데이트 방식을 변경해야 할 수 있음)
      // fakeData.push(newExpense); // 이 부분은 상태 관리 방식에 따라 달라질 수 있습니다.
    }
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
            <MonthTab
              key={index}
              $active={selectedMonth === month}
              onClick={() => handleMonthClick(month)}
            >
              {month}
            </MonthTab>
          ))}
        </div>
      </Header>
      <div>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <InputLabel>날짜</InputLabel>
            <InputField
              type="text"
              placeholder="2024-01-01"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>항목</InputLabel>
            <InputField
              type="text"
              placeholder="항목을 입력해주세요."
              name="item"
              value={formData.item}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>금액</InputLabel>
            <InputField
              type="text"
              placeholder="0이상의 금액을 입력해주세요."
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup>
            <InputLabel>내용</InputLabel>
            <InputField
              type="text"
              placeholder="내용을 입력해주세요."
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </InputGroup>
          <button type="submit">지출 등록</button>
        </form>
      </div>
      {expenses.map((item, index) => (
        <ListItem key={index}>
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
