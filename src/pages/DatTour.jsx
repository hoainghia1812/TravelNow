import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './DatTour.css';

const DatTour = () => {
  const { maPhieu } = useParams();
  const navigate = useNavigate();

  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [formData, setFormData] = useState({ adults: [], children: [] });

  const handleSetNumAdults = (e) => setNumAdults(parseInt(e.target.value) || 0);
  const handleSetNumChildren = (e) => setNumChildren(parseInt(e.target.value) || 0);

  const handleDatTour = () => {
    setShowForms(true);
  };

  const handleFormChange = (e, index, type) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };

    if (type === 'adult') {
      if (!newFormData.adults[index]) {
        newFormData.adults[index] = {};
      }
      newFormData.adults[index] = { ...newFormData.adults[index], [name]: value, MaPhieu: maPhieu, maNguoiDi: '' };
    } else {
      if (!newFormData.children[index]) {
        newFormData.children[index] = {};
      }
      newFormData.children[index] = { ...newFormData.children[index], [name]: value, MaPhieu: maPhieu, maNguoiDi: '' };
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    const participants = [...formData.adults, ...formData.children];
  
    // Kiểm tra thông tin người tham gia
    for (const participant of participants) {
      if (!participant.fullName || !participant.gender || !participant.dob || !participant.phoneNumber) {
        alert(`Vui lòng điền đầy đủ thông tin cho tất cả người đi`);
        return;
      }
    }
  
    // Tính tổng số người
    const totalPeople = numAdults + numChildren;
  
    try {
      // Gọi API để lấy phiếu đặt tour
      const existingTicketResponse = await axios.get(
        `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`
      );
      const existingTicket = existingTicketResponse.data;
  
      if (!existingTicket || !existingTicket.donGia) {
        alert("Không lấy được thông tin đơn giá từ phiếu đặt tour!");
        return;
      }
  
      // Tính tổng tiền: đơn giá x số lượng người
      const totalPrice = existingTicket.donGia * totalPeople;
  
      // Tạo phiếu cập nhật
      const updatedTicket = {
        ...existingTicket, // giữ nguyên dữ liệu hiện tại
        soLuongNguoiDi: totalPeople, // cập nhật số lượng người đi
        donGia: totalPrice, // cập nhật tổng tiền
      };
  
      // Gửi yêu cầu cập nhật phiếu
      const ticketResponse = await axios.put(
        `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`,
        updatedTicket,
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      if (ticketResponse.status >= 200 && ticketResponse.status < 300) {
        navigate(`/phieudattour/${maPhieu}`); // Chuyển hướng tới trang phiếu đặt tour
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật phiếu:", error);
      alert("Có lỗi xảy ra khi cập nhật phiếu đặt tour.");
    }
  };
  

  const renderFormFields = (count, label, type) => (
    Array.from({ length: count }).map((_, i) => (
      <div key={`${label}-${i}`} className="form-section">
        <h4>{label} {i + 1}</h4>
        <div className="input-group">
          <label>Họ và tên:</label>
          <input
            type="text"
            placeholder="Nhập họ và tên"
            maxLength="50"
            name="fullName"
            onChange={(e) => handleFormChange(e, i, type)}
          />
        </div>
        <div className="input-group">
          <label>Giới tính</label>
          <select
            name="gender"
            onChange={(e) => handleFormChange(e, i, type)}
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
        </div>
        <div className="input-group">
          <label>Ngày sinh:</label>
          <input
            type="date"
            placeholder="dd/mm/yyyy"
            min="1924-01-01"
            max="2024-12-31"
            name="dob"
            onChange={(e) => handleFormChange(e, i, type)}
          />
        </div>
        <div className="input-group">
          <label>Số điện thoại:</label>
          <input
            type="tel"
            placeholder="Nhập số điện thoại (Nếu có)"
            pattern="^0\d{9}$"
            minLength="10"
            maxLength="10"
            required
            name="phoneNumber"
            onChange={(e) => handleFormChange(e, i, type)}
          />
        </div>
      </div>
    ))
  );

  return (
    <div className="dat-tour-container">
      <h2>Đặt Tour</h2>
      <div className="input-container">
        <label>Số lượng người lớn:</label>
        <input type="number" value={numAdults} onChange={handleSetNumAdults} min="0" />
      </div>
      <div className="input-container">
        <label>Số lượng trẻ nhỏ:</label>
        <input type="number" value={numChildren} onChange={handleSetNumChildren} min="0" />
      </div>
      <button onClick={handleDatTour} className="book-tour-button">Đặt Tour</button>
      
      {showForms && (
        <div className="forms-container">
          <h3>Thông tin Người Lớn</h3>
          {renderFormFields(numAdults, 'Người lớn', 'adult')}
          
          <h3>Thông tin Trẻ Nhỏ</h3>
          {renderFormFields(numChildren, 'Trẻ nhỏ', 'child')}
        </div>
      )}

      {showForms && (
        <button onClick={handleSubmit} className="submit-button">Lưu thông tin và Đặt Tour</button>
      )}
    </div>
  );
};

export default DatTour;
