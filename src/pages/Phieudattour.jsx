// import { useEffect, useState } from 'react';
// import { useParams, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Phieudattour.css';

// import { WoWoWallet } from "@htilssu/wowo";

// const Phieudattour = () => {
//   const { maPhieu } = useParams();
//   const navigate = useNavigate();
//   const [tenTour, setTenTour] = useState('');
//   const [timeLeft, setTimeLeft] = useState(600); 
//   const location = useLocation();
//   const wowoWallet = new WoWoWallet("8b21f3b10b65d87b49aa0da7a0ab6d9e4c1596513f1eb1468cabe8730d762804");
//   const [phieuDatTour, setPhieuDatTour] = useState(null);

//   useEffect(() => {
//     const fetchPhieuDatTour = async () => {
//       try {
//         const responsePhieu = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`);
//         setPhieuDatTour(responsePhieu.data);

//         const responseTour = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${responsePhieu.data.maTour}`);
//         setTenTour(responseTour.data.tenTour);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         alert('Có lỗi xảy ra khi lấy dữ liệu phiếu đặt tour.');
//       }
//     };
//     fetchPhieuDatTour();
//   }, [maPhieu]);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     if (timeLeft === 0) {
//       clearInterval(timer);
//       alert('Bạn đã quá thời gian thanh toán.');
//       navigate('/home'); // Chuyển hướng về trang chủ
//     }

//     return () => clearInterval(timer); // Cleanup timer
//   }, [timeLeft, navigate]);

//   if (!phieuDatTour) return <p>Đang tải thông tin...</p>;

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
//   };

//   const thanhtoan = async () => {
//     const orderProps = {
//       money: phieuDatTour.donGia,
//       serviceName: "TN",
//       items: [
//         { name: tenTour, amount: phieuDatTour.soLuongNguoiDi, unitPrice: phieuDatTour.donGia },
//       ],
//       callback: {
//         successUrl: "https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/tour",
//         returnUrl: "https://travel-now-pink.vercel.app/hoadon/"
//       }
//     };

//     try {
//       const orderResponse = await wowoWallet.createOrder(orderProps);
//       if (orderResponse && orderResponse.checkoutUrl) {
//         setTimeout(() => {
//           window.location.href = orderResponse.checkoutUrl;
//         }, 1000);
//       } else {
//         console.error('Không thể tạo đơn hàng thanh toán!');
//       }
//     } catch (error) {
//       console.error("Lỗi khi tạo đơn hàng:", error.message);
//       alert('Có lỗi xảy ra khi tạo đơn hàng!');
//     }
//   };

//   return (
//     <div className="phieu-dat-tour-container">
//       <h3 className="phieu-dat-tour-title">Phiếu Đặt Tour</h3>
//       <div className="phieu-dat-tour-content">
//         <p><strong>Tên Tour:</strong> {tenTour}</p>
//         <p><strong>Ngày Đặt:</strong> {phieuDatTour.ngayDat}</p>
//         <p><strong>Tổng Tiền:</strong> {phieuDatTour.donGia.toLocaleString()} VND</p>
//         <p><strong>Số Lượng Người Đi:</strong> {phieuDatTour.soLuongNguoiDi}</p>
//         <p><strong>Trạng Thái Thanh Toán:</strong> {phieuDatTour.trangThaiThanhToan}</p>
//         <p><strong>SĐT Người Dùng:</strong> {phieuDatTour.sdtNguoiDung}</p>
//       </div>

//       <div className="countdown-timer">
//         <p><strong>Thời gian còn lại để thanh toán:</strong> {formatTime(timeLeft)}</p>
//       </div>

//       <button className="btn btn-pay" onClick={thanhtoan}>
//         Thanh toán
//       </button>
//     </div>
//   );
// };

// export default Phieudattour;


import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Phieudattour.css';

import { WoWoWallet } from "@htilssu/wowo";

