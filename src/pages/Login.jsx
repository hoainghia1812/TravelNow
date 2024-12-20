
import { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import userIcon from '../assets/images/user.png';
import { useAuth } from '../context/AuthContext';
import '../styles/login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ phone_number: '', email: '' });
    const [errorMessages, setErrorMessages] = useState('');
    const navigate = useNavigate();
    const { setUser } = useAuth();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
        setErrorMessages('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessages('');
    
        if (!credentials.phone_number || !credentials.email) {
            setErrorMessages('Vui lòng nhập đầy đủ thông tin.');
            return;
        }
    
        try {
            const response = await fetch(
                `https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung/${credentials.phone_number}`
            );
    
            if (!response.ok) {
                throw new Error('Không thể lấy dữ liệu từ server');
            }
    
            const data = await response.json();
    
            if (data.sdtNguoiDung === credentials.phone_number && data.email === credentials.email) {
                setUser(data); // Lưu thông tin người dùng vào context và localStorage
    
                // Điều hướng dựa trên vai trò của người dùng
                if (data.role === 0) {
                    navigate('/home');
                } else if (data.role === 1) {
                    navigate('/admin');
                } else if (data.role === 2) {
                    navigate('/travelnow');
                } else {
                    setErrorMessages('Vai trò người dùng không hợp lệ.');
                }
            } else {
                setErrorMessages('Thông tin đăng nhập không chính xác. Vui lòng kiểm tra lại.');
            }
        } catch (error) {
            setErrorMessages('Đăng nhập thất bại. Vui lòng thử lại sau.');
            console.error('Error during login:', error);
        }
    };
    

    const loginImg = "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" className="m-auto">
                        <div className="login__container d-flex justify-content-between">
                            <div className="login__img">
                                <img src={loginImg} alt="Login background" />
                            </div>
                            <div className="login__form">
                                <div className="user">
                                    <img src={userIcon} alt="User icon" />
                                </div>
                                <h2>Đăng nhập</h2>
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup>
                                        <input
                                            type="text"
                                            placeholder="Số điện thoại"
                                            required
                                            id="phone_number"
                                            pattern="^0[0-9]{9}$"
                                            title="Số điện thoại phải có định dạng 0937195324"
                                            onChange={handleChange}
                                            value={credentials.phone_number}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <input
                                            type="email"
                                            placeholder="Gmail"
                                            required
                                            id="email"
                                            onChange={handleChange}
                                            value={credentials.email}
                                        />
                                    </FormGroup>
                                    {errorMessages && (
                                        <div className="error-message">{errorMessages}</div>
                                    )}
                                    <Button className="btn secondary__btn auth__btn" type="submit">
                                        Đăng nhập
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Login;
