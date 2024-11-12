import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, ListGroup, ListGroupItem, Button } from "reactstrap";
import { useParams } from "react-router-dom";
import Newletters from "./../shared/Newletters";
import AuthContext from "../context/AuthContext";
import axios from 'axios'; 
import "../styles/tour-details.css";

const Booking = ({ tour, avgRating }) => {
  const { price, reviews, status } = tour;
  const { user } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    fullName: user?.name || "",
    phone: user?.phone_number || "",
    guestSize: 0,
    passengers: []
  });

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleGuestChange = (e) => {
    const guestSize = parseInt(e.target.value, 10);
    const passengers = guestSize > 0 ? [...Array(guestSize)].map(() => ({
      name: "",
      birth_date: "",
      gender: "Nam"
    })) : [];
    setCredentials((prev) => ({ ...prev, guestSize, passengers }));
  };

  const handlePassengerChange = (index, e) => {
    const updatedPassengers = [...credentials.passengers];
    updatedPassengers[index][e.target.id] = e.target.value;
    setCredentials((prev) => ({ ...prev, passengers: updatedPassengers }));
  };

  const serviceFee = 10;
  const totalAmount = Math.floor(Number(price) * (Number(credentials.guestSize) + 1) + Number(serviceFee));

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>${Math.floor(price)} <span>/per person</span></h3>
        <span className="tour__rating d-flex align-items-center gap-1">
          <i className="ri-star-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>
      <div className="booking__form">
        <h5>Information</h5>
        <Form className="booking__info-form">
          <FormGroup>
            <input type="text" placeholder="Full Name" id="fullName" required value={credentials.fullName} readOnly />
          </FormGroup>
          <FormGroup>
            <input type="text" placeholder="Phone" id="phone" required value={credentials.phone} readOnly />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input type="date" id="bookAt" required onChange={handleChange} />
            <input type="number" placeholder="Guest" id="guestSize" min="0" required onChange={handleGuestChange} />
          </FormGroup>
          {credentials.guestSize > 0 && credentials.passengers.map((passenger, index) => (
            <div key={index}>
              <h6>Passenger {index + 1}</h6>
              <FormGroup>
                <input type="text" placeholder="Name" id="name" required value={passenger.name} onChange={(e) => handlePassengerChange(index, e)} />
              </FormGroup>
              <FormGroup>
                <input type="date" placeholder="Birth Date" id="birth_date" required value={passenger.birth_date} onChange={(e) => handlePassengerChange(index, e)} />
              </FormGroup>
              <FormGroup>
                <select id="gender" required value={passenger.gender} onChange={(e) => handlePassengerChange(index, e)}>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </FormGroup>
            </div>
          ))}
        </Form>
      </div>
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className="border-0 px-0">
            <h5 className="d-flex align-items-center gap-1">
              ${Math.floor(price)} <i className="ri-close-line"></i> {credentials.guestSize + 1} person{credentials.guestSize + 1 > 1 ? 's' : ''}
            </h5>
            <span> ${Math.floor(price) * (credentials.guestSize + 1)}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0">
            <h5>Service charge</h5>
            <span> ${serviceFee}</span>
          </ListGroupItem>
          <ListGroupItem className="border-0 px-0 total">
            <h5>Total</h5>
            <span> ${totalAmount}</span>
          </ListGroupItem>
        </ListGroup>
        <Button className="btn primary__btn w-100 mt-4" type="submit" disabled={status === 'Hết chỗ'}>
          Book Now
        </Button>
      </div>
    </div>
  );
};

const TourDetails = () => {
  const { id } = useParams();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tourRating, setTourRating] = useState(null);
  const [buttonText, setButtonText] = useState("Submit");

  useEffect(() => {
    // Hàm lấy dữ liệu từ server
    const fetchTourDetails = async () => {
      try {
        const response = await axios.get(`https://travelnow-befcb6fmhzgah0hy.southeastasia-01.azurewebsites.net/api/Tour/${id}`); // Lấy chi tiết tour theo ID
        setTour(response.data); // Lưu dữ liệu vào state
      } catch (err) {
        setError(err); // Lưu lỗi nếu có
      } finally {
        setLoading(false); // Đặt loading thành false
      }
    };

    fetchTourDetails(); // Gọi hàm để lấy dữ liệu
  }, [id]);

  const handleRatingClick = (rating) => {
    setTourRating(rating);
    setButtonText("Submit");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!tour) return <div>Tour not found</div>;

  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="8">
              <div className="tour__content">
                <img src={tour.image_url} alt={tour.name} />
                <div className="tour__info">
                  <h2>{tour.name}</h2>
                  <div className="d-flex align-items-center gap-5">
                    <span className="tour__rating d-flex align-items-center gap-1">
                      <i className="ri-star-fill" style={{ color: "var(--secondary-color)" }}></i>
                      {tour.avgRating}
                      <span>({tour.reviews.length})</span>
                    </span>
                    <span>
                      <i className="ri-map-pin-user-fill"></i> Status: {tour.status}
                    </span>
                  </div>
                  <h5>Description</h5>
                  <p>{tour.description}</p>
                </div>
                <div className="tour__reviews mt-4">
                  <h4>Reviews({tour.reviews.length} reviews)</h4>
                  <Form onSubmit={(e) => e.preventDefault()}>
                    <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                      {[...Array(6)].map((_, index) => (
                        <span 
                          key={index} 
                          onClick={() => handleRatingClick(index)} 
                          className={index <= tourRating ? "filled" : ""}
                        >
                          {index} <i className="ri-star-fill"></i>
                        </span>
                      ))}
                    </div>
                    <Button type="submit" className="btn primary__btn text-white">{buttonText}</Button>
                  </Form>
                </div>
              </div>
            </Col>
            <Col lg="4">
              <Booking tour={tour} avgRating={tour.avgRating} />
            </Col>
          </Row>
        </Container>
      </section>
      <Newletters />
    </>
  );
};

export default TourDetails;
