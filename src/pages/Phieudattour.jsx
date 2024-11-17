import { useEffect, useState } from 'react';
import { useParams,useLocation } from 'react-router-dom';
import axios from 'axios';
import './Phieudattour.css';

import {WoWoWallet} from "@htilssu/wowo";
const Phieudattour = () => {
  const { maPhieu } = useParams();
  const [tenTour, setTenTour] = useState('');
  const location = useLocation();
  const wowoWallet = new WoWoWallet("NghiaCr7@gmail.com");

  const [phieuDatTour, setPhieuDatTour] = useState(null);

  useEffect(() => {
    const fetchPhieuDatTour = async () => {
      try {
        // Lấy dữ liệu phiếu đặt tour
        const responsePhieu = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`);
        console.log(responsePhieu.data);
        setPhieuDatTour(responsePhieu.data);

        // Sau khi lấy phiếu đặt tour, lấy tên tour
        const responseTour = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${responsePhieu.data.maTour}`);
        console.log(responseTour.data);
        setTenTour(responseTour.data.tenTour);
        console.log("tenTour");
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Có lỗi xảy ra khi lấy dữ liệu phiếu đặt tour.');
      }
    };
    fetchPhieuDatTour();
  }, [maPhieu]);

  if (!phieuDatTour) return <p>Đang tải thông tin...</p>;

  const thanhtoan = async () => {
    const orderProps = {
      money: phieuDatTour.donGia,
      serviceName: "TravelNow",
      items: [
        { name: tenTour, amount: phieuDatTour.soLuongNguoiDi, unitPrice: phieuDatTour.donGia },
      ],
      callback: {
        successUrl: "https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/tour",
        returnUrl: "http://localhost:5173/hoadon"
      }
    };
  
    try {
      const orderResponse = await wowoWallet.createOrder(orderProps);
      console.log("Đơn hàng đã được tạo:", orderResponse);
  
      // Kiểm tra xem checkoutUrl có hợp lệ không trước khi chuyển hướng
      if (orderResponse && orderResponse.checkoutUrl) {
        console.log("Redirecting to checkout URL:", orderResponse.checkoutUrl);
  
        // Sử dụng window.location.href để chuyển hướng
        setTimeout(() => {
          window.location.href = orderResponse.checkoutUrl;
        }, 1000); // Thêm một khoảng trễ nhỏ trước khi chuyển hướng
  
      } else {
        console.error('Không thể tạo đơn hàng thanh toán!');
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error.message);
      console.error('Có lỗi xảy ra khi tạo đơn hàng!');
    }
  };
  
  return (
    <div className="phieu-dat-tour-container">
      <h3 className="phieu-dat-tour-title">Phiếu Đặt Tour</h3>
      <div className="phieu-dat-tour-content">
        <p><strong>Tên Tour:</strong> {tenTour}</p>
        <p><strong>Ngày Đặt:</strong> {phieuDatTour.ngayDat}</p>
        <p><strong>Tổng Tiền:</strong> {phieuDatTour.donGia.toLocaleString()} VND</p>
        <p><strong>Số Lượng Người Đi:</strong> {phieuDatTour.soLuongNguoiDi}</p>
        <p><strong>Trạng Thái Thanh Toán:</strong> {phieuDatTour.trangThaiThanhToan}</p>
        <p><strong>SĐT Người Dùng:</strong> {phieuDatTour.sdtNguoiDung}</p>
      </div>

      <button className="btn btn-pay" onClick={thanhtoan}>
        Thanh toán
      </button>
    </div>
  );
};

export default Phieudattour;
