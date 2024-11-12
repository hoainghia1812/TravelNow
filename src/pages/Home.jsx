import "../styles/home.css";
import { Container, Row, Col } from "reactstrap";
import worldImg from "../assets/images/world.png";
import Subtitle from "../shared/Subtitle";
import SearchBar from "../shared/SearchBar";
import ServiceList from "../services/ServiceList";
import ActiveToursItinerary from "./ActiveToursItinerary";
import experienceImg from "../assets/images/experience.png";
import MasonryImagesGallery from "../components/Image-gallery/MasonryImagesGallery";
import Testimonial from "../components/Testimonial/Testimonial";
import Newletters from "../shared/Newletters";
// import TourCard from "../shared/TourCard";
import Tour from "./Tour";

const Home = () => {
  const heroImg = "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";
  const heroVid = "https://images.pexels.com/photos/20765385/pexels-photo-20765385/free-photo-of-thac-jungle-tuy-t-d-p-trong-m-t-khu-r-ng-nhi-t-d-i-v-i-nh-ng-t-ng-da-va-dong-song-nh-n-c-ng-t-trong-xanh-mua-he-la-m-i-n-n-phong-c-nh-thien-nhien-nh-ng-b-c-nh-d-c-dao-ten-no-la.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
  const heroImg2 = "https://images.pexels.com/photos/14780251/pexels-photo-14780251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
 
  return (
    <>
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="hero__content">
                <div className="hero__subtitle d-flex align-items-center">
                  <Subtitle subtitle={"Know Before You Go"} />
                </div>
                <h1>
                  Traveling opens the door to creating{" "}
                  <span className="highlight">memories</span>
                </h1>
                <p>
                  Vịnh Hạ Long là một di sản thiên nhiên thế giới nằm ở tỉnh
                  Quảng Ninh, Việt Nam, nổi tiếng với cảnh quan hùng vĩ của hàng
                  ngàn hòn đảo đá vôi lớn nhỏ rải rác trên mặt nước xanh biếc.
                  Các hòn đảo này được hình thành từ hàng triệu năm trước, tạo
                  nên những hang động kỳ ảo và những dãy núi đá sừng sững. Không
                  chỉ thu hút du khách bởi vẻ đẹp thiên nhiên độc đáo, Vịnh Hạ
                  Long còn mang trong mình những giá trị lịch sử, văn hóa lâu
                  đời, là nơi sinh sống của nhiều loài sinh vật quý hiếm. Du
                  thuyền trên Vịnh Hạ Long vào lúc bình minh hay hoàng hôn là
                  trải nghiệm tuyệt vời, mang đến cảm giác thư thái và ấn tượng
                  khó quên.
                </p>
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box">
                <img src={heroImg} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-4">
              <img src={heroVid} alt="" />
              </div>
            </Col>
            <Col lg="2">
              <div className="hero__img-box mt-5">
                <img src={heroImg2} alt="" />
              </div>
            </Col>
            
          </Row>
        </Container>
      </section>
      {/*hero section end*/}
      
      {/* service section start */}
      <section>
        <Container>
          <Row>
            <Col lg="3">
              <h5 className="services__subtitle">What we serve</h5>
              <h2 className="services__title">We offer our best services</h2>
            </Col>
            <ServiceList />
          </Row>
        </Container>
      </section>
      {/* service section end */}
      
      {/* feature tour section start */}
      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <Subtitle subtitle={"Explore"} />
              <h2 className="feature__tour-title">Our featured tours</h2>
            </Col>
          </Row>
          <Tour/>
        </Container>
      </section>
      {/* feature tour section end */}
     
      {/* experience section start */}
      <section>
        <Container>
          <Row>
            <Col lg="6">
              <div className="experience__content">
                <Subtitle subtitle={"Experience"} />
                <h2>
                  With our all experience <br /> we will serve you
                </h2>
                <p>
                  Vịnh Hạ Long là một di sản thiên nhiên thế giới nằm ở tỉnh
                  <br />
                  Quảng Ninh, Việt Nam, nổi tiếng với cảnh quan hùng vĩ của
                  <br /> hàng ngàn hòn đảo đá vôi lớn nhỏ rải rác trên mặt nước
                  xanh biếc.
                </p>
              </div>
              <div className="counter__wrapper d-flex align-items-center gap-5">
                <div className="counter__box">
                  <span>12k+</span>
                  <h6>Successful Trip</h6>
                </div>
                <div className="counter__box">
                  <span>2k+</span>
                  <h6>Regular Client</h6>
                </div>
                <div className="counter__box">
                  <span>15</span>
                  <h6>Year Experience</h6>
                </div>
              </div>
            </Col>
            <Col lg="6">
              <div className="experience__img ">
                <img src={experienceImg} alt="" />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      {/* experience section end */}

      {/* gallery section start */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Gallery"} />
              <h2 className="gallery__title">
                Visit our customers tour gallery
              </h2>
            </Col>
            <Col lg="12">
              <MasonryImagesGallery />
            </Col>
          </Row>
        </Container>
      </section>
      {/* gallery section end */}
      
      {/* testimonial section start */}
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <Subtitle subtitle={"Fans love"} />
              <h2 className="testimonial__title">What our fans say about us</h2>
            </Col>
            <Col lg="12">
              <Testimonial />
            </Col>
          </Row>
        </Container>
      </section>
      {/* testimonial section end */}
      
      <Newletters />
    </>
  );
};

export default Home;