const Phieudattour = () => {
  const { maPhieu } = useParams();
  const navigate = useNavigate();
  const [tenTour, setTenTour] = useState('');
  const [timeLeft, setTimeLeft] = useState(600); 
  const location = useLocation();
  const wowoWallet = new WoWoWallet("8b21f3b10b65d87b49aa0da7a0ab6d9e4c1596513f1eb1468cabe8730d762804");
  const [phieuDatTour, setPhieuDatTour] = useState(null);

  useEffect(() => {
    const fetchPhieuDatTour = async () => {
      try {
        const responsePhieu = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`);
        setPhieuDatTour(responsePhieu.data);

        const responseTour = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${responsePhieu.data.maTour}`);
        setTenTour(responseTour.data.tenTour);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Có lỗi xảy ra khi lấy dữ liệu phiếu đặt tour.');
      }
    };
    fetchPhieuDatTour();
  }, [maPhieu]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      alert('Bạn đã quá thời gian thanh toán.');
      navigate('/home'); // Chuyển hướng về trang chủ
    }

    return () => clearInterval(timer); // Cleanup timer
  }, [timeLeft, navigate]);

  if (!phieuDatTour) return <p>Đang tải thông tin...</p>;

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const thanhtoan = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0]; // Lấy ngày hiện tại (YYYY-MM-DD)
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // Lấy giờ hiện tại (HH:mm:ss)
  
    const hoaDonData = {
      ngayLap: formattedDate,
      gioLap: formattedTime,
      tongTien: phieuDatTour.donGia,
      maPhieu: maPhieu,
    };
  
    const orderProps = {
      money: phieuDatTour.donGia,
      serviceName: "TN",
      items: [
        { name: tenTour, amount: phieuDatTour.soLuongNguoiDi, unitPrice: phieuDatTour.donGia },
      ],
      callback: {
        successUrl: `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/bill/HoaDon`,
        returnUrl: `https://travel-now-pink.vercel.app/hoadon/?maPhieu=${maPhieu}`
      }
    };
  
    try {
      // Gửi dữ liệu mẫu tới bảng hóa đơn
      await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/bill/HoaDon', hoaDonData);
      
      // Tạo đơn hàng thanh toán
      const orderResponse = await wowoWallet.createOrder(orderProps);
      if (orderResponse && orderResponse.checkoutUrl) {
        setTimeout(() => {
          window.location.href = orderResponse.checkoutUrl; // Chuyển hướng đến trang thanh toán
        }, 1000);
      } else {
        console.error('Không thể tạo đơn hàng thanh toán!');
      }
    } catch (error) {
      console.error("Lỗi khi tạo hóa đơn hoặc xử lý thanh toán:", error.message);
      alert('Có lỗi xảy ra khi xử lý thanh toán!');
    }
  };
  
  
  

  return (
    <div className="phieu-dat-tour-container">
      <h3 className="phieu-dat-tour-title">Phiếu Đặt Tour</h3>
      <div className="phieu-dat-tour-content">
        <p><strong>Mã Phiếu:</strong> {maPhieu}</p> {/* Hiển thị Mã Phiếu */}
        <p><strong>Tên Tour:</strong> {tenTour}</p>
        <p><strong>Ngày Đặt:</strong> {phieuDatTour.ngayDat}</p>
        <p><strong>Tổng Tiền:</strong> {phieuDatTour.donGia.toLocaleString()} VND</p>
        <p><strong>Số Lượng Người Đi:</strong> {phieuDatTour.soLuongNguoiDi}</p>
        <p><strong>Trạng Thái Thanh Toán:</strong> {phieuDatTour.trangThaiThanhToan}</p>
        <p><strong>SĐT Người Dùng:</strong> {phieuDatTour.sdtNguoiDung}</p>
      </div>
  
      <div className="countdown-timer">
        <p><strong>Thời gian còn lại để thanh toán:</strong> {formatTime(timeLeft)}</p>
      </div>
  
      <button className="btn btn-pay" onClick={thanhtoan}>
        Thanh toán
      </button>
    </div>
  );
  
};

export default Phieudattour;