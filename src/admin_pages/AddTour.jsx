// import { useState, useEffect } from "react";
// import { Col, Row, Card, CardBody, Container, Button } from "reactstrap";
// import axios from "axios";

// const AddTour = () => {
//   const [tourData, setTourData] = useState({
//     tenTour: "",
//     hinhAnh: "",
//     thoiGianTour: "",
//     trangThai: "",
//     maLoai: "",
//     maCongTy: "",
//   });

//   const [maLoaiList, setMaLoaiList] = useState([]);
//   const [maCongTyList, setMaCongTyList] = useState([]);

//   useEffect(() => {
//     const fetchMaLoai = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/category/LoaiTour');
//         setMaLoaiList(response.data);
//       } catch (error) {
//         console.error("Error fetching maLoai:", error);
//         // Hiển thị thông báo lỗi cho người dùng
//         alert("Không thể tải dữ liệu loại tour. Vui lòng thử lại sau.");
//       }
//     };
  
//     const fetchMaCongTy = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongTyTour');
//         setMaCongTyList(response.data);
//       } catch (error) {
//         console.error("Error fetching maCongTy:", error);
//         // Hiển thị thông báo lỗi cho người dùng
//         alert("Không thể tải dữ liệu công ty tour. Vui lòng thử lại sau.");
//       }
//     };
  
//     fetchMaLoai();
//     fetchMaCongTy();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setTourData({
//       ...tourData,
//       [name]: value === "" ? null : value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!tourData.tenTour || !tourData.hinhAnh || !tourData.thoiGianTour || !tourData.trangThai  ||  !tourData.maLoai || !tourData.maCongTy) {
//       alert("Vui lòng điền đầy đủ các trường bắt buộc.");
//       return;
//     }

//     // Lấy thời gian hiện tại ở Việt Nam
//     const currentDate = new Date();
//     const vietnamTime = new Date(currentDate.getTime() + (currentDate.getTimezoneOffset() + 420) * 60000).toISOString();

//     const dataToSubmit = {
//       maTour: "T01", // Có thể thay đổi nếu cần
//       tenTour: tourData.tenTour,
//       hinhAnh: tourData.hinhAnh,
//       thoiGianTour: tourData.thoiGianTour, // Lấy thời gian hiện tại
//       trangThai: tourData.trangThai,
//       thoiGianDang: vietnamTime, // Lấy thời gian hiện tại
//       maLoai: tourData.maLoai, // Mã loại đã chọn
//       maCongTy: tourData.maCongTy, // Mã công ty đã chọn
//     };

//     try {
//       const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour', dataToSubmit);
//       alert("Tour đã được thêm thành công!");
//       setTourData({
//         tenTour: "",
//         hinhAnh: "",
//         thoiGianTour: "",
//         trangThai: "",
//         maLoai: "",
//         maCongTy: "",
//       });
//     } catch (error) {
//       console.error("Error adding tour:", error.response?.data || error.message);
//       alert(`Đã xảy ra lỗi khi thêm tour: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   return (
//     <Container>
//       <Row>
//         <Col lg="8">
//           <div className="admin-container">
//             <h1>Thêm Tour Mới</h1>
//             <form className="admin-form" onSubmit={handleSubmit}>
//               <input
//                 type="text"
//                 name="tenTour"
//                 placeholder="Tên Tour"
//                 value={tourData.tenTour}
//                 onChange={handleInputChange}
//               />
//               <input
//                 type="text"
//                 name="thoiGianTour"
//                 placeholder="Thời gian tour"
//                 value={tourData.thoiGianTour}
//                 onChange={handleInputChange}
//               />

//               <input
//                 type="text"
//                 name="hinhAnh"
//                 placeholder="Hình ảnh (URL)"
//                 value={tourData.hinhAnh}
//                 onChange={handleInputChange}
//               />
              
