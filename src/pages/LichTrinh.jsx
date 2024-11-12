

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../../src/pages/LichTrinh.css";

const LichTrinh = () => {
  const [scheduleData, setScheduleData] = useState({
    tenLichTrinh: "",
    maTour: ""  
  });
  

  const [activities, setActivities] = useState([{ ngay: "", moTaHoatDong: "" }]);
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setScheduleData(prevData => ({
      ...prevData,
      [name]: value
    }));
  
    // Kiểm tra nếu người dùng đã chọn tour
    if (name === "maTour") {
      const selectedTour = tours.find(tour => tour.maTour === value);
      if (selectedTour) {
        const timeDetails = selectedTour.thoiGianTour; // "3 ngày 2 đêm"
        const daysMatch = timeDetails.match(/(\d+) ngày/);
        const numberOfDays = daysMatch ? parseInt(daysMatch[1]) : 0;
  
        // Tạo các trường hoạt động dựa trên số ngày
        const newActivities = Array.from({ length: numberOfDays }, (_, index) => ({
          ngay: `Ngày ${index + 1}`,
          moTaHoatDong: ""
        }));
        setActivities(newActivities);
      }
    }
  };

  const handleActivityChange = (index, e) => {
    const newActivities = [...activities];
    newActivities[index][e.target.name] = e.target.value;
    setActivities(newActivities);
  };

  const removeActivity = (index) => {
    const newActivities = activities.filter((_, i) => i !== index);
    setActivities(newActivities);
  };

  // Updated `postSchedule` function to handle posting activities
