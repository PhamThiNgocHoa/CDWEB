import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom'; // Import BrowserRouter
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Router> {/* Bao bọc App trong Router */}
            <App/>
        </Router>
    </React.StrictMode>
);

// Nếu bạn muốn đo lường hiệu suất trong ứng dụng của mình, truyền một hàm
// để ghi kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm cuối phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