//               <input
//                 type="text"
//                 name="trangThai"
//                 placeholder="Trạng thái"
//                 value={tourData.trangThai}
//                 onChange={handleInputChange}
//               />
//               <select name="maLoai" value={tourData.maLoai} onChange={handleInputChange}>
//                 <option value="">Chọn Mã Loại</option>
//                 {maLoaiList.map((loai) => (
//                   <option key={loai.maLoai} value={loai.maLoai}>
//                     {loai.tenLoai}
//                   </option>
//                 ))}
//               </select>
//               <select name="maCongTy" value={tourData.maCongTy} onChange={handleInputChange}>
//                 <option value="">Chọn Mã Công Ty</option>
//                 {maCongTyList.map((cty) => (
//                   <option key={cty.maCongTy} value={cty.maCongTy}>
//                     {cty.tenCongTy}
//                   </option>
//                 ))}
//               </select>
//               <Button color="primary" type="submit">
//                 Thêm Tour
//               </Button>
//             </form>
//           </div>
//         </Col>
//         <Col lg="4">
//           <h2>Xem trước</h2>
//           <TourCard tour={tourData} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// const TourCard = ({ tour }) => {
//   const {
//     tenTour: name,
//     hinhAnh: image_url,
//     trangThai: status,
//     thoiGianTour: duration,
//     phuongTienDiChuyen: transportation,
//     maCongTy: cttour,
//   } = tour;

//   const defaultImage = "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

//   return (
//     <div className="tour__card">
//       <Card>
//         <div className="tour__img">
//           <img
//             src={image_url || defaultImage}
//             alt={name}
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = defaultImage;
//             }}
//           />
//         </div>
//         <CardBody>
//           <h5 className="tour__title" style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>
//             {name || "Tên Tour"}
//           </h5>
//           <Row>
//             <Col md="6">
//               <p>
//                 <strong>Thời gian:</strong> {duration || "Thời gian"}
//               </p>
//               <p>
//                 <strong>Phương tiện:</strong> {transportation || "Phương tiện"}
//               </p>
//             </Col>
//             <Col md="6">
//               <p>
//                 <strong>Công ty Tour</strong> {cttour || "Công ty Tour"}
//               </p>
//               <p>
//                 <strong>Trạng thái:</strong> {status || "Trạng thái"}
//               </p>
//             </Col>
//           </Row>
         
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default AddTour;
  

import { useState, useEffect } from "react";
import { Col, Row, Card, CardBody, Container, Button } from "reactstrap";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS của react-toastify

