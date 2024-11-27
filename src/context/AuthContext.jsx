
import React, { createContext, useContext, useState, useEffect } from 'react';

// Khởi tạo context
const AuthContext = createContext();

// Provider để cung cấp giá trị context
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Kiểm tra xem có thông tin người dùng trong localStorage không
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));  // Phục hồi thông tin người dùng từ localStorage
        }
    }, []);

    // Cập nhật localStorage mỗi khi user thay đổi
    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user));  // Lưu trạng thái người dùng vào localStorage
        } else {
            localStorage.removeItem('user');  // Nếu không có user, xóa khỏi localStorage
        }
    }, [user]);

    // Hàm logout: Xóa user khỏi state và localStorage
    const logout = () => {
        setUser(null);  // Xóa dữ liệu người dùng khỏi state
        localStorage.removeItem('user');  // Xóa thông tin người dùng khỏi localStorage
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook để sử dụng context
export const useAuth = () => {
    return useContext(AuthContext);
};
