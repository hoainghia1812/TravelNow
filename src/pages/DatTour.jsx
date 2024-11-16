// import { useState } from 'react';
// import { useParams } from 'react-router-dom'; // Lấy tham số từ URL
// import axios from 'axios';
// import './DatTour.css';

// const DatTour = () => {
//   const { maPhieu } = useParams(); // Lấy maPhieu từ URL
//   const [numAdults, setNumAdults] = useState(0);
//   const [numChildren, setNumChildren] = useState(0);
//   const [showForms, setShowForms] = useState(false);
//   const [formData, setFormData] = useState({
//     adults: [],
//     children: []
//   });

//   const handleSetNumAdults = (e) => setNumAdults(parseInt(e.target.value) || 0);
//   const handleSetNumChildren = (e) => setNumChildren(parseInt(e.target.value) || 0);

//   const handleDatTour = () => {
//     setShowForms(true);
//   };

//   const handleFormChange = (e, index, type) => {
//     const { name, value } = e.target;
//     const newFormData = { ...formData };

//     if (type === 'adult') {
//       if (!newFormData.adults[index]) {
//         newFormData.adults[index] = {};
//       }
//       newFormData.adults[index] = {
//         ...newFormData.adults[index],
//         [name]: value,
//         MaPhieu: maPhieu, // Sử dụng maPhieu từ URL
//         maNguoiDi: '', // Tạo mã người đi tự động
//       };
//     } else {
//       if (!newFormData.children[index]) {
//         newFormData.children[index] = {};
//       }
//       newFormData.children[index] = {
//         ...newFormData.children[index],
//         [name]: value,
//         MaPhieu: maPhieu, // Sử dụng maPhieu từ URL
//         maNguoiDi: '', // Tạo mã người đi tự động
//       };
//     }

//     setFormData(newFormData);
//   };

//   const handleSubmit = async () => {
//     const participants = [...formData.adults, ...formData.children];
    
//     for (let i = 0; i < participants.length; i++) {
//       const participant = {
//         maNguoiDi: participants[i].maNguoiDi || '', 
//         tenNguoiDi: participants[i].fullName || '',
//         gioiTinh: participants[i].gender || '',
//         ngaySinh: participants[i].dob || '',
//         sdtNguoiDi: participants[i].phoneNumber || '',
//         maPhieu: participants[i].MaPhieu || maPhieu, // Sử dụng maPhieu từ URL
//       };
  
//       // Kiểm tra và log để chắc chắn maPhieu có tồn tại
//       console.log('maPhieu trong đối tượng participant:', participant.maPhieu);
  
//       // Kiểm tra các trường thông tin bắt buộc
//       if (!participant.tenNguoiDi || !participant.gioiTinh || !participant.ngaySinh || !participant.sdtNguoiDi) {
//         alert(`Vui lòng điền đầy đủ thông tin cho tất cả người đi`);
//         return;
//       }
  
//       try {
//         const response = await axios.post(
//           'https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/participants/Nguoidi',
//           participant,
//           { headers: { 'Content-Type': 'application/json' } }
//         );
  
//         if (response.status === 200) {
//           console.log(`Thêm người đi thành công: ${participant.tenNguoiDi}`);
//         }
//       } catch (error) {
//         if (error.response) {
//           console.error('API Error:', error.response.data);
//           alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}. ${error.response.data.title}`);
//         } else {
//           console.error('Unknown error:', error);
//           alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}.`);
//         }
//       }
//     }
//   };
  

//   const renderFormFields = (count, label, type) => (
//     Array.from({ length: count }).map((_, i) => (
//       <div key={`${label}-${i}`} className="form-section">
//         <h4>{label} {i + 1}</h4>
//         <div className="input-group">
//           <label>Họ và tên:</label>
//           <input
//             type="text"
//             placeholder="Nhập họ và tên"
//             maxLength="50"
//             name="fullName"
//             onChange={(e) => handleFormChange(e, i, type)}
//           />
//         </div>
//         <div className="input-group">
//           <label>Giới tính</label>
//           <select
//             name="gender"
//             onChange={(e) => handleFormChange(e, i, type)}
//           >
//             <option value="">Chọn giới tính</option>
//             <option value="Nam">Nam</option>
//             <option value="Nữ">Nữ</option>
//           </select>
//         </div>
//         <div className="input-group">
//           <label>Ngày sinh:</label>
//           <input
//             type="date"
//             placeholder="dd/mm/yyyy"
//             min="1924-01-01"
//             max="2024-12-31"
//             name="dob"
//             onChange={(e) => handleFormChange(e, i, type)}
//           />
//         </div>
//         <div className="input-group">
//           <label>Số điện thoại:</label>
//           <input
//             type="tel"
//             placeholder="Nhập số điện thoại(Nếu có)"
//             pattern="^0\d{9}$"
//             minLength="10"
//             maxLength="10"
//             required
//             name="phoneNumber"
//             onChange={(e) => handleFormChange(e, i, type)}
//           />
//         </div>
//       </div>
//     ))
//   );

