import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { ConfigProvider } from 'antd';
import en_US from 'antd/lib/locale-provider/en_US';
import 'moment/locale/en-gb';

// LocalProvider thư viện Ant Design, 
// hỗ trợ build theo các ngôn ngữ của từng vùng
ReactDOM.render(
    <ConfigProvider locale={en_US}>
        <App />
    </ConfigProvider>,
    document.getElementById('root')
);
