// import React from 'react';
// import { Card, CardBody, Row, Col } from 'reactstrap';

// const TourCard = ({ tour }) => {
//   const {
//     tenTour: name,
//     hinhAnh: image_url,
//     soLuong: slots,
//     trangThai: status,
//     thoiGianTour: duration,
//     noiDi: departure,
//     noiDen: destination,
//     moTaTour: description,
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
//               <p><strong>Nơi Đi:</strong> {departure || "Nơi Đi"}</p>
//               <p><strong>Nơi Đến:</strong> {destination || "Nơi Đến"}</p>
//               <p><strong>Thời gian:</strong> {duration || "Thời gian"}</p>
//             </Col>
//             <Col md="6">
//               <p><strong>Số lượng:</strong> {slots || "Số lượng"}</p>
//               <p><strong>Trạng thái:</strong> {status || "Trạng thái"}</p>
//             </Col>
//           </Row>
//           <p><strong>Mô tả:</strong> {description || "Mô tả"}</p>
//         </CardBody>
//       </Card>
//     </div>
//   );
// };

// export default TourCard;