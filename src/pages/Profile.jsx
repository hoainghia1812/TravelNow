import { useState, useEffect } from "react";

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
// import { useState, useEffect } from "react";

// const Profile = () => {
//   const [user, setUser] = useState({
//     sdtNguoiDung: "",
//     gioiTinh: "",
//     hoVaTen: "",
//     diaChi: "",
//     email: "",
//     ngaySinh: "",
//   });

//   const [editMode, setEditMode] = useState(false); // Trạng thái chỉnh sửa
//   const [editedUser, setEditedUser] = useState(user);

//   useEffect(() => {
//     const userData = localStorage.getItem("user");
//     if (userData) {
//       const parsedUser = JSON.parse(userData);
//       setUser(parsedUser);
//       setEditedUser(parsedUser);
//     }
//   }, []);

//   const handleEdit = () => {
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     setEditedUser(user); // Khôi phục thông tin gốc
//     setEditMode(false);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch("https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/Nguoidung", {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editedUser),
//       });

//       if (response.ok) {
//         const updatedUser = await response.json();
//         setUser(updatedUser); // Cập nhật thông tin hiển thị
//         localStorage.setItem("user", JSON.stringify(updatedUser)); // Lưu lại vào localStorage
//         setEditMode(false);
//         alert("Thông tin đã được cập nhật thành công!");
//       } else {
//         alert("Cập nhật thất bại. Vui lòng thử lại.");
//       }
//     } catch (error) {
//       console.error("Lỗi:", error);
//       alert("Đã xảy ra lỗi. Vui lòng thử lại.");
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.profileCard}>
//         <div style={styles.header}>
//           <div style={styles.avatarContainer}>
//             <img
//               src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlqj7XboXrIXnzLd5Gh9gC5Oc2ICFZ8cDHYA&s"
//               alt="User Avatar"
//               style={styles.avatar}
//             />
//           </div>
//           <h1 style={styles.name}>{user.hoVaTen}</h1>
//         </div>
//         <div style={styles.body}>
//           {[
//             { label: "Số Điện Thoại", value: user.sdtNguoiDung, key: "sdtNguoiDung" },
//             { label: "Giới Tính", value: user.gioiTinh, key: "gioiTinh" },
//             { label: "Ngày Sinh", value: user.ngaySinh, key: "ngaySinh" },
//             { label: "Địa Chỉ", value: user.diaChi, key: "diaChi" },
//             { label: "Email", value: user.email, key: "email" },
//           ].map((item, index) => (
//             <div style={styles.infoRow} key={index}>
//               <span style={styles.label}>{item.label}:</span>
//               {editMode ? (
//                 <input
//                   style={styles.input}
//                   type="text"
//                   name={item.key}
//                   value={editedUser[item.key]}
//                   onChange={handleChange}
//                 />
//               ) : (
//                 <span style={styles.value}>{item.value}</span>
//               )}
//             </div>
//           ))}
//         </div>
//         <div style={styles.footer}>
//           {editMode ? (
//             <>
//               <button style={styles.saveButton} onClick={handleSave}>
//                 Lưu
//               </button>
//               <button style={styles.cancelButton} onClick={handleCancel}>
//                 Hủy
//               </button>
//             </>
//           ) : (
//             <button style={styles.editButton} onClick={handleEdit}>
//               Sửa
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     minHeight: "100vh",
//     backgroundColor: "#f5f5f5",
//   },
//   profileCard: {
//     backgroundColor: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//     width: "400px",
//   },
//   header: {
//     textAlign: "center",
//   },
//   avatarContainer: {
//     marginBottom: "10px",
//   },
//   avatar: {
//     width: "100px",
//     height: "100px",
//     borderRadius: "50%",
//     objectFit: "cover",
//   },
//   name: {
//     fontSize: "1.5rem",
//     margin: "10px 0",
//   },
//   body: {
//     marginTop: "20px",
//   },
//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginBottom: "10px",
//   },
//   label: {
//     fontWeight: "bold",
//   },
//   value: {
//     color: "#555",
//   },
//   input: {
//     width: "60%",
//     padding: "5px",
//     borderRadius: "4px",
//     border: "1px solid #ccc",
//   },
//   footer: {
//     marginTop: "20px",
//     textAlign: "center",
//   },
//   editButton: {
//     padding: "10px 20px",
//     backgroundColor: "#007bff",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
//   saveButton: {
//     padding: "10px 20px",
//     backgroundColor: "#28a745",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//     marginRight: "10px",
//   },
//   cancelButton: {
//     padding: "10px 20px",
//     backgroundColor: "#dc3545",
//     color: "#fff",
//     border: "none",
//     borderRadius: "4px",
//     cursor: "pointer",
//   },
// };

// export default Profile;
