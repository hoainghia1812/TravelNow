
// import React, { useEffect, useState } from 'react';
// import { Col, Container, Row, Card, CardBody, Input } from 'reactstrap';
// import axios from 'axios';
// import '../styles/tour.css';
// import { useNavigate } from "react-router-dom";
// import { FaBuilding } from "react-icons/fa"; 

// const QlDatTour = () => {
//   const [toursData, setToursData] = useState([]); 
//   const [filteredTours, setFilteredTours] = useState([]); // Trạng thái cho danh sách tour đã lọc
//   const [companies, setCompanies] = useState({});
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState(""); // Trạng thái cho từ khóa tìm kiếm
//   const navigate = useNavigate();

//   const handleSubmit = (maTour) => {
//     console.log("Mã tour đang gửi:", maTour);
//     navigate(`/tours/${maTour}`); 
//   };

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
//         setToursData(response.data); 
//         setFilteredTours(response.data); // Gán dữ liệu ban đầu vào danh sách đã lọc
//       } catch (err) {
//         setError(err); 
//       }
//     };

//     const fetchCTyTour = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour');
//         const companyData = {};
//         response.data.forEach(company => {
//           companyData[company.maCongTy] = company.tenCongTy;
//         });
//         setCompanies(companyData);
//       } catch (err) {
//         setError(err); 
//       }
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       await Promise.all([fetchTours(), fetchCTyTour()]);
//       setLoading(false);
//     };

//     fetchData(); 
//   }, []);

//   const handleSearch = (e) => {
//     const keyword = e.target.value.toLowerCase(); 
//     setSearchTerm(keyword);
//     if (keyword === "") {
//       setFilteredTours(toursData); // Nếu không nhập, hiển thị tất cả
//     } else {
//       const filtered = toursData.filter(tour => 
//         tour.tenTour.toLowerCase().includes(keyword)
//       );
//       setFilteredTours(filtered);
//     }
//   };

//   if (loading) return <div>Đang tải dữ liệu...</div>; 
//   if (error) return <div>Lỗi: {error.message}</div>; 

//   return (
//     <Container>
//       {/* Thanh tìm kiếm */}
//       <Row className="mb-3">
//         <Col lg="12">
//           <Input
//             type="text"
//             placeholder="Tìm kiếm tour theo tên..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </Col>
//       </Row>

//       {/* Hiển thị danh sách tour */}
//       <Row>
//         <Col lg="12">
//           <Row>
//             {filteredTours.length > 0 ? (
//               filteredTours.map((tour, index) => (
//                 <Col md="3" key={index}>
//                   <TourCard tour={tour} companies={companies} onTourClick={handleSubmit} />
//                 </Col>
//               ))
//             ) : (
//               <div className="text-center w-100">
//                 Không có tour nào hợp lệ.
//               </div>
//             )}
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// const TourCard = ({ tour, companies, onTourClick }) => {
//   const {
//     tenTour: name,
//     hinhAnh: image_url,
//     thoiGianTour: time,
//     maCongTy, 
//     maTour,
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
//         <CardBody className="d-flex flex-column tour__content">
//           <div className="tour__location">
//             <span className="tour__company" title={companies[maCongTy] || 'Không xác định'}>
//               <FaBuilding />
//               <span>{companies[maCongTy] || 'Không xác định'}</span>
//             </span>
//           </div>
//           <h5 className="tour__title">
//             <span className="tour__info" title={`${name} - ${time}`}>
//               {`${name} - ${time}`}
//             </span>
//           </h5>
//           <button className="btn-detail mt-1" onClick={() => onTourClick(maTour)}>
//             Xem Chi Tiết
//           </button>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default QlDatTour;
// import React, { useEffect, useState } from 'react';
// import { Col, Container, Row, Card, CardBody, Input } from 'reactstrap';
// import axios from 'axios';
// import '../styles/tour.css';
// import { useNavigate } from "react-router-dom";
// import { FaBuilding } from "react-icons/fa";

