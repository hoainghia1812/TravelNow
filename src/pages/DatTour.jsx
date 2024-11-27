
// import { useState } from 'react';
// import { useParams,useNavigate } from 'react-router-dom'; // Lấy tham số từ URL
// import axios from 'axios';
// import './DatTour.css';
// const DatTour = () => {
//   const { maPhieu } = useParams(); // Lấy maPhieu từ URL
//   const [numAdults, setNumAdults] = useState(0);
//   const navigate = useNavigate();

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
//     for (const participant of participants) {
//       if (!participant.fullName || !participant.gender || !participant.dob || !participant.phoneNumber) {
//         alert(`Vui lòng điền đầy đủ thông tin cho tất cả người đi`);
//         return;
//       }
//     }
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
//       const totalPeople = numAdults + numChildren;
  
//     try {
//       // Gọi API để lấy phiếu đặt tour
//       const existingTicketResponse = await axios.get(
//         `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`
//       );
//       const existingTicket = existingTicketResponse.data;
  
//       if (!existingTicket || !existingTicket.donGia) {
//         alert("Không lấy được thông tin đơn giá từ phiếu đặt tour!");
//         return;
//       }
  
//       // Tính tổng tiền: đơn giá x số lượng người
//       const totalPrice = existingTicket.donGia * totalPeople;
  
//       // Tạo phiếu cập nhật
//       const updatedTicket = {
//         ...existingTicket, // giữ nguyên dữ liệu hiện tại
//         soLuongNguoiDi: totalPeople, // cập nhật số lượng người đi
//         donGia: totalPrice, // cập nhật tổng tiền
//       };
  
//       // Gửi yêu cầu cập nhật phiếu
//       const ticketResponse = await axios.put(
//         `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`,
//         updatedTicket,
//         { headers: { 'Content-Type': 'application/json' } }
//       );
  
//       if (ticketResponse.status >= 200 && ticketResponse.status < 300) {
//         navigate(`/phieudattour/${maPhieu}`); // Chuyển hướng tới trang phiếu đặt tour
//       }
//     } catch (error) {
//       console.error("Lỗi khi cập nhật phiếu:", error);
//       alert("Có lỗi xảy ra khi cập nhật phiếu đặt tour.");
//     }
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


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DatTour.css';
import { useLocation } from 'react-router-dom';

const DatTour = () => {
  const { maPhieu } = useParams(); // Lấy maPhieu từ URL
  const [numAdults, setNumAdults] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the query parameters
  const queryParams = new URLSearchParams(location.search);
  const maLoai = queryParams.get('maLoai'); // Access maLoai
  const [tourName, setTourName] = useState(''); // State to store the tour name

  console.log("Mã loại tour đặt tour:", maLoai); // Log the maLoai for verification

  // Fetch tour name based on maLoai
  useEffect(() => {
    if (maLoai) {
      const fetchTourInfo = async () => {
        try {
          const response = await axios.get(
            `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/category/LoaiTour/${maLoai}`
          );
          if (response.status === 200) {
            setTourName(response.data.tenLoai); // Assuming the API returns a property `tenTour`
            console.log('Tên tour:', response.data.tenLoai); // Log the tour name for verification
          }
        } catch (error) {
          console.error('Error fetching tour information:', error);
          alert('Không thể lấy thông tin tour.');
        }
      };
      
      fetchTourInfo();
    }
  }, [maLoai]); // Re-run the effect if maLoai changes

  const [numChildren, setNumChildren] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [formData, setFormData] = useState({
    adults: [],
    children: []
  });

  const handleSetNumAdults = (e) => setNumAdults(parseInt(e.target.value) || 0);
  const handleSetNumChildren = (e) => setNumChildren(parseInt(e.target.value) || 0);
  const handleDatTour = () => {
    const totalPeople = numAdults + numChildren;
  
    // Check the tour type and enforce restrictions
    if (tourName === "Tour gia đình" && totalPeople > 6) {
      alert("Tour gia đình chỉ cho phép tối đa 6 người (bao gồm cả người lớn và trẻ em).");
      return;
    } else if (tourName === "Tour 1 người" && totalPeople > 1) {
      alert("Tour 1 người chỉ cho phép tối đa 1 người lớn.");
      return;
    } else if (tourName === "Tour Nhiều Người" && totalPeople > 30) {
      alert("Tour nhiều người chỉ cho phép tối đa 30 người.");
      return;
    }
  
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
        maNguoiDi: '',
      };
    } else {
      if (!newFormData.children[index]) {
        newFormData.children[index] = {};
      }
      newFormData.children[index] = {
        ...newFormData.children[index],
        [name]: value,
        MaPhieu: maPhieu,
        maNguoiDi: '',
      };
    }
    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    const participants = [...formData.adults, ...formData.children];
    for (const participant of participants) {
      if (!participant.fullName || !participant.gender || !participant.dob || !participant.phoneNumber) {
        alert(`Vui lòng điền đầy đủ thông tin cho tất cả người đi`);
        return;
      }
    }
    for (let i = 0; i < participants.length; i++) {
      const participant = {
        maNguoiDi: participants[i].maNguoiDi || '', 
        tenNguoiDi: participants[i].fullName || '',
        gioiTinh: participants[i].gender || '',
        ngaySinh: participants[i].dob || '',
        sdtNguoiDi: participants[i].phoneNumber || '',
        maPhieu: participants[i].MaPhieu || maPhieu,
      };

      console.log('maPhieu trong đối tượng participant:', participant.maPhieu);

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
          // alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}. ${error.response.data.title}`);
        } else {
          console.error('Unknown error:', error);
          // alert(`Có lỗi xảy ra khi thêm ${participant.tenNguoiDi}.`);
        }
      }
      const totalPeople = numAdults + numChildren;

      try {
        const existingTicketResponse = await axios.get(
          `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`
        );
        const existingTicket = existingTicketResponse.data;

        if (!existingTicket || !existingTicket.donGia) {
          alert("Không lấy được thông tin đơn giá từ phiếu đặt tour!");
          return;
        }

        const totalPrice = existingTicket.donGia * totalPeople;

        const updatedTicket = {
          ...existingTicket,
          soLuongNguoiDi: totalPeople,
          donGia: totalPrice,
        };

        const ticketResponse = await axios.put(
          `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/ticket/PhieuDatTour/${maPhieu}`,
          updatedTicket,
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (ticketResponse.status >= 200 && ticketResponse.status < 300) {
          navigate(`/phieudattour/${maPhieu}`);
        }
      } catch (error) {
        console.error("Lỗi khi cập nhật phiếu:", error);
        alert("Có lỗi xảy ra khi cập nhật phiếu đặt tour.");
      }
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
      <h2>Đặt Tour - {tourName}</h2> {/* Display tour name here */}
      <div className="input-container">
        <label>Số lượng người lớn:</label>
        <input type="number" value={numAdults} onChange={handleSetNumAdults} />
      </div>
      <div className="input-container">
        <label>Số lượng trẻ em:</label>
        <input type="number" value={numChildren} onChange={handleSetNumChildren} />
      </div>
      <button onClick={handleDatTour}>Đặt Tour</button>
      {showForms && (
        <div className="form-container">
          {renderFormFields(numAdults, "Người lớn", "adult")}
          {renderFormFields(numChildren, "Trẻ em", "child")}
          <button onClick={handleSubmit}>Xác nhận thông tin</button>
        </div>
      )}
    </div>
  );
};

export default DatTour;
