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

  useEffect(() => {
    const fetchTourDetail = async () => {
      try {
        const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/tour/${maTour}`);
        setTourDetail(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchTourDetail();
  }, [maTour]);

  if (loading) return <div className="loading">Đang tải dữ liệu...</div>;
  if (error) return <div className="error">Lỗi: {error.message}</div>;

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
      const bookingDetails = {
        maPhieu: "PD01", 
        ngayDat: new Date().toISOString().split('T')[0], 
        donGia: 0,
        soLuongNguoiDi: 0,
        voucher: "Chưa có", 
        trangThaiThanhToan: "Chưa thanh toán",
        trangThaiHuy: null,
        sdtNguoiDung: sdtNguoiDung, 
        maTour: maTour, 
      };

      try {
        const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour', bookingDetails);
        if (response.status >= 200 && response.status <= 204) {
          const maPhieu = response.data.maPhieu;
          toast.success("Đặt tour thành công!");
          setTimeout(() => {
              navigate(`/dattour/${maPhieu} `);
              
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
