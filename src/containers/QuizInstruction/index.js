import Axios from 'axios';
import React from 'react';
import { useHistory, Link, Redirect } from 'react-router-dom';
import Header from '../../components/Header';
import { API_ROOT_URL } from '../../configurations';

const QuizInstruction = () => {
  const history = useHistory();
  const handleClick = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const name = localStorage.getItem('name');
    const studentID = localStorage.getItem('studentID');
    try {
      const response = await Axios({
        method: 'GET',
        url: `${API_ROOT_URL}/user/start`,
        params: {
          token: token,
          studentID: studentID,
          name: name,
        },
      });
      if (response.data.success) {
        // redirect to Quiz page
        localStorage.setItem(
          'questions',
          JSON.stringify(response.data.data.questions)
        );
        let path = `/quiz`;
        history.push(path);
      }
    } catch (err) {
      if (err.response.status === 403) {
        console.log('wrong');
        let path = '/quiz-summary';
        console.log(history);
        history.push(path);
      } else if (err.response.status === 400) {
        localStorage.removeItem('token');
        localStorage.removeItem('studentID');
        localStorage.removeItem('name');
        let path = '/invalid-token';
        history.push(path);
      }
    }
  };
  return (
    <div>
      <Header />
      <div className='instructions'>
        <h1>Cách chơi</h1>
        <h3>Đọc kĩ hướng dẫn trước khi sử dụng.</h3>
        <ul className='browser-default' id='main-list'>
          <li>
            Các bạn có tổng cộng 10 câu hỏi, được xếp theo mức độ từ dễ đến khó.
          </li>
          <li>
            Mỗi câu hỏi có 4 lựa chọn, bạn có thể sửa câu trả lời bằng cách quay
            trở lại câu hỏi đó.
          </li>
          <li>Thời gian làm bài được tính khi bạn ấn nút Bắt đầu.</li>
          <li>Mỗi bạn chỉ được 1 lần làm quiz.</li>
        </ul>
        <div>
          <button className='start-button' onClick={handleClick}>
            Bắt đầu
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizInstruction;