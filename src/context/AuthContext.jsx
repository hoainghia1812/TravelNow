// // AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from 'react';
// import Cookies from 'js-cookie';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);

//   // Lấy token từ cookie nếu có
//   const fetchTokenFromCookie = () => {
//     const savedToken = Cookies.get('authToken');
//     if (savedToken) {
//       setToken(savedToken);
//       decodeToken(savedToken);
//       con
//     }
//   };

//   // Giải mã token để lấy thông tin người dùng
//   const decodeToken = (token) => {
//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       setUser({
//         username: payload.username,
//         email: payload.email,
        
//       });
//       console.log(payload);
//     } catch (error) {
//       console.error('Error decoding token:', error);
//     }
//   };

//   useEffect(() => {
//     fetchTokenFromCookie();
//   }, []);

//   // Hàm đăng nhập
//   const login = (token) => {
//     Cookies.set('authToken', token);  // Lưu token vào cookie
//     setToken(token);
//     decodeToken(token);
//   };

//   // Hàm đăng xuất
//   const logout = () => {
//     Cookies.remove('authToken');  // Xóa token khỏi cookie
//     setToken(null);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Hook tùy chỉnh để sử dụng AuthContext trong các component khác
// export const useAuth = () => useContext(AuthContext);

// AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // setUser được khai báo tại đây

  // Lấy token từ cookie nếu có
  const fetchTokenFromCookie = () => {
    const savedToken = Cookies.get('authToken');
    if (savedToken) {
      setToken(savedToken);
      decodeToken(savedToken);
      console.log(savedToken);
    }
  };

  // Giải mã token để lấy thông tin người dùng
  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        username: payload.username,
        email: payload.email,
      });
      console.log(payload);
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  useEffect(() => {
    fetchTokenFromCookie();
  }, []);

  // Hàm đăng nhập
  const login = (token) => {
    Cookies.set('authToken', token);  
    setToken(token);
    decodeToken(token);
  };

  // Hàm đăng xuất
  const logout = () => {
    localStorage.removeItem('Token'); // Xóa token khỏi localStorage
    setUserData(null); // Xóa dữ liệu người dùng khỏi state
    navigate('/home'); // Điều hướng về trang đăng nhập
  };
  

  return (
    <AuthContext.Provider value={{ token, user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook tùy chỉnh để sử dụng AuthContext trong các component khác
export const useAuth = () => useContext(AuthContext);
