
import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Token = () => {
  const [userData, setUserData] = useState(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get('Token');

    if (token) {
      setCookie('Token', token); 
      try {
        const decoded = jwt_decode(token);
        const { email, role } = decoded;

        setUserData({ email, role });

        // Fetch user data from the API to check if the email exists
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
      }
    } else {
      console.log('Không có token trong URL');
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

// Helper function to remove a cookie
const removeCookie = (name) => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
};

// Login function to set token cookie
const Login = (token) => {
  if (token) {
    setCookie('Token', token); // Set the token in the cookie
    console.log('Đăng nhập thành công!');
  }
};

// Logout function to clear token cookie
const Logout = () => {
  removeCookie('Token'); // Clear the token from the cookie
  console.log('Đã đăng xuất!');
};

// Component to display user info
const UserInfo = ({ email, role }) => (
  <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '5px', maxWidth: '300px', margin: '20px auto' }}>
    <h3>Thông tin người dùng</h3>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Vai trò:</strong> {role}</p>
  </div>
);

export { Login, Logout };
export default Token;
