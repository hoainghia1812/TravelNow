import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const DKCongTy = () => {
  const [diaChi, setDiaChi] = useState('');
  const [sdtCongTy, setSdtCongTy] = useState('');
  const [tenCongTy, setTenCongTy] = useState('');
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
  

 

  // Hàm gọi API để cập nhật thông tin công ty
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu trước khi gửi
    console.log('Dia Chi:', diaChi);
    console.log('Sdt Cong Ty:', sdtCongTy);
    console.log('Ten Cong Ty:', tenCongTy);

    
    
    // Xóa các trường nhập liệu sau khi thêm hoặc cập nhật công ty
    setDiaChi('');
    setSdtCongTy('');
    setTenCongTy('');

    // Gọi hàm fetchCompanies để cập nhật danh sách công ty
  };

  // Hàm để khởi tạo dữ liệu khi bắt đầu chỉnh sửa
 
  useEffect(() => {
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        
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
              Đăng ký công ty
            </Button>
          </Form>
          
        </Col>
      </Row>
    </Container>
  );
};

export default DKCongTy;
