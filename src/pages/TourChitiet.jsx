
// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import XemLichTrinh from './XemLichTrinh';
// import "./TourChitiet.css";
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const TourChitiet = () => {
//   const { maTour } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [tourDetail, setTourDetail] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [showSchedule, setShowSchedule] = useState(false);
//   const [dongia, setgia] = useState(null);
//   const [maLoai, setMaLoai] = useState(null); // Thêm state để lưu maLoai

//   useEffect(() => {
//     const fetchTourDetail = async () => {
//       try {
//         // Lấy chi tiết tour
//         const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/tour/${maTour}`);
//         setTourDetail(response.data);
//         setgia(response.data.gia);

//         // Lấy maLoai từ API khác
//         const maLoaiResponse = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${maTour}`);
//         setMaLoai(maLoaiResponse.data.maLoai);  // Lưu giá trị maLoai vào state
//         console.log("Loại tour",maLoaiResponse.data.maLoai)

//         setLoading(false);
//       } catch (err) {
//         setError(err);
//         setLoading(false);
//       }
//     };
//     fetchTourDetail();
//   }, [maTour]);

//   // Hiển thị thông báo nếu đang tải hoặc có lỗi
//   if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
//   if (error) return <div className="error">Xin lỗi bạn tour này chúng chỉ mới dự định chứ chưa đưa vào hoạt động bạn có thể liên hệ qua hotline <span>0337987875</span>của chúng tôi để đặt tour này </div>;

//   if (!tourDetail) {
//     return (
//       <div className="not-found">
//         <h3>Không tìm thấy thông tin tour.</h3>
//         <p>Vui lòng kiểm tra lại mã tour và thử lại.</p>
//       </div>
//     );
//   }

//   const userInfo = JSON.parse(localStorage.getItem('user'));
//   const sdtNguoiDung = userInfo?.sdtNguoiDung || '';

//   const { 
//     gia, 
//     ngayDi, 
//     ngayVe, 
//     gioKhoiHanh, 
//     gioVe, 
//     khachSan, 
//     phuongTienDiChuyen, 
//     moTaTour, 
//     noiDi, 
//     noiDen 
//   } = tourDetail;

//   const handleDattour = async () => {
//     if (user) {
//       const bookingDetails = {
//         maPhieu: "PD01", // Tạm thời sử dụng mã giả
//         ngayDat: new Date().toISOString().split('T')[0], // Ngày đặt
//         donGia: dongia, // Sử dụng giá trị 'dongia' đã lấy từ tourDetail
//         soLuongNguoiDi: 0, // Cần cập nhật số lượng người đặt
//         voucher: "Chưa có", // Tạm thời đặt mặc định
//         trangThaiThanhToan: "Chưa thanh toán", // Trạng thái mặc định
//         trangThaiHuy: null, // Chưa hủy
//         sdtNguoiDung: sdtNguoiDung, // Số điện thoại người dùng
//         maTour: maTour, // Mã tour được truyền qua URL
//       };

//       try {
//         const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour', bookingDetails);
//         if (response.status >= 200 && response.status <= 204) {
//           const maPhieu = response.data.maPhieu;
//           toast.success("Đặt tour thành công!");
//           setTimeout(() => {
//             navigate(`/dattour/${maPhieu}?maLoai=${maLoai}`);
//           }, 500);
//         }
//       } catch (error) {
//         toast.error("Lỗi khi đặt tour: " + error.message);
//       }
//     } else {
//       toast.info(
//         <div>
//           <p>Bạn cần đăng nhập để đặt tour</p>
//           <div>
//             <button className="btn-login" onClick={() => navigate('/login')}>Đăng nhập</button>
//             <button className="btn-cancel" onClick={() => toast.dismiss()}>Hủy</button>
//           </div>
//         </div>,
//         {
//           position: "top-center",
//           autoClose: false,
//           closeOnClick: false,
//           draggable: false,
//           toastId: "loginToast",
//         }
//       );
//     }
//   };

//   return (
//     <div className="tourchitiet-container">
//       <div className="tour-banner">
//         <img src="" alt="Tour Banner" />
//       </div>
//       <h3 className="tour-title">Chi tiết Tour</h3>
//       <div className="tour-details">
//         <div className="tour-details-item"><strong>Nơi đi:</strong> {noiDi}</div>
//         <div className="tour-details-item"><strong>Nơi đến:</strong> {noiDen}</div>
//         <div className="tour-details-item"><strong>Ngày đi:</strong> {ngayDi}</div>
//         <div className="tour-details-item"><strong>Ngày về:</strong> {ngayVe}</div>
//         <div className="tour-details-item"><strong>Giờ khởi hành:</strong> {gioKhoiHanh}</div>
//         <div className="tour-details-item"><strong>Giờ về:</strong> {gioVe}</div>
//         <div className="tour-details-item"><strong>Khách sạn:</strong> {khachSan}</div>
//         <div className="tour-details-item"><strong>Phương tiện di chuyển:</strong> {phuongTienDiChuyen}</div>
//         <div className="tour-details-item"><strong>Giá:</strong> {gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
//         <div className="tour-details-item"><strong>Mô tả tour:</strong> {moTaTour}</div>
//       </div>

//       {/* Hiển thị maLoai */}
//       {maLoai && <div className="tour-details-item"><strong>Loại Tour:</strong> {maLoai}</div>}

//       <div className="view-schedule">
//         <button className="schedule-link" onClick={() => setShowSchedule(true)}>Xem lịch trình</button>
//       </div>
//       <div>
//         <button onClick={handleDattour}>
//           Đặt Tour
//         </button>
//       </div>

//       {showSchedule && (
//         <div className="modal-background">
//           <div className="modal-content">
//             <XemLichTrinh onClose={() => setShowSchedule(false)} maTour={maTour} />
//           </div>
//         </div>
//       )}

//       <ToastContainer />
//     </div>
//   );
// };

// export default TourChitiet;
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import XemLichTrinh from './XemLichTrinh';
import "./TourChitiet.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TourChitiet = () => {
  const { maTour } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tourDetail, setTourDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);
  const [dongia, setgia] = useState(null);
  const [maLoai, setMaLoai] = useState(null); // Thêm state để lưu maLoai

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        // Lấy chi tiết tour
        const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/tour/${maTour}`);
        setTourDetail(response.data);
        setgia(response.data.gia);

        // Lấy maLoai từ API khác
        const maLoaiResponse = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${maTour}`);
        setMaLoai(maLoaiResponse.data.maLoai); // Lưu giá trị maLoai vào state

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchTourDetail();
  }, [maTour]);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Xin lỗi bạn tour này chỉ mới dự định chứ chưa đưa vào hoạt động. Vui lòng liên hệ qua hotline <span>0337987875</span> để đặt tour này.</div>;

  if (!tourDetail) {
    return (
      <div className="not-found">
        <h3>Không tìm thấy thông tin tour.</h3>
        <p>Vui lòng kiểm tra lại mã tour và thử lại.</p>
      </div>
    );
  }

  const userInfo = JSON.parse(localStorage.getItem('user'));
  const sdtNguoiDung = userInfo?.sdtNguoiDung || '';

  const { 
    gia, 
    ngayDi, 
    ngayVe, 
    gioKhoiHanh, 
    gioVe, 
    khachSan, 
    phuongTienDiChuyen, 
    moTaTour, 
    noiDi, 
    noiDen 
  } = tourDetail;

  const handleDattour = async () => {
    if (user) {
      try {
        // Kiểm tra trạng thái của tour
        const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/tour/${maTour}`);
        const tourData = response.data;
  
        if (tourData.trangThai === "Hết hạn") {
          toast.error("Tour này đã hết hạn, vui lòng chọn tour khác.");
          setTimeout(() => {
            navigate('/');
          }, 2000);
          return;
        }
  
        // Thay đổi trạng thái của tour thành "Hết hạn"
        const updatedTour = {
          ...tourData,
          trangThai: "Hết hạn", // Thay đổi trạng thái
        };
  
        await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${maTour}`, updatedTour);
  
        toast.success("Cập nhật trạng thái tour thành công!");
  
        // Tiến hành đặt tour
        const bookingDetails = {
          maPhieu: "PD01", // Tạm thời sử dụng mã giả
          ngayDat: new Date().toISOString().split('T')[0], // Ngày đặt
          donGia: dongia, // Sử dụng giá trị 'dongia' đã lấy từ tourDetail
          soLuongNguoiDi: 0, // Cần cập nhật số lượng người đặt
          voucher: "Chưa có", // Tạm thời đặt mặc định
          trangThaiThanhToan: "Chưa thanh toán", // Trạng thái mặc định
          trangThaiHuy: null, // Chưa hủy
          sdtNguoiDung: sdtNguoiDung, // Số điện thoại người dùng
          maTour: maTour, // Mã tour được truyền qua URL
        };
  
        const bookingResponse = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour', bookingDetails);
  
        if (bookingResponse.status >= 200 && bookingResponse.status <= 204) {
          const maPhieu = bookingResponse.data.maPhieu;
          toast.success("Đặt tour thành công!");
          setTimeout(() => {
            navigate(`/dattour/${maPhieu}?maLoai=${maLoai}`);
          }, 500);
        }
      } catch (error) {
        toast.error("Lỗi khi đặt tour: " + error.message);
      }
    } else {
      toast.info(
        <div>
          <p>Bạn cần đăng nhập để đặt tour</p>
          <div>
            <button className="btn-login" onClick={() => navigate('/login')}>Đăng nhập</button>
            <button className="btn-cancel" onClick={() => toast.dismiss()}>Hủy</button>
          </div>
        </div>,
        {
          position: "top-center",
          autoClose: false,
          closeOnClick: false,
          draggable: false,
          toastId: "loginToast",
        }
      );
    }
  };
  

  return (
    <div className="tourchitiet-container">
      <div className="tour-banner">
        <img src="" alt="Tour Banner" />
      </div>
      <h3 className="tour-title">Chi tiết Tour</h3>
      <div className="tour-details">
        <div className="tour-details-item"><strong>Nơi đi:</strong> {noiDi}</div>
        <div className="tour-details-item"><strong>Nơi đến:</strong> {noiDen}</div>
        <div className="tour-details-item"><strong>Ngày đi:</strong> {ngayDi}</div>
        <div className="tour-details-item"><strong>Ngày về:</strong> {ngayVe}</div>
        <div className="tour-details-item"><strong>Giờ khởi hành:</strong> {gioKhoiHanh}</div>
        <div className="tour-details-item"><strong>Giờ về:</strong> {gioVe}</div>
        <div className="tour-details-item"><strong>Khách sạn:</strong> {khachSan}</div>
        <div className="tour-details-item"><strong>Phương tiện di chuyển:</strong> {phuongTienDiChuyen}</div>
        <div className="tour-details-item"><strong>Giá:</strong> {gia.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
        <div className="tour-details-item"><strong>Mô tả tour:</strong> {moTaTour}</div>
      </div>

      {maLoai && <div className="tour-details-item"><strong>Loại Tour:</strong> {maLoai}</div>}

      <div className="view-schedule">
        <button className="schedule-link" onClick={() => setShowSchedule(true)}>Xem lịch trình</button>
      </div>
      <div>
        <button onClick={handleDattour}>
          Đặt Tour
        </button>
      </div>

      {showSchedule && (
        <div className="modal-background">
          <div className="modal-content">
            <XemLichTrinh onClose={() => setShowSchedule(false)} maTour={maTour} />
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default TourChitiet;
