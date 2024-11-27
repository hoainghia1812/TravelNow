

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "../styles/adminAdd.css";
// import '../admin_pages/AddLocation.css';
// import 'react-toastify/dist/ReactToastify.css';
// import axios from "axios";
// import { toast, ToastContainer } from 'react-toastify';
// import { Container } from 'reactstrap';
// import Swal from 'sweetalert2';


// const AddInvoice = () => {
//   const [selectedChiTiet, setSelectedChiTiet] = useState(null);
//   const [tourTypes, setTourTypes] = useState([]);
//   const [invoiceData, setInvoiceData] = useState({
//     gia: "",
//     ngayDi: "",
//     ngayVe: "",
//     gioKhoiHanh: "",
//     gioVe: "",
//     khachSan: "",
//     phuongTienDiChuyen: "",
//     moTaTour: "",
//     noiDi: "",
//     noiDen: "",
//     maTour: "",
//   });

//   const fetchToursAndTypes = async () => {
//     try {
//       const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
//       setTourTypes(response.data);
//     } catch (error) {
//       toast.error('Error fetching tours:', error);
//     }
//   };

//   useEffect(() => {
//     fetchToursAndTypes();
//   }, []);

//   const [invoices, setInvoices] = useState([]);
//   const [editingInvoice, setEditingInvoice] = useState(null);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour')
//       .then(response => {
//         if (!response.ok) throw new Error('Không thể lấy được dữ liệu');
//         return response.json();
//       })
//       .then(data => {
//         setInvoices(data);
//         setError(null);
//       })
//       .catch(error => {
//         setError("Chưa lấy được dữ liệu từ server");
//         toast.error("Error fetching invoices:", error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     setInvoiceData({
//       ...invoiceData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { ngayDi, ngayVe, gioKhoiHanh, gioVe } = invoiceData;

//     if (new Date(ngayDi) >= new Date(ngayVe)) {
//         toast('Ngày đi phải trước ngày về');
//         return;
//     }

//     try {
//         const formattedGioKhoiHanh = new Date(`1970-01-01T${gioKhoiHanh}`).toLocaleTimeString('it-IT', { hour12: false });
//         const formattedGioVe = new Date(`1970-01-01T${gioVe}`).toLocaleTimeString('it-IT', { hour12: false });

//         const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour', {
//             ...invoiceData,
//             gioKhoiHanh: formattedGioKhoiHanh, 
//             gioVe: formattedGioVe 
//         });

//         setInvoices(prevInvoices => [...prevInvoices, response.data]);
//         toast("Chi tiết tour được thêm thành công!");

//         setInvoiceData({
//           gia: "",
//           ngayDi: "",
//           ngayVe: "",
//           gioKhoiHanh: "",
//           gioVe: "",
//           khachSan: "",
//           phuongTienDiChuyen: "",
//           moTaTour: "",
//           noiDi: "",
//           noiDen: "",
//           maTour: ""
//         });
//     } catch (error) {
//         console.error("Error adding tour:", error.response?.data || error.message);
//         toast("Đã xảy ra lỗi khi thêm chi tiết tour.");
//     }
//   };

//   const handleEdit = async (invoice) => {
//     try {
//       const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${invoice.maChiTiet}`);
//       setInvoiceData(response.data);
//       setEditingInvoice(invoice.maChiTiet); 
//     } catch  {
//       toast("Không thể lấy chi tiết hóa đơn để sửa.");
//     }
//   };

//   const handleClose = () => {
//     setEditingInvoice(null); 
//     setInvoiceData({
//       gia: "",
//       ngayDi: "",
//       ngayVe: "",
//       gioKhoiHanh: "",
//       gioVe: "",
//       khachSan: "",
//       phuongTienDiChuyen: "",
//       moTaTour: "",
//       noiDi: "",
//       noiDen: "",
//       maTour: ""
//     });
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const { ngayDi, ngayVe, gioKhoiHanh, gioVe } = invoiceData;

//     if (new Date(ngayDi) >= new Date(ngayVe)) {
//         toast('Ngày đi phải trước ngày về');
//         return;
//     }

//     try {
//         const formattedGioKhoiHanh = new Date(`1970-01-01T${gioKhoiHanh}`).toLocaleTimeString('it-IT', { hour12: false });
//         const formattedGioVe = new Date(`1970-01-01T${gioVe}`).toLocaleTimeString('it-IT', { hour12: false });

//         const response = await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${editingInvoice}`, {
//             ...invoiceData,
//             gioKhoiHanh: formattedGioKhoiHanh,
//             gioVe: formattedGioVe
//         });