const postSchedule = async (newSchedule) => {
  setLoading(true);
  try {
    const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh', newSchedule);

    if (response.status === 200 || response.status === 201) {
      alert('Lịch trình được tạo thành công');
      
      // Post each activity with `maLichTrinh` from the created schedule
      const maLichTrinh = response.data.maLichTrinh; // assuming the response includes the created `maLichTrinh`
      await Promise.all(
        activities.map(activity => 
          axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh', {
            ngay: activity.ngay,
            moTaHoatDong: activity.moTaHoatDong,
            maLichTrinh: maLichTrinh
          })
        )
      );
      
      fetchSchedules(); // Refresh the list of schedules
    } else {
      throw new Error('Thêm lịch trình thất bại');
    }
  } catch (error) {
    console.error('Có lỗi xảy ra khi thêm lịch trình:', error);
    alert('Có lỗi xảy ra khi thêm lịch trình');
    setError(error);
  } finally {
    setLoading(false);
  }
};


  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh');
      setSchedules(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityDescriptions = async (maLichTrinh) => {
    setLoading(true);
    try {
      const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh/mt/${maLichTrinh}`);
      setActivities(response.data); // Giả sử response.data là mảng mô tả hoạt động
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSchedule = {
      ...scheduleData,
      activities: activities.map(activity => ({
        ngay: activity.ngay,
        moTaHoatDong: activity.moTaHoatDong,
      })),
    };
    if (editingSchedule) {
      updateSchedule(newSchedule);
    } else {
      postSchedule(newSchedule);
    }
    
    setScheduleData({
      tenLichTrinh: "",
      maTour: ""
    });
    setActivities([{ ngay: "", moTaHoatDong: "" }]);
    setEditingSchedule(null);
  };

  


  const handleEdit = async (schedule) => {
    setScheduleData({
      tenLichTrinh: schedule.tenLichTrinh,
      maTour: schedule.maTour
    });
    setEditingSchedule(schedule);
    await fetchActivityDescriptions(schedule.maLichTrinh); // Tải mô tả hoạt động
  };

  const handleDelete = async (maLichTrinh) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa lịch trình này không?')) {
      setLoading(true);
      try {
        await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh/${maLichTrinh}`);
        alert('Xóa lịch trình thành công');
        fetchSchedules();
      } catch (error) {
        console.error('Có lỗi xảy ra khi xóa lịch trình:', error);
        alert('Có lỗi xảy ra khi xóa lịch trình');
        setError(error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
        setTours(response.data); 
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
    fetchSchedules();
  }, []);

  return (
    <div className="admin-container-one">
      <h1>Lịch Trình</h1>
      {loading && <p>Đang tải...</p>}
      {/* {error && <p>Có lỗi xảy ra: {error.message}</p>} */}
      
      <form onSubmit={handleSubmit} className="admin-form-one">
        <input
          type="text"
          name="tenLichTrinh"
          placeholder="Tên Lịch Trình"
          value={scheduleData.tenLichTrinh}
          onChange={handleChange}
          required
        />
        
        <select
          name="maTour"
          value={scheduleData.maTour}
          onChange={handleChange}
          required
        >
          <option value="">Chọn Tour</option>
          {tours.map((tour) => (
            <option key={tour.maTour} value={tour.maTour}>
              {tour.tenTour}
            </option>
          ))}
        </select>

        <h2>Hoạt động</h2>
        {activities.map((activity, index) => (
          <div key={index} className="activity-input">
            <input
              type="text"
              name="ngay"
              placeholder={`Ngày ${index + 1}`}
              value={activity.ngay}
              onChange={(e) => handleActivityChange(index, e)}
              required
            />
            <textarea
              name="moTaHoatDong"
              placeholder="Mô Tả Hoạt Động"
              value={activity.moTaHoatDong}
              onChange={(e) => handleActivityChange(index, e)}
              rows={3}
              required
              style={{ width: "100%", resize: "none", wordWrap: "break-word" }}
            />
            <button type="button" onClick={() => removeActivity(index)}>Xóa</button>
          </div>
        ))}

        <button type="submit" className="create-schedule-button-one">{editingSchedule ? 'Cập nhật Lịch Trình' : 'Thêm Lịch Trình'}</button>
        <button type="button" className="create-schedule-button-one" onClick={() => navigate('/admin')}>Quay lại Bảng Điều Khiển Admin</button>
      </form>

      <h2>Lịch sử Lịch Trình</h2>
      <table>
        <thead>
          <tr>
            <th>Mã Lịch Trình</th>
            <th>Tên Lịch Trình</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map(schedule => (
            <tr key={schedule.maLichTrinh}>
              <td>{schedule.maLichTrinh}</td>
              <td>{schedule.tenLichTrinh}</td>
              <td>
                <button onClick={() => handleEdit(schedule)}>Sửa</button>
                <button onClick={() => handleDelete(schedule.maLichTrinh)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LichTrinh;
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import "../../src/pages/LichTrinh.css";

// const LichTrinh = () => {
//   const [scheduleData, setScheduleData] = useState({
//     tenLichTrinh: "",
//     maTour: ""  
//   });
//   const [activities, setActivities] = useState([{ ngay: "", moTaHoatDong: "" }]);
//   const [tours, setTours] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [schedules, setSchedules] = useState([]);
//   const [editingSchedule, setEditingSchedule] = useState(null);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setScheduleData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
  
//     if (name === "maTour") {
//       const selectedTour = tours.find(tour => tour.maTour === value);
//       if (selectedTour) {
//         const timeDetails = selectedTour.thoiGianTour;
//         const daysMatch = timeDetails.match(/(\d+) ngày/);
//         const numberOfDays = daysMatch ? parseInt(daysMatch[1]) : 0;
  
//         const newActivities = Array.from({ length: numberOfDays }, (_, index) => ({
//           ngay: `Ngày ${index + 1}`,
//           moTaHoatDong: ""
//         }));
//         setActivities(newActivities);
//       }
//     }
//   };

//   const handleActivityChange = (index, e) => {
//     const newActivities = [...activities];
//     newActivities[index][e.target.name] = e.target.value;
//     setActivities(newActivities);
//   };

//   const removeActivity = (index) => {
//     const newActivities = activities.filter((_, i) => i !== index);
//     setActivities(newActivities);
//   };

//   const postSchedule = async (newSchedule) => {
//     setLoading(true);
//     try {
//       const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh', newSchedule);

//       if (response.status === 200 || response.status === 201) {
//         alert('Lịch trình được tạo thành công');
//         const maLichTrinh = response.data.maLichTrinh;
//         await Promise.all(
//           activities.map(activity => 
//             axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh', {
//               ngay: activity.ngay,
//               moTaHoatDong: activity.moTaHoatDong,
//               maLichTrinh: maLichTrinh
//             })
//           )
//         );
//         fetchSchedules();
//       } else {
//         throw new Error('Thêm lịch trình thất bại');
//       }
//     } catch (error) {
//       console.error('Có lỗi xảy ra khi thêm lịch trình:', error);
//       alert('Có lỗi xảy ra khi thêm lịch trình');
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateSchedule = async (updatedSchedule) => {
//     setLoading(true);
//     try {
//         // Chỉ gọi API để cập nhật lịch trình
//         await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh/${editingSchedule.maLichTrinh}`, updatedSchedule);

//         alert('Lịch trình được cập nhật thành công');
//         fetchSchedules();
//     } catch (error) {
//         console.error('Có lỗi xảy ra khi cập nhật lịch trình:', error);
//         alert('Có lỗi xảy ra khi cập nhật lịch trình');
//         setError(error);
//     } finally {
//         setLoading(false);
//     }
// };


//   const fetchSchedules = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh');
//       setSchedules(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchActivityDescriptions = async (maLichTrinh) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh/mt/${maLichTrinh}`);
//       setActivities(response.data);
//     } catch (err) {
//       setError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newSchedule = {
//         ...scheduleData,
//     };
    
//     if (editingSchedule) {
//         // Nếu đang ở chế độ chỉnh sửa, chỉ cập nhật lịch trình
//         updateSchedule(newSchedule);
//     } else {
//         // Nếu không, thêm lịch trình mới
//         postSchedule(newSchedule);
//     }
    
//     setScheduleData({
//         tenLichTrinh: "",
//         maTour: ""
//     });
//     setActivities([{ ngay: "", moTaHoatDong: "" }]);
//     setEditingSchedule(null);
// };


//   const handleEdit = async (schedule) => {
//     setScheduleData({
//       tenLichTrinh: schedule.tenLichTrinh,
//       maTour: schedule.maTour
//     });
//     setEditingSchedule(schedule);
//     await fetchActivityDescriptions(schedule.maLichTrinh);
//   };

//   const handleDelete = async (maLichTrinh) => {
//     if (window.confirm('Bạn có chắc chắn muốn xóa lịch trình này không?')) {
//         setLoading(true);
//         try {
//             // Lấy tất cả mô tả hoạt động của lịch trình
//             const activitiesResponse = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh/mt/${maLichTrinh}`);
            
//             // Kiểm tra nếu có hoạt động nào cần xóa
//             if (!activitiesResponse.data || activitiesResponse.data.length === 0) {
//                 console.warn('Không có mô tả hoạt động nào cần xóa.');
//             }

//             // Xóa từng mô tả hoạt động dựa vào `ngay`
//             await Promise.all(activitiesResponse.data.map(activity => {
//                 return axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/MoTaLichTrinh/${activity.ngay}`);
//             }));

//             // Sau khi xóa hết mô tả hoạt động, tiến hành xóa lịch trình
//             await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/sc/LichTrinh/${maLichTrinh}`);
            
//             alert('Xóa lịch trình thành công');
//             fetchSchedules();
//         } catch (error) {
//             console.error('Có lỗi xảy ra khi xóa lịch trình:', error);
//             alert('Có lỗi xảy ra khi xóa lịch trình');
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     }
// };



//   useEffect(() => {
//     const fetchTours = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
//         setTours(response.data); 
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTours();
//     fetchSchedules();
//   }, []);

//   return (
//     <div className="admin-container-one">
//       <h1>Lịch Trình</h1>
//       {loading && <p>Đang tải...</p>}
      
//       <form onSubmit={handleSubmit} className="admin-form-one">
//         <input
//           type="text"
//           name="tenLichTrinh"
//           placeholder="Tên Lịch Trình"
//           value={scheduleData.tenLichTrinh}
//           onChange={handleChange}
//           required
//         />
        
//         <select
//           name="maTour"
//           value={scheduleData.maTour}
//           onChange={handleChange}
//           required
//         >
//           <option value="">Chọn Tour</option>
//           {tours.map((tour) => (
//             <option key={tour.maTour} value={tour.maTour}>
//               {tour.tenTour}
//             </option>
//           ))}
//         </select>

//         <h2>Hoạt động</h2>
//         {activities.map((activity, index) => (
//           <div key={index} className="activity-input">
//             <input
//               type="text"
//               name="ngay"
//               placeholder={`Ngày ${index + 1}`}
//               value={activity.ngay}
//               onChange={(e) => handleActivityChange(index, e)}
//               required
//             />
//             <textarea
//               name="moTaHoatDong"
//               placeholder="Mô Tả Hoạt Động"
//               value={activity.moTaHoatDong}
//               onChange={(e) => handleActivityChange(index, e)}
//               rows={3}
//               required
//               style={{ width: "100%", resize: "none", wordWrap: "break-word" }}
//             />
//             <button type="button" onClick={() => removeActivity(index)}>Xóa</button>
//           </div>
//         ))}

//         <button type="submit" className="create-schedule-button-one">{editingSchedule ? 'Cập nhật Lịch Trình' : 'Thêm Lịch Trình'}</button>
//         <button type="button" className="create-schedule-button-one" onClick={() => navigate('/admin')}>Quay lại Bảng Điều Khiển Admin</button>
//       </form>

//       <h2>Lịch sử Lịch Trình</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Mã Lịch Trình</th>
//             <th>Tên Lịch Trình</th>
//             <th>Thao Tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {schedules.map(schedule => (
//             <tr key={schedule.maLichTrinh}>
//               <td>{schedule.maLichTrinh}</td>
//               <td>{schedule.tenLichTrinh}</td>
//               <td>
//                 <button onClick={() => handleEdit(schedule)}>Sửa</button>
//                 <button onClick={() => handleDelete(schedule.maLichTrinh)}>Xóa</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default LichTrinh;
