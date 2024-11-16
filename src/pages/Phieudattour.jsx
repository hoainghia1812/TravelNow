import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Phieudattour.css';
// import {OrderResponse} from "./WowoWallet";
// import { data } from 'autoprefixer';

const Phieudattour = () => {
  const { maPhieu } = useParams();
  const [tenTour, setTenTour] = useState('');
  // const wowoWallet = new WoWoWallet("NghiaPn7@gmail.com");


  const [phieuDatTour, setPhieuDatTour] = useState(null);

  useEffect(() => {
    const fetchPhieuDatTour = async () => {
      try {
        // Lấy dữ liệu phiếu đặt tour
        const responsePhieu = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`);
        console.log(responsePhieu.data);
        setPhieuDatTour(responsePhieu.data);

        // Sau khi lấy phiếu đặt tour, lấy tên tour
        const responseTour = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/${responsePhieu.data.maTour}`);
        console.log(responseTour.data);
        setTenTour(responseTour.data.tenTour);  // Lưu tên tour vào state
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Có lỗi xảy ra khi lấy dữ liệu phiếu đặt tour.');
      }
    };
    fetchPhieuDatTour();
  }, [maPhieu]);

  if (!phieuDatTour) return <p>Đang tải thông tin...</p>;
  // const thanhtoan = () => {
  //   const orderProps = {
  //     money: phieuDatTour.donGia,
  //     serviceName: "TravelNow",
  //     items: [
  //         {name: phieuDatTour.tenTour, amount: phieuDatTour.soLuongNguoiDi, unitPrice: phieuDatTour.donGia},
  //     ],
  //     callback: {
  //         successUrl: "",
  //         returnUrl: ""
  //     }
  // };
  
  // try {
  //     const orderResponse: OrderResponse = await wowoWallet.createOrder(orderProps);
  //     console.log("Đơn hàng đã được tạo:", orderResponse);
  // } catch (error) {
  //     console.error("Lỗi khi tạo đơn hàng:", error.message);
  // }
  // }
  return (
    <div className="phieu-dat-tour-container">
      <h3 className="phieu-dat-tour-title">Phiếu Đặt Tour</h3>
      <div className="phieu-dat-tour-content">
      <p><strong>Tên Tour:</strong> {tenTour}</p>
        <p><strong>Ngày Đặt:</strong> {phieuDatTour.ngayDat}</p>
        <p><strong>Đơn Giá:</strong> {phieuDatTour.donGia.toLocaleString()} VND</p>
        <p><strong>Số Lượng Người Đi:</strong> {phieuDatTour.soLuongNguoiDi}</p>
        <p><strong>Trạng Thái Thanh Toán:</strong> {phieuDatTour.trangThaiThanhToan}</p>
        <p><strong>SĐT Người Dùng:</strong> {phieuDatTour.sdtNguoiDung}</p>
      </div>
      
      {/* Nút thanh toán */}
      {/* <button className="btn btn-pay" onClick={thanhtoan}>
        Thanh toán
      </button> */}
      <button className="btn btn-pay" >
        Thanh toán
      </button>
    </div>
  );
};

export default Phieudattour;





{/* <p><strong>Mã Tour:</strong> {phieuDatTour.maTour}</p> */}
        {/* <p><strong>Trạng Thái Hủy:</strong> {phieuDatTour.trangThaiHuy || 'Chưa hủy'}</p> */}
        {/* <p><strong>Voucher:</strong> {phieuDatTour.voucher || 'Không có'}</p> */}
        {/* <p><strong>Mã Phiếu:</strong> {phieuDatTour.maPhieu}</p> */}
