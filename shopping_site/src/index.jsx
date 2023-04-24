import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhcn from 'antd/locale/zh_CN'
import 'antd/dist/reset.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ConfigProvider locale={zhcn}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ConfigProvider>
);

