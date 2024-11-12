

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';
import './TourChitiet.css';
import { useNavigate } from 'react-router-dom';

import XemLichTrinh from './XemLichTrinh';

const TourChitiet = () => {
  const { maTour } = useParams();
  const navigate = useNavigate();
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
    noiDen, 
  } = tourDetail;
  const handleDattour =()=>{
    navigate(`/dattour`);
  }
  
  return (
    <div className="tourchitiet-container">
      <div className="tour-banner">
        <img src=""alt="Tour Banner" />
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
    </div>
  );
};

export default TourChitiet;
