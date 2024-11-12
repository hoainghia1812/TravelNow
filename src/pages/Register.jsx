
// import React, { useEffect, useState } from "react";
// import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
// import { Link, useNavigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";
// import axios from "axios";
// import userIcon from "../assets/images/user.png";
// import "../styles/login.css";

// const Đăng_Ký = () => {
//   const [thông_tin, setThông_tin] = useState({
//     số_điện_thoại: "",
//     tên: "",
//     giới_tính: "",
//     ngày_sinh: "",
//     địa_chỉ: "",
//     trạngThai: null,
//     role: "",
//   });

//   const [email, setEmail] = useState("");
//   const [role, setRole] = useState(0);
//   const [hoten, setHoten] = useState("");
//   const [ngaysinh, setNgaySinh] = useState(""); // Biến để lưu ngày sinh
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = new URLSearchParams(window.location.search).get("Token");
//     if (token) {
//       const decoded = jwt_decode(token);
//       console.log("Decoded token:", decoded);
  
//       setEmail(decoded.email || "");
//       setRole(decoded.role === "partner" ? 1 : 0);
  
//       // Lấy `firstName`, `lastName`, và `dob` từ token và gán vào các biến state
//       const fullName = `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim();
//       setHoten(fullName);
  
//       // Lấy và định dạng ngày sinh từ token
//       if (decoded.dob) {
//         const formattedDob = new Date(decoded.dob).toISOString().split("T")[0];
//         setNgaySinh(formattedDob); // Sử dụng hàm setNgaySinh để cập nhật ngày sinh
//       }
//     } else {
//       console.log("Không có token trong URL");
//     }
//   }, []);
  

