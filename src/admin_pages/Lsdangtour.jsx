import { useEffect, useState } from 'react';
import axios from 'axios';

const Lsdangtour = () => {
  const [tours, setTours] = useState([]);
  const [tourTypes, setTourTypes] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch tours and tour types from the API
  const fetchToursAndTypes = async () => {
    try {
      const [tourResponse, typesResponse] = await Promise.all([
        axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour'),
        axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/category/LoaiTour')
      ]);

      setTours(tourResponse.data);
      setTourTypes(typesResponse.data);
    } catch (error) {
      console.error('Error fetching tours or tour types:', error);
    }
  };

  useEffect(() => {
    fetchToursAndTypes();
  }, []);

  // Function to update tours list after changes
  const updateToursList = async () => {
    try {
      const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
      setTours(response.data);
    } catch (error) {
      console.error('Error updating tours list:', error);
    }
  };

  const handleEditClick = (tour) => {
    setSelectedTour({ ...tour });
    setIsEditing(true);
  };

  const handleClose = () => {
    setIsEditing(false);
    setSelectedTour(null);
  };

  const handleSave = async () => {
    const confirm = window.confirm("Bạn có chắc chắn muốn sửa thông tin tour này?");
    if (confirm && selectedTour) {
      try {
        const currentDate = new Date().toISOString();
        const updatedTour = {
          ...selectedTour,
          thoiGianDang: currentDate,
        };

        await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${selectedTour.maTour}`, updatedTour);
        alert("Cập nhật tour thành công!");
        handleClose();
        updateToursList(); // Reload tours after saving changes
      } catch (error) {
        console.error('Error updating tour:', error);
        alert("Cập nhật tour thất bại!");
      }
    }
  };

  const handleDelete = async (tour) => {
    const tourCode = tour.maTour;
    const confirm = window.confirm(`Bạn có chắc chắn muốn xóa tour với mã: ${tourCode}?`);
    
    if (confirm) {
      try {
        await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour/${tourCode}`);
        alert("Xóa tour thành công!");
        updateToursList(); // Reload tours after deleting
        setSelectedTour(null);
      } catch (error) {
        console.error('Error deleting tour:', error);
        alert("Xóa tour thất bại! Vui lòng kiểm tra lại.");
      }
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4 md:px-8 lg:px-16">
      <h2 className="text-2xl font-bold text-center mb-6">Lịch sử đăng tour</h2>
      <div className="overflow-x-auto">
        <table style={{ width: '100%' }} className="bg-white border border-gray-200 text-center">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-6 border border-gray-300">Tên Tour</th>
              <th className="py-3 px-6 border border-gray-300">Thời gian đăng</th>
              <th className="py-3 px-6 border border-gray-300">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((tour) => (
              <tr key={tour.maTour} className="hover:bg-gray-50">
                <td className={`py-2 px-6 border border-gray-300 cursor-pointer ${selectedTour?.maTour === tour.maTour ? 'text-red-500' : ''}`}>
                  {tour.tenTour}
                </td>
                <td className="py-2 px-6 border border-gray-300">
                  {new Date(tour.thoiGianDang).toLocaleDateString()}
                </td>
                <td className="py-2 px-6 border border-gray-300 flex justify-center space-x-4">
                  <button
                    className="bg-blue-400 text-black py-1 px-3 rounded hover:bg-blue-500"
                    onClick={() => handleEditClick(tour)}
                  >
                    Sửa
                  </button>
                  <button 
                    className="bg-red-500 text-black py-1 px-3 rounded hover:bg-red-600"
                    onClick={() => handleDelete(tour)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isEditing && selectedTour && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">Chỉnh sửa Tour</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">Mã Tour</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.maTour}
                readOnly
              />
            </div>
            <div>
              <label className="block mb-2">Tên Tour</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.tenTour}
                onChange={(e) => setSelectedTour({ ...selectedTour, tenTour: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Thời gian tour </label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.thoiGianTour}
                onChange={(e) => setSelectedTour({ ...selectedTour, thoiGianTour: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Giá</label>
              <input
                type="number"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.gia}
                onChange={(e) => setSelectedTour({ ...selectedTour, gia: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Phương Tiện Di Chuyển</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.phuongTienDiChuyen}
                onChange={(e) => setSelectedTour({ ...selectedTour, phuongTienDiChuyen: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Hình ảnh</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.hinhAnh}
                onChange={(e) => setSelectedTour({ ...selectedTour, hinhAnh: e.target.value })}
              />
            </div>
            <div>
              <label className="block mb-2">Thời gian đăng</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={new Date().toLocaleString()} // Show current time
                readOnly // Make the field read-only
              />
            </div>
            <div>
              <label className="block mb-2">Trạng Thái</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.trangThai}
                onChange={(e) => setSelectedTour({ ...selectedTour, trangThai: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block mb-2">Loại Tour</label>
              <select
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.maLoai}
                onChange={(e) => setSelectedTour({ ...selectedTour, maLoai: e.target.value })}
              >
                {tourTypes.map((type) => (
                  <option key={type.maLoai} value={type.maLoai}>
                    {type.tenLoai}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-2">Công Ty</label>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded w-full"
                value={selectedTour.maCongTy}
                readOnly
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              className="bg-green-500 text-black py-2 px-6 rounded hover:bg-green-600 mr-4"
              onClick={handleSave}
            >
              Lưu
            </button>
            <button
              className="bg-gray-500 text-black py-2 px-6 rounded hover:bg-gray-600"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lsdangtour;
