import { useEffect, useState } from 'react';
import axios from 'axios';
import './HoaDon.css';

const HoaDon = () => {
  const [hoaDon, setHoaDon] = useState(null);

  useEffect(() => {
    const fetchHoaDon = async () => {
      try {
        // Giả sử bạn có API lấy hóa đơn
        const response = await axios.get('https://api-your-server.com/hoa-don');
        setHoaDon(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu hóa đơn:", error);
      }
    };
    fetchHoaDon();
  }, []);

  if (!hoaDon) return <p>Đang tải thông tin hóa đơn...</p>;

  return (
    <div className="hoa-don-container">
      <h3 className="hoa-don-title">Thông Tin Hóa Đơn</h3>
      <div className="hoa-don-content">
        <div className="hoa-don-item">
          <span className="label">Mã Hóa Đơn:</span>
          <span className="value">{hoaDon.MaHoaDon}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Ngày Lập:</span>
          <span className="value">{new Date(hoaDon.NgayLap).toLocaleDateString()}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Giờ Lập:</span>
          <span className="value">{new Date(hoaDon.GioLap).toLocaleTimeString()}</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Tổng Tiền:</span>
          <span className="value">{hoaDon.TongTien.toLocaleString()} VND</span>
        </div>
        <div className="hoa-don-item">
          <span className="label">Mã Phiếu:</span>
          <span className="value">{hoaDon.MaPhieu}</span>
        </div>
      </div>
    </div>
  );
};

export default HoaDon;
