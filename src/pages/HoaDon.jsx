import './HoaDon.css';

const HoaDon = () => {
  // Dữ liệu hóa đơn cứng
  const hoaDon = {
    MaHoaDon: 'HD001',
    NgayLap: '2024-11-27T00:00:00',
    GioLap: '2024-11-27T10:30:00',
    TongTien: 1500000,
    MaPhieu: 'MP001',
  };

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