//         setInvoices(prevInvoices => prevInvoices.map(invoice => invoice.maChiTiet === editingInvoice ? response.data : invoice));
//         toast("Chi tiết tour đã được cập nhật thành công!");
//         setEditingInvoice(null); 
//         setInvoiceData({
//           gia: "",
//           ngayDi: "",
//           ngayVe: "",
//           gioKhoiHanh: "",
//           gioVe: "",
//           khachSan: "",
//           phuongTienDiChuyen: "",
//           moTaTour: "",
//           noiDi: "",
//           noiDen: "",
//           maTour: ""
//         });
//     } catch (error) {
//         toast.error("Error updating tour:", error.response?.data || error.message);
//         toast("Đã xảy ra lỗi khi cập nhật chi tiết tour.");
//     }
//   };

//   const handleDelete = async (invoice) => {
//     const chitietCode = invoice.maChiTiet;
    
//     Swal.fire({
//       title: `Bạn có chắc muốn xóa chi tiết tour: ${chitietCode}?`,
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonText: 'OK',
//       cancelButtonText: 'Hủy'
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${chitietCode}`);
//           toast.success("Xóa thành công!");
//           setInvoices(prevInvoices => prevInvoices.filter(inv => inv.maChiTiet !== chitietCode));
//           setSelectedChiTiet(null); 
//         } catch (error) {
//           console.error("Error deleting tour:", error.response?.data || error.message);
//           alert("Đã xảy ra lỗi khi xóa chi tiết tour.");
//         }
//       }
//     });
//   };
  
//   return (
//     <Container>
//       <ToastContainer/>
//     <div className="admin-container-one">
//       <h1>Chi Tiết Tour</h1>
//       <form onSubmit={editingInvoice ? handleUpdate : handleSubmit} className="admin-form-one">
//         <div className="form-grid">
//           <div className="form-column">
//             <input type="date" name="ngayDi" value={invoiceData.ngayDi} onChange={handleChange} required />
//             <input type="date" name="ngayVe" value={invoiceData.ngayVe} onChange={handleChange} required />
//             <input type="text" name="noiDi" placeholder="Nơi đi" value={invoiceData.noiDi} onChange={handleChange} required />
//             <input type="text" name="noiDen" placeholder="Nơi đến" value={invoiceData.noiDen} onChange={handleChange} required />
//             <input type="text" name="khachSan" placeholder="Khách sạn" value={invoiceData.khachSan} onChange={handleChange} required />
//           </div>
//           <div className="form-column">
//             <input type="time" name="gioKhoiHanh" value={invoiceData.gioKhoiHanh} onChange={handleChange} required />
//             <input type="time" name="gioVe" value={invoiceData.gioVe} onChange={handleChange} required />
//             <input type="text" name="phuongTienDiChuyen" placeholder="Phương tiện di chuyển" value={invoiceData.phuongTienDiChuyen} onChange={handleChange} required />
//             <input type="number" name="gia" placeholder="Giá" value={invoiceData.gia} onChange={handleChange} required min={100000} />
//             <select name="maTour" value={invoiceData.maTour} onChange={handleChange} required>
//               <option value="" disabled>Chọn mã tour</option>
//               {tourTypes.map((tour) => <option key={tour.maTour} value={tour.maTour}>{tour.tenTour}</option>)}
//             </select>
//           </div>
//         </div>
//         <textarea name="moTaTour" value={invoiceData.moTaTour} onChange={handleChange} placeholder="Mô tả tour" rows="4" required />
//         <button type="submit">{editingInvoice ? "Cập nhật" : "Thêm"}</button>
//         {editingInvoice && <button type="button" onClick={handleClose}>Đóng</button>}
//       </form>

//       <table className="table-details">
//         <thead>
//           <tr>
//             <th>Mã Chi Tiết</th>
//             <th>Thao tác</th>
//           </tr>
//         </thead>
//         <tbody>
//           {invoices.map((invoice) => (
//             <tr key={invoice.maChiTiet}>
//               <td>{invoice.maChiTiet}</td>
              
//               <td>
//                 <button onClick={() => handleEdit(invoice)}>Sửa</button>
//                 <button onClick={() => handleDelete(invoice)}>Xóa</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </Container>
//   );
// };

// export default AddInvoice;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/adminAdd.css";
import '../admin_pages/AddLocation.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';

const AddInvoice = () => {
  const [selectedChiTiet, setSelectedChiTiet] = useState(null);
  const [tourTypes, setTourTypes] = useState([]); 
  const [selectedTourDetails, setSelectedTourDetails] = useState({});
  const [invoiceData, setInvoiceData] = useState({
    gia: "",
    ngayDi: "",
    ngayVe: "",
    gioKhoiHanh: "",
    gioVe: "",
    khachSan: "",
    phuongTienDiChuyen: "",
    moTaTour: "",
    noiDi: "",
    noiDen: "",
    maTour: "",
  });

  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const navigate = useNavigate();
  // Lấy ngày hôm nay dưới dạng "YYYY-MM-DD"
  const today = new Date();
  today.setDate(today.getDate() + 7); // Cộng thêm 7 ngày vào ngày hiện tại
  const minDate = today.toISOString().split("T")[0]; // Định dạng lại thành yyyy-mm-dd
  
  // Fetch list of tours
  const fetchToursAndTypes = async () => {
    try {
      const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
      setTourTypes(response.data);
    } catch (error) {
      toast.error("Error fetching tours");
    }
  };

  // Fetch invoices
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour');
        setInvoices(response.data);
      } catch (error) {
        toast.error("Error fetching invoices");
      }
    };
    fetchInvoices();
    fetchToursAndTypes();
  }, []);

  // Calculate ngayVe based on ngayDi and tour duration
  const calculateNgayVe = (ngayDi, thoiGianTour) => {
    if (!ngayDi || !thoiGianTour) return null;

    // Extract days and nights from tour time string
    const [soNgay, soDem] = thoiGianTour.match(/\d+/g).map(Number); 
    const soLonNhat = Math.max(soNgay, soDem); // Choose the greater value between days and nights
    const ngayDiDate = new Date(ngayDi); // Convert ngayDi to Date object

    // Add the greater value (either days or nights) to the departure date
    ngayDiDate.setDate(ngayDiDate.getDate() + soLonNhat);

    return ngayDiDate.toISOString().split("T")[0]; // Return the date as "YYYY-MM-DD"
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData((prev) => ({
      ...prev,
      [name]: value,
    }));
  
    // Fetch and display additional tour details based on selected maTour
    if (name === "maTour") {
      const selectedTour = tourTypes.find((tour) => tour.maTour === value);
      if (selectedTour) {
        setSelectedTourDetails(selectedTour);
  
        // Calculate and set the ngayVe based on ngayDi and the selected tour's thoiGianTour
        const ngayVe = calculateNgayVe(invoiceData.ngayDi, selectedTour.thoiGianTour);
        if (ngayVe) {
          setInvoiceData((prev) => ({
            ...prev,
            ngayVe: ngayVe,
          }));
        }
      } else {
        setSelectedTourDetails({});
      }
    }
  
    // Automatically calculate ngayVe when ngayDi is updated
    if (name === "ngayDi" && selectedTourDetails?.thoiGianTour) {
      const ngayVe = calculateNgayVe(value, selectedTourDetails.thoiGianTour);
      if (ngayVe) {
        setInvoiceData((prev) => ({
          ...prev,
          ngayVe: ngayVe,
        }));
      }
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ngayDi, ngayVe, gioKhoiHanh, gioVe } = invoiceData;

    // Check if ngayDi is before ngayVe
    if (new Date(ngayDi) >= new Date(ngayVe)) {
      toast.error("Ngày đi phải trước ngày về");
      return;
    }

    try {
      // Format gioKhoiHanh and gioVe
      const formattedGioKhoiHanh = new Date(`1970-01-01T${gioKhoiHanh}`).toLocaleTimeString('it-IT', { hour12: false });
      const formattedGioVe = new Date(`1970-01-01T${gioVe}`).toLocaleTimeString('it-IT', { hour12: false });

      // If editing, update the invoice
      if (editingInvoice) {
        const response = await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${editingInvoice.maChiTiet}`, {
          ...invoiceData,
          gioKhoiHanh: formattedGioKhoiHanh,
          gioVe: formattedGioVe,
        });

        // Update the invoice list with the updated invoice
        setInvoices((prev) => prev.map((invoice) => invoice.maChiTiet === editingInvoice.maChiTiet ? response.data : invoice));
        toast.success("Chi tiết tour đã được cập nhật!");
      } else {
        // Submit the form data
        const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour', {
          ...invoiceData,
          gioKhoiHanh: formattedGioKhoiHanh,
          gioVe: formattedGioVe,
        });

        // Update invoice list with new invoice
        setInvoices((prev) => [...prev, response.data]);
        toast.success("Chi tiết tour được thêm thành công!");
      }

      // Reset form data
      setInvoiceData({
        gia: "",
        ngayDi: "",
        ngayVe: "",
        gioKhoiHanh: "",
        gioVe: "",
        khachSan: "",
        phuongTienDiChuyen: "",
        moTaTour: "",
        noiDi: "",
        noiDen: "",
        maTour: "",
      });
      setSelectedTourDetails({});
      setEditingInvoice(null); // Reset editing state
    } catch (error) {
      toast.error("Đã xảy ra lỗi khi thêm/sửa chi tiết tour");
    }
  };

  const handleEdit = (invoice) => {
    setEditingInvoice(invoice);
    setInvoiceData({
      gia: invoice.gia,
      ngayDi: invoice.ngayDi,
      ngayVe: invoice.ngayVe,
      gioKhoiHanh: invoice.gioKhoiHanh,
      gioVe: invoice.gioVe,
      khachSan: invoice.khachSan,
      phuongTienDiChuyen: invoice.phuongTienDiChuyen,
      moTaTour: invoice.moTaTour,
      noiDi: invoice.noiDi,
      noiDen: invoice.noiDen,
      maTour: invoice.maTour,
    });
    
    // Fetch selected tour details to calculate ngayVe based on the tour's thoiGianTour
    const selectedTour = tourTypes.find((tour) => tour.maTour === invoice.maTour);
    if (selectedTour) {
      setSelectedTourDetails(selectedTour);
      const ngayVe = calculateNgayVe(invoice.ngayDi, selectedTour.thoiGianTour);
      setInvoiceData((prev) => ({
        ...prev,
        ngayVe: ngayVe,
      }));
    }
  };

  const handleDelete = async (invoice) => {
    if (window.confirm("Bạn có chắc muốn xóa chi tiết này?")) {
      try {
        await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${invoice.maChiTiet}`);
        setInvoices((prev) => prev.filter((i) => i.maChiTiet !== invoice.maChiTiet));
        toast.success("Chi tiết tour đã được xóa!");
      } catch (error) {
        toast.error("Đã xảy ra lỗi khi xóa chi tiết tour");
      }
    }
  };

  return (
    <Container>
      <ToastContainer />
      <div className="admin-container-one">
        <h1>Chi Tiết Tour</h1>
        <form onSubmit={handleSubmit} className="admin-form-one">
          <div className="form-grid">
            <div className="form-column">
              <select name="maTour" value={invoiceData.maTour} onChange={handleChange} required>
                <option value="">Chọn tour</option>
                {tourTypes.map((tour) => (
                  <option key={tour.maTour} value={tour.maTour}>
                    {tour.tenTour}
                  </option>
                ))}
              </select>
              <input type="date" name="ngayDi" value={invoiceData.ngayDi} min={minDate}  onChange={handleChange} required />
              <input type="date" name="ngayVe" value={invoiceData.ngayVe} onChange={handleChange} disabled required />
              <input type="time" name="gioKhoiHanh" value={invoiceData.gioKhoiHanh} onChange={handleChange} required />
              <input type="time" name="gioVe" value={invoiceData.gioVe} onChange={handleChange} required />
              <input type="text" name="khachSan" value={invoiceData.khachSan} onChange={handleChange} placeholder="Khách Sạn" required />
              <input type="text" name="phuongTienDiChuyen" value={invoiceData.phuongTienDiChuyen} onChange={handleChange} placeholder="Phương Tiện Di Chuyển" required />
            </div>
            <div className="form-column">
              <textarea name="moTaTour" value={invoiceData.moTaTour} onChange={handleChange} placeholder="Mô Tả Tour" required></textarea>
              <input type="text" name="noiDi" value={invoiceData.noiDi} onChange={handleChange} placeholder="Nơi Đi" required />
              <input type="text" name="noiDen" value={invoiceData.noiDen} onChange={handleChange} placeholder="Nơi Đến" required />
              <input
  type="number"
  name="gia"
  value={invoiceData.gia}
  onChange={handleChange}
  placeholder="Giá"
  required
  min={100000}
  onKeyDown={(e) => {
    // Chặn việc nhập dấu trừ "-"
    if (e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  }}
/>

            </div>
          </div>
          <div className="form-actions">
            <button type="submit">Lưu</button>
          </div>
        </form>

        <div>
          <h2>Danh Sách Chi Tiết Tour</h2>
          <table>
            <thead>
              <tr>
                <th>Tour</th>
                
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
  {invoices.map((invoice) => {
    // Find the tour based on maTour
    const tour = tourTypes.find((tour) => tour.maTour === invoice.maTour);
    const tourName = tour ? tour.tenTour : "N/A"; // Default to "N/A" if not found

    return (
      <tr key={invoice.maChiTiet}>
        <td>{tourName}</td> {/* Display the tour name */}
        <td>
          <button onClick={() => handleEdit(invoice)}>Sửa</button>
          <button onClick={() => handleDelete(invoice)}>Xóa</button>
        </td>
      </tr>
    );
  })}
</tbody>

          </table>
        </div>
      </div>
    </Container>
  );
};

export default AddInvoice;
