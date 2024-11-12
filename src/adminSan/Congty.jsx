import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Congty = () => {
  const [diaChi, setDiaChi] = useState('');
  const [sdtCongTy, setSdtCongTy] = useState('');
  const [tenCongTy, setTenCongTy] = useState('');
  const [companies, setCompanies] = useState([]); // Danh sách công ty
  const [editingCompanyId, setEditingCompanyId] = useState(null); // ID công ty đang chỉnh sửa
  const navigate = useNavigate(); // Sử dụng useNavigate

  // Hàm gọi API để thêm công ty mới
  const addCompany = async (newCompany) => {
    try {
      const response = await fetch('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCompany),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi thêm công ty');
      }

      const data = await response.json();
      return data; // Dữ liệu của công ty mới
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể thêm công ty. Vui lòng kiểm tra lại.');
    }
  };

  // Hàm gọi API để lấy danh sách công ty
  const fetchCompanies = async () => {
    try {
      const response = await fetch('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour');
      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi lấy danh sách công ty');
      }

      const data = await response.json();
      setCompanies(data); // Cập nhật danh sách công ty
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể lấy danh sách công ty. Vui lòng kiểm tra lại.');
    }
  };

  // Hàm gọi API để xóa công ty
  const deleteCompany = async (maCongTy) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa công ty ${maCongTy}?`)) {
      try {
        const response = await fetch(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour/${maCongTy}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Có lỗi xảy ra khi xóa công ty');
        }

        setCompanies(companies.filter(company => company.maCongTy !== maCongTy));
        alert('Xóa công ty thành công!');
      } catch (error) {
        console.error('Error:', error);
        alert('Không thể xóa công ty. Vui lòng kiểm tra lại.');
      }
    }
  };

  // Hàm gọi API để cập nhật thông tin công ty
  const updateCompany = async (updatedCompany) => {
    try {
      const response = await fetch(`https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/company/CongtyTour/${updatedCompany.maCongTy}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCompany),
      });

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi cập nhật công ty');
      }

      const data = await response.json();
      return data; // Dữ liệu công ty đã cập nhật
    } catch (error) {
      console.error('Error:', error);
      alert('Không thể cập nhật công ty. Vui lòng kiểm tra lại.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    console.log('Dia Chi:', diaChi);
    console.log('Sdt Cong Ty:', sdtCongTy);
    console.log('Ten Cong Ty:', tenCongTy);

    const companyData = {
      diaChi,
      sdtCongTy,
      tenCongTy,
      maCongTy: editingCompanyId || undefined 
    };

    if (editingCompanyId) {
      // Cập nhật công ty
      const updatedCompany = await updateCompany(companyData);
      if (updatedCompany) {
        alert('Cập nhật công ty thành công!');
      }
    } else {
      // Thêm công ty mới
      const addedCompany = await addCompany(companyData);
      if (addedCompany) {
        alert('Thêm công ty thành công!');
      }
    }

    // Xóa các trường nhập liệu sau khi thêm hoặc cập nhật công ty
    setDiaChi('');
    setSdtCongTy('');
    setTenCongTy('');
    setEditingCompanyId(null); // Đặt lại ID khi không còn chỉnh sửa

    // Gọi hàm fetchCompanies để cập nhật danh sách công ty
    fetchCompanies();
  };

  // Hàm để khởi tạo dữ liệu khi bắt đầu chỉnh sửa
  const handleEdit = (company) => {
    setDiaChi(company.diaChi);
    setSdtCongTy(company.sdtCongTy);
    setTenCongTy(company.tenCongTy);
    setEditingCompanyId(company.maCongTy); // Lưu ID công ty đang chỉnh sửa
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col md="12">
          <h2 className="text-center mb-4">{editingCompanyId ? 'Cập Nhật Công Ty' : 'Thêm Công Ty Mới'}</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="6">
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="tenCongTy">Tên Công Ty</Label>
              <Input 
                type="text" 
                name="tenCongTy" 
                id="tenCongTy" 
                placeholder="Nhập tên công ty" 
                value={tenCongTy}
                onChange={(e) => setTenCongTy(e.target.value)} 
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="diaChi">Địa Chỉ</Label>
              <Input 
                type="text" 
                name="diaChi" 
                id="diaChi" 
                placeholder="Nhập địa chỉ" 
                value={diaChi}
                onChange={(e) => setDiaChi(e.target.value)} 
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="sdtCongTy">Số Điện Thoại Công Ty</Label>
              <Input 
                type="text" 
                name="sdtCongTy" 
                id="sdtCongTy" 
                placeholder="Nhập số điện thoại" 
                value={sdtCongTy}
                onChange={(e) => setSdtCongTy(e.target.value)} 
                required
              />
            </FormGroup>
            <Button color="primary" type="submit" block>
              {editingCompanyId ? 'Cập Nhật Công Ty' : 'Thêm Công Ty'}
            </Button>
          </Form>
          <Button color="secondary" className="mt-3" onClick={() => navigate("/travelnow")}>Trở Về</Button> {/* Back button */}
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md="12">
          <h3 className="text-center">Danh Sách Công Ty</h3>
          <Table striped>
            <thead>
              <tr>
                <th>Tên Công Ty</th>
                <th>Địa Chỉ</th>
                <th>Số Điện Thoại</th>
                <th>Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {companies.map(company => (
                <tr key={company.maCongTy}>
                  <td>{company.tenCongTy}</td>
                  <td>{company.diaChi}</td>
                  <td>{company.sdtCongTy}</td>
                  <td>
                    <Button color="warning" onClick={() => handleEdit(company)}>Sửa</Button>
                    <Button color="danger" className="ml-2" onClick={() => deleteCompany(company.maCongTy)}>Xóa</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Congty;
