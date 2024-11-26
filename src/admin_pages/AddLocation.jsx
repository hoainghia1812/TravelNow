

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/adminAdd.css";
import '../admin_pages/AddLocation.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import { Container } from 'reactstrap';
import Swal from 'sweetalert2';


const AddInvoice = () => {
  const [selectedChiTiet, setSelectedChiTiet] = useState(null);
  const [tourTypes, setTourTypes] = useState([]);
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

  const fetchToursAndTypes = async () => {
    try {
      const response = await axios.get('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/tour/Tour');
      setTourTypes(response.data);
    } catch (error) {
      toast.error('Error fetching tours:', error);
    }
  };

  useEffect(() => {
    fetchToursAndTypes();
  }, []);

  const [invoices, setInvoices] = useState([]);
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour')
      .then(response => {
        if (!response.ok) throw new Error('Không thể lấy được dữ liệu');
        return response.json();
      })
      .then(data => {
        setInvoices(data);
        setError(null);
      })
      .catch(error => {
        setError("Chưa lấy được dữ liệu từ server");
        toast.error("Error fetching invoices:", error);
      });
  }, []);

  const handleChange = (e) => {
    setInvoiceData({
      ...invoiceData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ngayDi, ngayVe, gioKhoiHanh, gioVe } = invoiceData;

    if (new Date(ngayDi) >= new Date(ngayVe)) {
        toast('Ngày đi phải trước ngày về');
        return;
    }

    try {
        const formattedGioKhoiHanh = new Date(`1970-01-01T${gioKhoiHanh}`).toLocaleTimeString('it-IT', { hour12: false });
        const formattedGioVe = new Date(`1970-01-01T${gioVe}`).toLocaleTimeString('it-IT', { hour12: false });

        const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour', {
            ...invoiceData,
            gioKhoiHanh: formattedGioKhoiHanh, 
            gioVe: formattedGioVe 
        });

        setInvoices(prevInvoices => [...prevInvoices, response.data]);
        toast("Chi tiết tour được thêm thành công!");

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
          maTour: ""
        });
    } catch (error) {
        console.error("Error adding tour:", error.response?.data || error.message);
        toast("Đã xảy ra lỗi khi thêm chi tiết tour.");
    }
  };

  const handleEdit = async (invoice) => {
    try {
      const response = await axios.get(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${invoice.maChiTiet}`);
      setInvoiceData(response.data);
      setEditingInvoice(invoice.maChiTiet); 
    } catch  {
      toast("Không thể lấy chi tiết hóa đơn để sửa.");
    }
  };

  const handleClose = () => {
    setEditingInvoice(null); 
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
      maTour: ""
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { ngayDi, ngayVe, gioKhoiHanh, gioVe } = invoiceData;

    if (new Date(ngayDi) >= new Date(ngayVe)) {
        toast('Ngày đi phải trước ngày về');
        return;
    }

    try {
        const formattedGioKhoiHanh = new Date(`1970-01-01T${gioKhoiHanh}`).toLocaleTimeString('it-IT', { hour12: false });
        const formattedGioVe = new Date(`1970-01-01T${gioVe}`).toLocaleTimeString('it-IT', { hour12: false });

        const response = await axios.put(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${editingInvoice}`, {
            ...invoiceData,
            gioKhoiHanh: formattedGioKhoiHanh,
            gioVe: formattedGioVe
        });

        setInvoices(prevInvoices => prevInvoices.map(invoice => invoice.maChiTiet === editingInvoice ? response.data : invoice));
        toast("Chi tiết tour đã được cập nhật thành công!");
        setEditingInvoice(null); 
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
          maTour: ""
        });
    } catch (error) {
        toast.error("Error updating tour:", error.response?.data || error.message);
        toast("Đã xảy ra lỗi khi cập nhật chi tiết tour.");
    }
  };

  const handleDelete = async (invoice) => {
    const chitietCode = invoice.maChiTiet;
    
    Swal.fire({
      title: `Bạn có chắc muốn xóa chi tiết tour: ${chitietCode}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'OK',
      cancelButtonText: 'Hủy'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/api/ChiTietTour/${chitietCode}`);
          toast.success("Xóa thành công!");
          setInvoices(prevInvoices => prevInvoices.filter(inv => inv.maChiTiet !== chitietCode));
          setSelectedChiTiet(null); 
        } catch (error) {
          console.error("Error deleting tour:", error.response?.data || error.message);
          alert("Đã xảy ra lỗi khi xóa chi tiết tour.");
        }
      }
    });
  };
  
  return (
    <Container>
      <ToastContainer/>
    <div className="admin-container-one">
      <h1>Chi Tiết Tour</h1>
      <form onSubmit={editingInvoice ? handleUpdate : handleSubmit} className="admin-form-one">
        <div className="form-grid">
          <div className="form-column">
            <input type="date" name="ngayDi" value={invoiceData.ngayDi} onChange={handleChange} required />
            <input type="date" name="ngayVe" value={invoiceData.ngayVe} onChange={handleChange} required />
            <input type="text" name="noiDi" placeholder="Nơi đi" value={invoiceData.noiDi} onChange={handleChange} required />
            <input type="text" name="noiDen" placeholder="Nơi đến" value={invoiceData.noiDen} onChange={handleChange} required />
            <input type="text" name="khachSan" placeholder="Khách sạn" value={invoiceData.khachSan} onChange={handleChange} required />
          </div>
          <div className="form-column">
            <input type="time" name="gioKhoiHanh" value={invoiceData.gioKhoiHanh} onChange={handleChange} required />
            <input type="time" name="gioVe" value={invoiceData.gioVe} onChange={handleChange} required />
            <input type="text" name="phuongTienDiChuyen" placeholder="Phương tiện di chuyển" value={invoiceData.phuongTienDiChuyen} onChange={handleChange} required />
            <input type="number" name="gia" placeholder="Giá" value={invoiceData.gia} onChange={handleChange} required min={100000} />
            <select name="maTour" value={invoiceData.maTour} onChange={handleChange} required>
              <option value="" disabled>Chọn mã tour</option>
              {tourTypes.map((tour) => <option key={tour.maTour} value={tour.maTour}>{tour.tenTour}</option>)}
            </select>
          </div>
        </div>
        <textarea name="moTaTour" value={invoiceData.moTaTour} onChange={handleChange} placeholder="Mô tả tour" rows="4" required />
        <button type="submit">{editingInvoice ? "Cập nhật" : "Thêm"}</button>
        {editingInvoice && <button type="button" onClick={handleClose}>Đóng</button>}
      </form>

      <table className="table-details">
        <thead>
          <tr>
            <th>Mã Chi Tiết</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.maChiTiet}>
              <td>{invoice.maChiTiet}</td>
              
              <td>
                <button onClick={() => handleEdit(invoice)}>Sửa</button>
                <button onClick={() => handleDelete(invoice)}>Xóa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </Container>
  );
};

export default AddInvoice;

