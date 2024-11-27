// // import { useEffect, useState } from 'react';
// // import { Col, Container, Row, Card, CardBody } from 'reactstrap';
// // import axios from 'axios';
// // import '../styles/tour.css';
// // import { useNavigate } from "react-router-dom";
// // import { FaBuilding } from "react-icons/fa"; 
// // const Tour = () => {
// //   const [toursData, setToursData] = useState([]); 
// //   const [companies, setCompanies] = useState({}); // Trạng thái để lưu tên công ty
// //   const [loading, setLoading] = useState(true); 
// //   const [error, setError] = useState(null);
// //   const navigate = useNavigate();

// //   const handleSubmit = (maTour) => {
// //     console.log("Mã tour đang gửi:", maTour);
// //     navigate(`/tours/${maTour}`); 
// //   };

// //   useEffect(() => {
// //     const fetchTours = async () => {
// //       try {
// //         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
// //         setToursData(response.data); 
// //       } catch (err) {
// //         setError(err); 
// //       }
// //     };

// //     const fetchCTyTour = async () => {
// //       try {
// //         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour'); // Đường dẫn API lấy danh sách công ty
// //         const companyData = {};
// //         response.data.forEach(company => {
// //           companyData[company.maCongTy] = company.tenCongTy; // Giả sử mỗi công ty có maCongTy và tenCongTy
// //         });
// //         setCompanies(companyData);
// //       } catch (err) {
// //         setError(err); 
// //       }
// //     };

// //     const fetchData = async () => {
// //       setLoading(true);
// //       await Promise.all([fetchTours(), fetchCTyTour()]);
// //       setLoading(false);
// //     };

// //     fetchData(); 
// //   }, []);

// //   if (loading) return <div>Đang tải dữ liệu...</div>; 
// //   if (error) return <div>Lỗi: {error.message}</div>; 

// //   return (
// //     <Container>
// //       <Row>
// //         <Col lg="12">
// //           <Row>
// //             {toursData.map((tour, index) => (
// //               <Col md="3" key={index}>
// //                 <TourCard tour={tour} companies={companies} onTourClick={handleSubmit} />
// //               </Col>
// //             ))}
// //           </Row>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // const TourCard = ({ tour, companies, onTourClick }) => {
// //   const {
// //     tenTour: name,
// //     hinhAnh: image_url,
// //     thoiGianTour: time,
// //     maCongTy, 
// //     maTour,
// //   } = tour; 

// //   const defaultImage = "https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg";

// //   return (
// //     <div className="tour__card">
// //   <Card>
// //     <div className="tour__img">
// //       <img
// //         src={image_url || defaultImage}
// //         alt={name}
// //         onError={(e) => {
// //           e.target.onerror = null;
// //           e.target.src = defaultImage;
// //         }}
// //       />
// //     </div>
// //     <CardBody className="d-flex flex-column tour__content">
// //       <div className="tour__location">
// //        <span className="tour__company" title={companies[maCongTy] || 'Không xác định'}>
// //          <FaBuilding />
// //          <span>{companies[maCongTy] || 'Không xác định'}</span>
// //        </span>

// //       </div>
// //       <h5 className="tour__title">
// //   <span className="tour__info" title={`${name} - ${time}`}>
// //     {`${name} - ${time}`}
// //   </span>
// // </h5>


// //       <button className="btn-detail mt-1 " onClick={() => onTourClick(maTour)}>
// //         Xem Chi Tiết
// //       </button>
// //     </CardBody>
// //   </Card>
// // </div>

// //   );
// // };

// // export default Tour;
// import { useEffect, useState } from 'react';
// import { Col, Container, Row, Card, CardBody } from 'reactstrap';
// import axios from 'axios';
// import '../styles/tour.css';
// import { useNavigate } from "react-router-dom";
// import { FaBuilding } from "react-icons/fa"; 

// const Tour = () => {
//   const [toursData, setToursData] = useState([]); 
//   const [companies, setCompanies] = useState({});
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleSubmit = (maTour) => {
//     console.log("Mã tour đang gửi:", maTour);
//     navigate(`/tours/${maTour}`); 
//   };

//   useEffect(() => {
//     const fetchTours = async () => {
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
//         // Filter tours with "trangThai": "Còn hạn"
//         const filteredTours = response.data.filter(tour => tour.trangThai === "Còn hạn");
//         setToursData(filteredTours); 
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

//   if (loading) return <div>Đang tải dữ liệu...</div>; 
//   if (error) return <div>Lỗi: {error.message}</div>; 

//   return (
//     <Container>
//       <Row>
//         <Col lg="12">
//           <Row>
//             {toursData.map((tour, index) => (
//               <Col md="3" key={index}>
//                 <TourCard tour={tour} companies={companies} onTourClick={handleSubmit} />
//               </Col>
//             ))}
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
//           <button className="btn-detail mt-1 " onClick={() => onTourClick(maTour)}>
//             Xem Chi Tiết
//           </button>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default Tour;

import { useEffect, useState } from 'react';
import { Col, Container, Row, Card, CardBody, Input } from 'reactstrap';
import axios from 'axios';
import '../styles/tour.css';
import { useNavigate } from "react-router-dom";
import { FaBuilding } from "react-icons/fa"; 

const Tour = () => {
  const [toursData, setToursData] = useState([]); 
  const [filteredTours, setFilteredTours] = useState([]);
  const [companies, setCompanies] = useState({});
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (maTour) => {
    console.log("Mã tour đang gửi:", maTour);
    navigate(`/tours/${maTour}`); 
  };

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
        // Filter tours with "trangThai": "Còn hạn"
        const filteredTours = response.data.filter(tour => tour.trangThai === "Còn hạn");
        setToursData(filteredTours);
        setFilteredTours(filteredTours);
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

  useEffect(() => {
    const results = toursData.filter(tour =>
      tour.tenTour.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredTours(results);
  }, [searchTerm, toursData]);

  if (loading) return <div>Đang tải dữ liệu...</div>; 
  if (error) return <div>Lỗi: {error.message}</div>; 

  return (
    <Container>
      <Row>
        <Col lg="12">
          <Input
            type="text"
            placeholder="Tìm kiếm theo tên tour..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Row>
            {filteredTours.length > 0 ? (
              filteredTours.map((tour, index) => (
                <Col md="3" key={index}>
                  <TourCard tour={tour} companies={companies} onTourClick={handleSubmit} />
                </Col>
              ))
            ) : (
              <Col md="12">
                <div className="no-results">Hẹn bạn lần sau, chúng tôi vẫn chưa có tour này!</div>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

const TourCard = ({ tour, companies, onTourClick }) => {
  const {
    tenTour: name,
    hinhAnh: image_url,
    thoiGianTour: time,
    maCongTy, 
    maTour,
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
          <button className="btn-detail mt-1" onClick={() => onTourClick(maTour)}>
            Xem Chi Tiết
          </button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Tour;