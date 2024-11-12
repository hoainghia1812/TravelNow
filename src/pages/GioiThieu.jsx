import './GioiThieu.css';

const GioiThieu = () => {
  return (
    <div className="gioi-thieu">
      {/* Phần tiêu đề */}
      <header className="gioi-thieu-header">
        <h1>Chào mừng đến với [Tên Công Ty]</h1>
        <p>Khám phá thế giới cùng chúng tôi – Trải nghiệm hành trình đầy ấn tượng và đáng nhớ!</p>
      </header>

      {/* Phần giới thiệu công ty */}
      <section className="gioi-thieu-cong-ty">
        <h2>Về Chúng Tôi</h2>
        <p>
          [Tên Công Ty] tự hào là đơn vị cung cấp dịch vụ du lịch hàng đầu, cam kết mang lại những chuyến đi thú vị, an toàn và đầy đủ tiện nghi cho khách hàng. Với đội ngũ chuyên nghiệp và kinh nghiệm, chúng tôi luôn nỗ lực để mang đến cho bạn hành trình hoàn hảo.
        </p>
      </section>

      {/* Phần dịch vụ nổi bật */}
      <section className="gioi-thieu-dich-vu">
        <h2>Dịch Vụ Của Chúng Tôi</h2>
        <div className="dich-vu-grid">
          <div className="dich-vu-item">
            <h3>Tour Trong Nước</h3>
            <p>Khám phá vẻ đẹp bất tận của đất nước Việt Nam với các tour độc đáo và dịch vụ tận tâm.</p>
          </div>
          <div className="dich-vu-item">
            <h3>Tour Quốc Tế</h3>
            <p>Du lịch nước ngoài dễ dàng và thú vị với hành trình được tổ chức chuyên nghiệp.</p>
          </div>
          <div className="dich-vu-item">
            <h3>Đặt Khách Sạn</h3>
            <p>Hệ thống khách sạn đa dạng, chất lượng cao với mức giá ưu đãi tốt nhất.</p>
          </div>
          <div className="dich-vu-item">
            <h3>Dịch Vụ Vận Chuyển</h3>
            <p>Xe đưa đón an toàn, tiện nghi, giúp bạn có trải nghiệm thoải mái trong suốt chuyến đi.</p>
          </div>
        </div>
      </section>

      {/* Phần lý do chọn chúng tôi */}
      <section className="gioi-thieu-ly-do">
        <h2>Tại Sao Chọn Chúng Tôi?</h2>
        <ul>
          <li>Đội ngũ tư vấn và hướng dẫn viên nhiệt tình, giàu kinh nghiệm.</li>
          <li>Giá cả cạnh tranh, chất lượng dịch vụ luôn đảm bảo.</li>
          <li>Hỗ trợ khách hàng 24/7, sẵn sàng giải đáp mọi thắc mắc.</li>
          <li>Chương trình tour đa dạng, phù hợp với mọi đối tượng.</li>
        </ul>
      </section>

      {/* Phần khách hàng đánh giá */}
      <section className="gioi-thieu-danh-gia">
        <h2>Khách Hàng Nói Gì Về Chúng Tôi</h2>
        <div className="danh-gia-container">
          <div className="danh-gia-item">
            <p>"Chuyến đi thật tuyệt vời! Mọi thứ đều được tổ chức chu đáo và hướng dẫn viên rất thân thiện."</p>
            <p>- Nguyễn Văn A</p>
          </div>
          <div className="danh-gia-item">
            <p>"Giá cả hợp lý, dịch vụ rất tốt. Tôi sẽ giới thiệu cho bạn bè và người thân."</p>
            <p>- Trần Thị B</p>
          </div>
          <div className="danh-gia-item">
            <p>"Lần đầu tiên đi tour mà cảm thấy hài lòng như vậy, mọi thứ đều hoàn hảo."</p>
            <p>- Lê Hoàng C</p>
          </div>
        </div>
      </section>

      {/* Phần kết thúc */}
      <footer className="gioi-thieu-footer">
        <h2>Liên Hệ Với Chúng Tôi</h2>
        <p>
          Hãy liên hệ với chúng tôi để biết thêm chi tiết về các tour du lịch và nhận được những ưu đãi hấp dẫn!
        </p>
        <button className="gioi-thieu-button" > Liên Hệ Ngay</button>
      </footer>
    </div>
  );
};

export default GioiThieu;
