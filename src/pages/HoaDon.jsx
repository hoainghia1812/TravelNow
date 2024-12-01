import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams để lấy tham số từ URL
import axios from 'axios';
import './HoaDon.css';

const HoaDon = () => {
  const { maPhieu } = useParams(); // Lấy maPhieu từ URL
  const [hoaDon, setHoaDon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy danh sách hóa đơn từ API
        const response = await axios.get(
          'https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/bill/HoaDon'
        );

        const danhSachHoaDon = response.data;

        // Tìm hóa đơn có maPhieu khớp với tham số trên URL
        const hoaDonTimThay = danhSachHoaDon.find(
          (hoaDon) => hoaDon.maPhieu === maPhieu
        );

        if (hoaDonTimThay) {
          setHoaDon(hoaDonTimThay); // Lưu thông tin hóa đơn vào state
        } else {
          setError('Không tìm thấy hóa đơn với mã phiếu này.');
        }
      } catch (err) {
        setError('Không thể lấy thông tin hóa đơn. Vui lòng thử lại.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchHoaDon();
  }, [maPhieu]);

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!hoaDon) return <div>Không có thông tin hóa đơn.</div>;

  return (
    <div className="hoa-don-container">
      <h3 className="hoa-don-title">Thông Tin Hóa Đơn</h3>
      <div className="hoa-don-content">
        <div className="hoa-don-item">
          <span className="label">Mã Hóa Đơn:</span>
          <span className="value">{hoaDon.maHoaDon}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Ngày Lập:</span>
          <span className="value">{new Date(hoaDon.ngayLap).toLocaleDateString()}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Giờ Lập:</span>
          <span className="value">{hoaDon.gioLap}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Tổng Tiền:</span>
          <span className="value">{hoaDon.tongTien.toLocaleString()} VND</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Mã Phiếu:</span>
          <span className="value">{hoaDon.maPhieu}</span>
        </div>
      </div>
    </div>
  );
};

export default HoaDon;
