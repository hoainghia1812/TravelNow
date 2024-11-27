  import React from 'react';
  import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
  import { useNavigate } from 'react-router-dom';

  const Admin = () => {
    const navigate = useNavigate();

    const handleNavigateToCongTy = () => {
      navigate('/congty');
    };

    const handleNavigateToDanhgia = () => {
      navigate('/danhgia');
    };
    const handleNavigateToDoanhThu = () => {
      navigate('/doanhthu');
    };
    const handleNavigateToKhieuNai = () => {
      navigate('/khieunai');
    };
    const handleNavigateToCk = () => {
      navigate('/chietkhau');
    };
    // const handleNavigateToUser = () => {
    //   navigate('/quanlynguoidung');
    // };
    const handleNavigateQLDT = () => {
      navigate('/qldattour');
    };
    return (
      <Container className="mt-5 admin-container">
        <Row>
          <Col md="12">
            <h2 className="text-center mb-4">Quản Lý Sàn</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToCongTy}>
                  Quản Lý Công Ty
                </Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToDanhgia}>Quản Lý Đánh Giá</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToKhieuNai}>Quản Lý Khiếu Nại</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToCk}>Chiết Khấu Của Sàn</Button>
              </CardBody>
            </Card>
          </Col>
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToDoanhThu}>Doanh Thu</Button>
              </CardBody>
            </Card>
          </Col>
          {/* <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateToUser}>Quản lý người dùng</Button>
              </CardBody>
            </Card>
          </Col> */}
          <Col md="6" lg="4">
            <Card className="mb-4">
              <CardBody className="text-center">
                <Button color="primary" block onClick={handleNavigateQLDT}>Quản lý đặt tour</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  };

  export default Admin;