//   return (
//     <div className="dat-tour-container">
//       <h2>Đặt Tour</h2>
//       <div className="input-container">
//         <label>Số lượng người lớn:</label>
//         <input type="number" value={numAdults} onChange={handleSetNumAdults} min="0" />
//       </div>
//       <div className="input-container">
//         <label>Số lượng trẻ nhỏ:</label>
//         <input type="number" value={numChildren} onChange={handleSetNumChildren} min="0" />
//       </div>
//       <button onClick={handleDatTour} className="book-tour-button">Đặt Tour</button>
      
//       {showForms && (
//         <div className="forms-container">
//           <h3>Thông tin Người Lớn</h3>
//           {renderFormFields(numAdults, 'Người lớn', 'adult')}
          
//           <h3>Thông tin Trẻ Nhỏ</h3>
//           {renderFormFields(numChildren, 'Trẻ nhỏ', 'child')}
//         </div>
//       )}

//       {showForms && (
//         <button onClick={handleSubmit} className="submit-button">Lưu thông tin và Đặt Tour</button>
//       )}
//     </div>
//   );
// };

// export default DatTour;
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
  const [formData, setFormData] = useState({
    adults: [],
    children: []
  });

  const tourPrice = 1000000; // Giá tour (ví dụ)

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
      newFormData.adults[index] = {
        ...newFormData.adults[index],
        [name]: value,
        MaPhieu: maPhieu,
        maNguoiDi: ''
      };
    } else {
      if (!newFormData.children[index]) {
        newFormData.children[index] = {};
      }
      newFormData.children[index] = {
        ...newFormData.children[index],
        [name]: value,
        MaPhieu: maPhieu,
        maNguoiDi: ''
      };
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    const participants = [...formData.adults, ...formData.children];
    
    for (let i = 0; i < participants.length; i++) {
      const participant = {
        maNguoiDi: participants[i].maNguoiDi || '',
        tenNguoiDi: participants[i].fullName || '',
        gioiTinh: participants[i].gender || '',
        ngaySinh: participants[i].dob || '',
        sdtNguoiDi: participants[i].phoneNumber || '',
        maPhieu: participants[i].MaPhieu || maPhieu
      };

      if (!participant.tenNguoiDi || !participant.gioiTinh || !participant.ngaySinh || !participant.sdtNguoiDi) {
        alert(`Vui lòng điền đầy đủ thông tin cho tất cả người đi`);
        return;
      }

      try {
        const response = await axios.post(
          'https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/participants/Nguoidi',
          participant,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.status === 200) {
          console.log(`Thêm người đi thành công: ${participant.tenNguoiDi}`);
        }
      } catch (error) {
        if (error.response) {
          console.error('API Error:', error.response.data);
          alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}. ${error.response.data.title}`);
        } else {
          console.error('Unknown error:', error);
          alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}.`);
        }
      }
    }

    // Tính tổng số người và giá tour
    const totalPeople = numAdults + numChildren;
    const totalPrice = totalPeople * tourPrice;

    // Cập nhật phiếu đặt tour với thông tin mới
    const updatedTicket = {
      maPhieu,
      ngayDat: new Date().toISOString().split('T')[0],
      donGia: totalPrice,
      soLuongNguoiDi: totalPeople,
      voucher: "dsssssss",
      trangThaiThanhToan: "Chưa thanh toán",
      trangThaiHuy: null,
      sdtNguoiDung: "0337987876",
      maTour: "T05"
    };

    try {
      const ticketResponse = await axios.put(
        `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`,
        updatedTicket,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (ticketResponse.status === 200&& ticketResponse.status <= 204) {
        navigate(`/phieudattour/${maPhieu}`);  // Chuyển hướng tới trang phiếu đặt tour
      }
    } catch (error) {
      console.error("Error updating ticket:", error);
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
            placeholder="Nhập số điện thoại(Nếu có)"
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