const AddTour = () => {
  const [tourData, setTourData] = useState({
    tenTour: "",
    hinhAnh: "",
    thoiGianTour: "",
    trangThai: "",
    maLoai: "",
    maCongTy: "",
  });

  const [maLoaiList, setMaLoaiList] = useState([]);
  const [maCongTyList, setMaCongTyList] = useState([]);

  useEffect(() => {
    const fetchMaLoai = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/category/LoaiTour');
        setMaLoaiList(response.data);
      } catch (error) {
        console.error("Error fetching maLoai:", error);
        toast.error("Không thể tải dữ liệu loại tour. Vui lòng thử lại sau.");
      }
    };

    const fetchMaCongTy = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongTyTour');
        setMaCongTyList(response.data);
      } catch (error) {
        console.error("Error fetching maCongTy:", error);
        toast.error("Không thể tải dữ liệu công ty tour. Vui lòng thử lại sau.");
      }
    };

    fetchMaLoai();
    fetchMaCongTy();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({
      ...tourData,
      [name]: value === "" ? null : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tourData.tenTour || !tourData.hinhAnh || !tourData.thoiGianTour || !tourData.trangThai  ||  !tourData.maLoai || !tourData.maCongTy) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc.");
      return;
    }

    // Lấy thời gian hiện tại ở Việt Nam
    const currentDate = new Date();
    const vietnamTime = new Date(currentDate.getTime() + (currentDate.getTimezoneOffset() + 420) * 60000).toISOString();

    const dataToSubmit = {
      maTour: "T01", // Có thể thay đổi nếu cần
      tenTour: tourData.tenTour,
      hinhAnh: tourData.hinhAnh,
      thoiGianTour: tourData.thoiGianTour, // Lấy thời gian hiện tại
      trangThai: tourData.trangThai,
      thoiGianDang: vietnamTime, // Lấy thời gian hiện tại
      maLoai: tourData.maLoai, // Mã loại đã chọn
      maCongTy: tourData.maCongTy, // Mã công ty đã chọn
    };

    try {
      const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour', dataToSubmit);
      toast.success("Tour đã được thêm thành công!"); // Hiển thị thông báo thành công
      setTourData({
        tenTour: "",
        hinhAnh: "",
        thoiGianTour: "",
        trangThai: "",
        maLoai: "",
        maCongTy: "",
      });
    } catch (error) {
      console.error("Error adding tour:", error.response?.data || error.message);
      toast.error(`Đã xảy ra lỗi khi thêm tour: ${error.response?.data?.message || error.message}`); // Thông báo lỗi
    }
  };

  return (
    <Container>
      <ToastContainer /> {/* Thêm ToastContainer ở đây để hiển thị thông báo */}
      <Row>
        <Col lg="8">
          <div className="admin-container">
            <h1>Thêm Tour Mới</h1>
            <form className="admin-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="tenTour"
                placeholder="Tên Tour"
                value={tourData.tenTour}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="thoiGianTour"
                placeholder="Thời gian tour"
                value={tourData.thoiGianTour}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="hinhAnh"
                placeholder="Hình ảnh (URL)"
                value={tourData.hinhAnh}
                onChange={handleInputChange}
              />
              
              <input
                type="text"
                name="trangThai"
                placeholder="Trạng thái"
                value={tourData.trangThai}
                onChange={handleInputChange}
              />
              <select name="maLoai" value={tourData.maLoai} onChange={handleInputChange}>
                <option value="">Chọn Mã Loại</option>
                {maLoaiList.map((loai) => (
                  <option key={loai.maLoai} value={loai.maLoai}>
                    {loai.tenLoai}
                  </option>
                ))}
              </select>
              <select name="maCongTy" value={tourData.maCongTy} onChange={handleInputChange}>
                <option value="">Chọn Mã Công Ty</option>
                {maCongTyList.map((cty) => (
                  <option key={cty.maCongTy} value={cty.maCongTy}>
                    {cty.tenCongTy}
                  </option>
                ))}
              </select>
              <Button color="primary" type="submit">
                Thêm Tour
              </Button>
            </form>
          </div>
        </Col>
        <Col lg="4">
          <h2>Xem trước</h2>
          <TourCard tour={tourData} />
        </Col>
      </Row>
    </Container>
  );
};

const TourCard = ({ tour }) => {
  const {
    tenTour: name,
    hinhAnh: image_url,
    trangThai: status,
    thoiGianTour: duration,
    phuongTienDiChuyen: transportation,
    maCongTy: cttour,
  } = tour;

  const defaultImage = "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

  return (
    <div className="tour__card">
      <Card>
        <div className="tour__img">
          <img
            src={image_url || defaultImage}
            alt={name}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImage;
            }}
          />
        </div>
        <CardBody>
          <h5 className="tour__title" style={{ textAlign: "center", fontWeight: "bold", marginBottom: "1rem" }}>
            {name || "Tên Tour"}
          </h5>
          <Row>
            <Col md="6">
              <p>
                <strong>Thời gian:</strong> {duration || "Thời gian"}
              </p>
              <p>
                <strong>Phương tiện:</strong> {transportation || "Phương tiện"}
              </p>
            </Col>
            <Col md="6">
              <p>
                <strong>Công ty Tour</strong> {cttour || "Công ty Tour"}
              </p>
              <p>
                <strong>Trạng thái:</strong> {status || "Trạng thái"}
              </p>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddTour;


    