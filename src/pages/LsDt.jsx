import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { WoWoWallet } from "@htilssu/wowo";


const LsDt = () => {
  const [hoaDonList, setHoaDonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLsDt = async () => {
      try {
        setLoading(true);
        setError(null);

        // Lấy thông tin người dùng từ localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const sdtNguoiDung = user?.sdtNguoiDung;

        if (!sdtNguoiDung) {
          setError('Không tìm thấy số điện thoại người dùng.');
          return;
        }

        // Gọi API để lấy danh sách mã phiếu theo số điện thoại
        const responsePhieu = await axios.get(
          `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour`,
          {
            params: { sdtNguoiDung },
          }
        );

        const danhSachMaPhieu = responsePhieu.data.map((phieu) => phieu.maPhieu);

        // Gọi API để lấy danh sách tất cả hóa đơn
        const responseHoaDon = await axios.get(
          `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/bill/HoaDon`
        );

        const allHoaDon = responseHoaDon.data;

        // Lọc danh sách hóa đơn để lấy những hóa đơn có mã phiếu trùng
        const filteredHoaDon = allHoaDon.filter((hoaDon) =>
          danhSachMaPhieu.includes(hoaDon.maPhieu)
        );

        setHoaDonList(filteredHoaDon); // Lưu danh sách hóa đơn đã lọc vào state
      } catch (err) {
        setError('Không thể lấy danh sách hóa đơn. Vui lòng thử lại.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLsDt();
  }, []);

  const handleCancelOrder = async (orderId) => {
    const wowoWallet = new WoWoWallet("8b21f3b10b65d87b49aa0da7a0ab6d9e4c1596513f1eb1468cabe8730d762804");
    try {
      const response = await wowoWallet.cancelOrder(orderId);
      console.log('Đơn hàng đã được hủy:', response);
      alert('Hóa đơn đã được hủy thành công!');

      setHoaDonList((prevList) => prevList.filter((hoaDon) => hoaDon.maHoaDon !== orderId));
    } catch (error) {
      console.error('Lỗi khi hủy đơn hàng:', error.message);
      alert('Không thể hủy hóa đơn. Vui lòng thử lại!');
    }
  };

  if (loading) return <div>Đang tải dữ liệu...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="ls-dt-container">
      <h3>Lịch Sử Đặt Tour</h3>
      {hoaDonList.length === 0 ? (
        <p>Không có hóa đơn nào.</p>
      ) : (
        <table className="hoa-don-table">
          <thead>
            <tr>
              <th>Mã Hóa Đơn</th>
              <th>Ngày Lập</th>
              <th>Giờ Lập</th>
              <th>Tổng Tiền</th>
              <th>Mã Phiếu</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {hoaDonList.map((hoaDon) => (
              <tr key={hoaDon.maHoaDon}>
                <td>{hoaDon.maHoaDon}</td>
                <td>{new Date(hoaDon.ngayLap).toLocaleDateString()}</td>
                <td>{hoaDon.gioLap}</td>
                <td>{hoaDon.tongTien.toLocaleString()} VND</td>
                <td>{hoaDon.maPhieu}</td>
                <td>
                  <button
                    className="btn-view"
                    onClick={() => alert(`Xem chi tiết hóa đơn: ${hoaDon.maHoaDon}`)}
                  >
                    Xem
                  </button>
                  <button
                    className="btn-cancel"
                    onClick={() => handleCancelOrder(hoaDon.maHoaDon)}
                  >
                    Hủy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LsDt;