//   const handleChange = (e) => {
//     if (e.target.id === "email") {
//       setEmail(e.target.value);
//     } else if (e.target.id === "tên") {
//       setHoten(e.target.value);
//     } else if (e.target.id === "ngày_sinh") {
//       setNgaySinh(e.target.value);
//     } else {
//       setThông_tin((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//     }
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!email) {
//       alert("Email không hợp lệ");
//       return;
//     }

//     const payload = {
//       sdtNguoiDung: thông_tin.số_điện_thoại,
//       gioiTinh: thông_tin.giới_tính,
//       hoVaTen: hoten,
//       diaChi: thông_tin.địa_chỉ,
//       ngaySinh: ngaysinh,
//       email: email.trim(),
//       role: role,
//       trạngThái: thông_tin.trạngThái,
//     };

//     console.log("Dữ liệu gửi đi:", JSON.stringify(payload, null, 2));

//     try {
//       await axios.post(
//         "https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung",
//         payload
//       );
//       alert("Đăng ký thành công!");
//       navigate("/login");
//     } catch (err) {
//       console.error("Lỗi khi gửi dữ liệu:", err.response?.data || err.message);
//       alert(
//         "Đăng ký thất bại: " + (err.response?.data || "Có lỗi khi gửi yêu cầu")
//       );
//     }
//   };

//   const ảnh_đăng_ký =
//     "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";

//   return (
//     <section>
//       <Container>
//         <Row>
//           <Col lg="8" className="m-auto">
//             <div className="login__container d-flex justify-content-between">
//               <div className="login__img">
//                 <img src={ảnh_đăng_ký} alt="" />
//               </div>
//               <div className="login__form">
//                 <div className="user">
//                   <img src={userIcon} alt="" />
//                 </div>
//                 <h2>Đăng Ký</h2>
//                 <Form onSubmit={handleClick}>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Họ và Tên"
//                       required
//                       id="tên"
//                       value={hoten} // Hiển thị họ và tên đầy đủ từ token
//                       onChange={handleChange}
//                       readOnly
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Số Điện Thoại"
//                       required
//                       id="số_điện_thoại"
//                       value={thông_tin.số_điện_thoại}
//                       pattern="^0[0-9]{9}$"
//                       title="Số điện thoại phải ở định dạng 0937195324"
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="email"
//                       placeholder="Gmail"
//                       required
//                       id="email"
//                       value={email}
//                       onChange={handleChange}
//                       readOnly
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <select
//                       required
//                       id="giới_tính"
//                       value={thông_tin.giới_tính}
//                       onChange={handleChange}
//                     >
//                       <option value="">Chọn Giới Tính</option>
//                       <option value="Nam">Nam</option>
//                       <option value="Nữ">Nữ</option>
//                     </select>
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="date"
//                       placeholder="Ngày Sinh"
//                       required
//                       id="ngày_sinh"
//                       value={ngaysinh} // Hiển thị ngày sinh từ token
//                       onChange={handleChange}
//                       readOnly
//                     />
//                   </FormGroup>
//                   <FormGroup>
//                     <input
//                       type="text"
//                       placeholder="Địa chỉ"
//                       required
//                       id="địa_chỉ"
//                       value={thông_tin.địa_chỉ}
//                       onChange={handleChange}
//                     />
//                   </FormGroup>
//                   <Button
//                     className="btn secondary__btn auth__btn"
//                     type="submit"
//                   >
//                     Tạo Tài Khoản
//                   </Button>
//                 </Form>
//                 <p>
//                   Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
//                 </p>
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </section>
//   );
// };

// export default Đăng_Ký;
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import userIcon from "../assets/images/user.png";
import "../styles/login.css";

const Đăng_Ký = () => {
  const [thông_tin, setThông_tin] = useState({
    số_điện_thoại: "",
    giới_tính: "",
    địa_chỉ: "",
    trạngThai: null,
  });

  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const [hoten, setHoten] = useState("");
  const [ngaysinh, setNgaySinh] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("Token");
    if (token) {
      const decoded = jwt_decode(token);
      console.log("Decoded token:", decoded);

      setEmail(decoded.email || "");
      setRole(decoded.role === "partner" ? 1 : 0);

      const fullName = `${decoded.firstName || ""} ${decoded.lastName || ""}`.trim();
      setHoten(fullName);

      if (decoded.dob) {
        const formattedDob = new Date(decoded.dob).toISOString().split("T")[0];
        setNgaySinh(formattedDob);
      }
    } else {
      console.log("Không có token trong cookie");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.id === "email") {
      setEmail(e.target.value);
    } else if (e.target.id === "tên") {
      setHoten(e.target.value);
    } else if (e.target.id === "ngày_sinh") {
      setNgaySinh(e.target.value);
    } else {
      setThông_tin((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Email không hợp lệ");
      return;
    }

    const payload = {
      sdtNguoiDung: thông_tin.số_điện_thoại,
      gioiTinh: thông_tin.giới_tính,
      hoVaTen: hoten,
      diaChi: thông_tin.địa_chỉ,
      ngaySinh: ngaysinh,
      email: email.trim(),
      role: role,
      trạngThái: thông_tin.trạngThái,
    };

    console.log("Dữ liệu gửi đi:", JSON.stringify(payload, null, 2));

    try {
      await axios.post(
        "https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung",
        payload
      );
      alert("Đăng ký thành công!");
      navigate("/login");
    } catch (err) {
      console.error("Lỗi khi gửi dữ liệu:", err.response?.data || err.message);
      alert("Đăng ký thất bại: " + (err.response?.data || "Có lỗi khi gửi yêu cầu"));
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const ảnh_đăng_ký = "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";

  return (
    <section>
      <Container>
        <Row>
          <Col lg="8" className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={ảnh_đăng_ký} alt="" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="" />
                </div>
                <h2>Đăng Ký</h2>
                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Họ và Tên"
                      required
                      id="tên"
                      value={hoten}
                      onChange={handleChange}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Số Điện Thoại"
                      required
                      id="số_điện_thoại"
                      value={thông_tin.số_điện_thoại}
                      pattern="^0[0-9]{9}$"
                      title="Số điện thoại phải ở định dạng 0937195324"
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="email"
                      placeholder="Gmail"
                      required
                      id="email"
                      value={email}
                      onChange={handleChange}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <select
                      required
                      id="giới_tính"
                      value={thông_tin.giới_tính}
                      onChange={handleChange}
                    >
                      <option value="">Chọn Giới Tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                    </select>
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="date"
                      placeholder="Ngày Sinh"
                      required
                      id="ngày_sinh"
                      value={ngaysinh}
                      onChange={handleChange}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      required
                      id="địa_chỉ"
                      value={thông_tin.địa_chỉ}
                      onChange={handleChange}
                    />
                  </FormGroup>
                  <Button className="btn secondary__btn auth__btn" type="submit">
                    Tạo Tài Khoản
                  </Button>
                </Form>
                <p>
                  Đã có tài khoản? <Link to="/login">Đăng Nhập</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Đăng_Ký;
