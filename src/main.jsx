// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'remixicon/fonts/remixicon.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// import { BrowserRouter } from 'react-router-dom';
// import AuthProvider from './context/AuthContext';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <AuthProvider>
//                 <App />
//             </AuthProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'remixicon/fonts/remixicon.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';  // Sử dụng named import cho AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthProvider>  {/* Đảm bảo AuthProvider bọc toàn bộ ứng dụng */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);