// const QlDatTour = () => {
//   const [toursData, setToursData] = useState([]);
//   const [filteredTours, setFilteredTours] = useState([]);
//   const [companies, setCompanies] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (maTour) => {
//     console.log("Mã tour đang gửi:", maTour);
//     navigate(`/tours/${maTour}`);
//   };

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
//         setToursData(response.data);
//         setFilteredTours(response.data);
//       } catch (err) {
//         setError(err);
//       }
//     };

//     const fetchCTyTour = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour');
//         const companyData = {};
//         response.data.forEach(company => {
//           companyData[company.maCongTy] = company.tenCongTy;
//         });
//         setCompanies(companyData);
//       } catch (err) {
//         setError(err);
//       }
//     };

//     const fetchData = async () => {
//       setLoading(true);
//       await Promise.all([fetchTours(), fetchCTyTour()]);
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleSearch = (e) => {
//     const keyword = e.target.value.toLowerCase();
//     setSearchTerm(keyword);
//     if (keyword === "") {
//       setFilteredTours(toursData);
//     } else {
//       const filtered = toursData.filter(tour =>
//         tour.tenTour.toLowerCase().includes(keyword)
//       );
//       setFilteredTours(filtered);
//     }
//   };

//   if (loading) return <div>Đang tải dữ liệu...</div>;
//   if (error) return <div>Lỗi: {error.message}</div>;

//   return (
//     <Container>
//       {/* Thanh tìm kiếm */}
//       <Row className="mb-3">
//         <Col lg="12">
//           <Input
//             type="text"
//             placeholder="Tìm kiếm tour theo tên..."
//             value={searchTerm}
//             onChange={handleSearch}
//           />
//         </Col>
//       </Row>

//       {/* Hiển thị danh sách tour */}
//       <Row>
//         <Col lg="12">
//           <Row>
//             {filteredTours.length > 0 ? (
//               filteredTours.map((tour, index) => (
//                 <Col md="3" key={index}>
//                   <TourCard tour={tour} companies={companies} onTourClick={handleSubmit} />
//                 </Col>
//               ))
//             ) : (
//               <div className="text-center w-100">
//                 Không có tour nào hợp lệ.
//               </div>
//             )}
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// const TourCard = ({ tour, companies, onTourClick }) => {
//   const {
//     tenTour: name,
//     hinhAnh: image_url,
//     thoiGianTour: time,
//     maCongTy,
//     maTour,
//   } = tour;

//   const defaultImage = "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

//   const handleApprove = async () => {
//     try {
//       await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/approve/${maTour}`);
//       alert(`Tour "${name}" đã được duyệt thành công!`);
//     } catch (error) {
//       alert(`Không thể duyệt tour: ${error.message}`);
//     }
//   };

//   const handleDelete = async () => {
//     if (window.confirm(`Bạn có chắc chắn muốn xóa tour "${name}"?`)) {
//       try {
//         await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/delete/${maTour}`);
//         alert(`Tour "${name}" đã bị xóa!`);
//         // Có thể thêm logic để cập nhật lại danh sách tour nếu cần
//       } catch (error) {
//         alert(`Không thể xóa tour: ${error.message}`);
//       }
//     }
//   };

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
//         <CardBody className="d-flex flex-column tour__content">
//           <div className="tour__location">
//             <span className="tour__company" title={companies[maCongTy] || 'Không xác định'}>
//               <FaBuilding />
//               <span>{companies[maCongTy] || 'Không xác định'}</span>
//             </span>
//           </div>
//           <h5 className="tour__title">
//             <span className="tour__info" title={`${name} - ${time}`}>
//               {`${name} - ${time}`}
//             </span>
//           </h5>
//           <div className="mt-auto d-flex justify-content-between">
//             <button className="btn-approve" onClick={handleApprove}>
//               Duyệt
//             </button>
           
//             <button className="btn-delete" onClick={handleDelete}>
//               Xóa
//             </button>
//           </div>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default QlDatTour;
import React, { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardBody, Input } from 'reactstrap';
import axios from 'axios';
import '../styles/tour.css';
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa";

const QlDatTour = () => {
  const [toursData, setToursData] = useState([]);
  const [filteredTours, setFilteredTours] = useState([]);
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (maTour) => {
    console.log("Mã tour đang gửi:", maTour);
    navigate(`/tours/${maTour}`);
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
        setToursData(response.data);
        setFilteredTours(response.data);
      } catch (err) {
        setError(err);
      }
    };

    const fetchCTyTour = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour');
        const companyData = {};
        response.data.forEach(company => {
          companyData[company.maCongTy] = company.tenCongTy;
        });
        setCompanies(companyData);
      } catch (err) {
        setError(err);
      }
    };

    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTours(), fetchCTyTour()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const keyword = e.target.value.toLowerCase();
    setSearchTerm(keyword);
    if (keyword === "") {
      setFilteredTours(toursData);
    } else {
      const filtered = toursData.filter(tour =>
        tour.tenTour.toLowerCase().includes(keyword)
      );
      setFilteredTours(filtered);
    }
  };

  const handleApprove = (tour) => {
    // Cập nhật trạng thái duyệt cho tour mà không thay đổi trong database
    const updatedTours = toursData.map(t => 
      t.maTour === tour.maTour ? { ...t, isApproved: true } : t
    );
    setToursData(updatedTours);
    setFilteredTours(updatedTours.filter(t => !t.isApproved)); // Ẩn tour đã duyệt trên giao diện
    alert(`Tour "${tour.tenTour}" đã được duyệt thành công!`);
  };

  const handleDelete = (tour) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa tour "${tour.tenTour}"?`)) {
      // Cập nhật trạng thái xóa cho tour mà không thay đổi trong database
      const updatedTours = toursData.map(t => 
        t.maTour === tour.maTour ? { ...t, isDeleted: true } : t
      );
      setToursData(updatedTours);
      setFilteredTours(updatedTours.filter(t => !t.isDeleted)); // Ẩn tour đã xóa trên giao diện
      alert(`Tour "${tour.tenTour}" đã bị xóa!`);
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div>Lỗi: {error.message}</div>;

  return (
    <Container>
      {/* Thanh tìm kiếm */}
      <Row className="mb-3">
        <Col lg="12">
          <Input
            type="text"
            placeholder="Tìm kiếm tour theo tên..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </Col>
      </Row>

      {/* Hiển thị danh sách tour */}
      <Row>
        <Col lg="12">
          <Row>
            {filteredTours.length > 0 ? (
              filteredTours.map((tour, index) => (
                <Col md="3" key={index}>
                  <TourCard 
                    tour={tour} 
                    companies={companies} 
                    onTourClick={handleSubmit} 
                    onApprove={() => handleApprove(tour)} 
                    onDelete={() => handleDelete(tour)} 
                  />
                </Col>
              ))
            ) : (
              <div className="text-center w-100">
                Không có tour nào hợp lệ.
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const TourCard = ({ tour, companies, onTourClick, onApprove, onDelete }) => {
  const {
    tenTour: name,
    hinhAnh: image_url,
    thoiGianTour: time,
    maCongTy,
    maTour,
    isApproved,
    isDeleted,
  } = tour;

  const defaultImage = "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

  return !isDeleted ? (  // Kiểm tra nếu tour bị xóa thì không render
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
        <CardBody className="d-flex flex-column tour__content">
          <div className="tour__location">
            <span className="tour__company" title={companies[maCongTy] || 'Không xác định'}>
              <FaBuilding />
              <span>{companies[maCongTy] || 'Không xác định'}</span>
            </span>
          </div>
          <h5 className="tour__title">
            <span className="tour__info" title={`${name} - ${time}`}>
              {`${name} - ${time}`}
            </span>
          </h5>
          <div className="mt-auto d-flex justify-content-between">
            {!isApproved && (  // Kiểm tra nếu tour chưa duyệt thì mới hiển thị nút duyệt
              <button className="btn-approve" onClick={onApprove}>
                Duyệt
              </button>
            )}
            <button className="btn-delete" onClick={onDelete}>
              Xóa
            </button>
          </div>
        </CardBody>
      </Card>
    </div>
  ) : null;  // Nếu là tour đã bị xóa thì không render
};

export default QlDatTour;
