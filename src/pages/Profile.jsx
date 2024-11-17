import React, { useState, useEffect } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    sdtNguoiDung: "",
    gioiTinh: "",
    hoVaTen: "",
    diaChi: "",
    email: "",
    ngaySinh: "",
  });

  useEffect(() => {
    // Lấy thông tin người dùng từ localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.profileCard}>
        <div style={styles.header}>
          <div style={styles.avatarContainer}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqj7XboXrIXnzLd5Gh9gC5Oc2ICFZ8cDHYA&s"
              alt="User Avatar"
              style={styles.avatar}
            />
          </div>
          <h1 style={styles.name}>{user.hoVaTen}</h1>
        </div>
        <div style={styles.body}>
          {[
            { label: "Số Điện Thoại", value: user.sdtNguoiDung },
            { label: "Giới Tính", value: user.gioiTinh },
            { label: "Ngày Sinh", value: user.ngaySinh },
            { label: "Địa Chỉ", value: user.diaChi },
            { label: "Email", value: user.email },
          ].map((item, index) => (
            <div style={styles.infoRow} key={index}>
              <span style={styles.label}>{item.label}:</span>
              <span style={styles.value}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    padding: "20px",
  },
  profileCard: {
    width: "420px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    fontFamily: "'Roboto', sans-serif",
  },
  header: {
    textAlign: "center",
    padding: "30px 20px",
    background: "#007bff",
    color: "#fff",
    borderTopLeftRadius: "20px",
    borderTopRightRadius: "20px",
  },
  avatarContainer: {
    marginBottom: "15px",
  },
  avatar: {
    width: "100px",
    height: "100px",
    borderRadius: "50%",
    border: "4px solid #fff",
    objectFit: "cover",
  },
  name: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "5px",
  },
  body: {
    padding: "25px 30px",
    backgroundColor: "#fff",
    borderBottomLeftRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    paddingBottom: "10px",
    borderBottom: "1px solid #f1f1f1",
  },
  label: {
    fontWeight: "500",
    color: "#333",
    fontSize: "16px",
  },
  value: {
    fontSize: "16px",
    color: "#007bff",
    fontWeight: "500",
  },
};

export default Profile;
