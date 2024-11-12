// import React, { useState } from 'react';
// import './DatTour.css';

// const DatTour = () => {
//   const [numAdults, setNumAdults] = useState(0);
//   const [numChildren, setNumChildren] = useState(0);
//   const [showForms, setShowForms] = useState(false);

//   const handleSetNumAdults = (e) => setNumAdults(parseInt(e.target.value) || 0);
//   const handleSetNumChildren = (e) => setNumChildren(parseInt(e.target.value) || 0);
  
//   const handleDatTour = () => {
//     setShowForms(true);
//   };

//   const handlePhoneNumberChange = (e, setField) => {
//     const phone = e.target.value;
//     if (phone.length <= 10 && /^\d*$/.test(phone)) {
//       setField(phone);
//     }
//   };

//   const renderFormFields = (count, label) => (
//     Array.from({ length: count }).map((_, i) => (
//       <div key={`${label}-${i}`} className="form-section">
//         <h4>{label} {i + 1}</h4>
//         <div className="input-group">
//           <label>Họ và tên:</label>
//           <input
//             type="text"
//             placeholder="Nhập họ và tên"
//             maxLength="50"
//           />
//         </div>
//         <div className="input-group">
//           <label>Giới tính</label>
//           <select>
//             <option value="">Chọn giới tính</option>
//             <option value="Nam">Nam</option>
//             <option value="Nữ">Nữ</option>
//           </select>
//         </div>
//         <div className="input-group">
//         <div className="input-group">
//           <label>Ngày sinh:</label>
//           <input
//             type="date"
//             placeholder="dd/mm/yyyy"
//             min="1924-01-01" // Start from 1924
//             max="2024-12-31" // End on 2024
//           />
//         </div>

//         </div>
//         <div className="input-group">
//          <label>Số điện thoại:</label>
//          <input
//            type="tel"
//            placeholder="Nhập số điện thoại"
//            pattern="^0\d{9}$" // Regex to ensure it starts with 0 and has exactly 10 digits
//            minLength="10"
//            maxLength="10"
//            required
//            onClick={handlePhoneNumberChange}
//          />
//        </div>

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
//           {renderFormFields(numAdults, 'Người lớn')}
          
//           <h3>Thông tin Trẻ Nhỏ</h3>
//           {renderFormFields(numChildren, 'Trẻ nhỏ')}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DatTour;

import React, { useState } from 'react';
import './DatTour.css';

const DatTour = () => {
  const [numAdults, setNumAdults] = useState(0);
  const [numChildren, setNumChildren] = useState(0);
  const [showForms, setShowForms] = useState(false);
  const [formData, setFormData] = useState({
    adults: [],
    children: []
  });

  const handleSetNumAdults = (e) => setNumAdults(parseInt(e.target.value) || 0);
  const handleSetNumChildren = (e) => setNumChildren(parseInt(e.target.value) || 0);

  const handleDatTour = () => {
    setShowForms(true);
  };

  const handleFormChange = (e, index, type) => {
    const { name, value } = e.target;
    const newFormData = { ...formData };
    
    if (type === 'adult') {
      newFormData.adults[index] = { ...newFormData.adults[index], [name]: value };
    } else {
      newFormData.children[index] = { ...newFormData.children[index], [name]: value };
    }

    setFormData(newFormData);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/participants/Nguoidi', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const result = await response.json();
      alert('Đặt tour thành công');
      console.log(result);
    } catch (error) {
      alert('Có lỗi xảy ra khi đặt tour');
      console.error(error);
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
            placeholder="Nhập số điện thoại"
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
