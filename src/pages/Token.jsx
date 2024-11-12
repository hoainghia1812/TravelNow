

// import React, { useEffect, useState } from 'react';
// import jwt_decode from 'jwt-decode';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const Token = () => {
//   const [userData, setUserData] = useState(null);
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = searchParams.get('Token');

//     if (token) {
//       setCookie('Token', token); 
      
//       try {
//         const decoded = jwt_decode(token);
//         const { email, role } = decoded;

//         setUserData({ email, role });
        

//         // Fetch user data from the API to check if the email exists
//         axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung')
//           .then((response) => {
//             const users = response.data;
//             const userExists = users.some((user) => user.email === email);

//             if(role === 'partner'){
//               navigate('/dkct');
//             }else if (userExists) {
//               navigate('/login');
//             } else {
//               navigate('/register');
//             }
//           })
//           .catch((error) => {
//             console.error('Error fetching user data:', error.message);
//           });
          
        
//       } catch (error) {
//         console.error('Invalid token:', error.message);
//       }
//     } else {
//       console.log('Không có token trong URL');
//     }
//   }, [searchParams, navigate]);

//   return userData ? (
//     <UserInfo email={userData.email} role={userData.role} />
//   ) : (
//     <p>Loading...</p>
//   );
// };

// // Helper function to set a cookie
// const setCookie = (name, value, days = 1) => {
//   const expires = new Date();
//   expires.setDate(expires.getDate() + days);
//   document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
// };

// const UserInfo = ({ email, role }) => (
//   <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '300px', margin: '20px auto' }}>
//     <h3>Thông tin người dùng</h3>
//     <p><strong>Email:</strong> {email}</p>
//     <p><strong>Vai trò:</strong> {role}</p>
//   </div>
// );

// export default Token;

import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Token = () => {
  const [userData, setUserData] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('Token') || localStorage.getItem('Token'); // Lấy token từ URL hoặc từ localStorage

    if (token) {
      setCookie('Token', token);
      localStorage.setItem('Token', token); // Lưu token vào localStorage để duy trì trạng thái

      try {
        const decoded = jwt_decode(token);
        const { email, role } = decoded;
        setUserData({ email, role });

        // Fetch user data từ API để kiểm tra xem email có tồn tại không
        axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung')
          .then((response) => {
            const users = response.data;
            const userExists = users.some((user) => user.email === email);

            if (role === 'partner') {
              navigate('/dkct');
            } else if (userExists) {
              navigate('/login');
            } else {
              navigate('/register');
            }
          })
          .catch((error) => {
            console.error('Error fetching user data:', error.message);
          });
      } catch (error) {
        console.error('Invalid token:', error.message);
        localStorage.removeItem('Token'); // Xóa token nếu không hợp lệ
      }
    } else {
      console.log('Không có token trong URL hoặc localStorage');
    }
  }, [searchParams, navigate]);

  return userData ? (
    <UserInfo email={userData.email} role={userData.role} />
  ) : (
    <p>Loading...</p>
  );
};

// Helper function to set a cookie
const setCookie = (name, value, days = 1) => {
  const expires = new Date();
  expires.setDate(expires.getDate() + days);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// Component hiển thị thông tin người dùng
const UserInfo = ({ email, role }) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '300px', margin: '20px auto' }}>
    <h3>Thông tin người dùng</h3>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Vai trò:</strong> {role}</p>
  </div>
);

export default Token;
