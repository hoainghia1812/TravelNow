
// import { useRef, useEffect, useState } from "react";
// import { Container, Row, Button } from "reactstrap";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import { useAuth } from '../../context/AuthContext.jsx';
// import logo from "../../assets/images/logo.png";
// import "./header.css";
// import Cookies from "js-cookie"; 

// import { sso } from '../../../sso.js';

// const nav__links = [
//   { path: "/home", display: "Trang chủ" },
//   { path: "/gioithieu", display: "Giới thiệu" },
// ];

// const NVQLCTLinks = [
//   { path: "/admin", display: "Bảng quản lý" },
//   { path: "/add-tour", display: "Thêm chuyến đi"},
//   { path: "/add-location", display: "Chi tiết tour" },
//   { path: "/lichtrinh", display: "Lịch Trình" },
//   { path: "/lsdangtour", display: "Lịch sử đăng chuyến đi" },
// ];

// const userDropdownLinks = [
//   { path: "/motnguoi", display: "Tour 1 Người" },
//   { path: "/tourgiadinh", display: "Tour Gia Đình" },
//   { path: "/tournhieunguoi", display: "Tour Nhiều Người" },
// ];

// const adminLinks = [
//   { path: "/travelnow", display: "Bảng quản lý" },
//   { path: "/congty", display: "Quản lý công ty", submenu: [
//     { path: "/danhgia", display: "Quản lý đánh giá" },
//     { path: "/khieunai", display: "Quản lý khiếu nại" },
//   ] 
// },
//   { path: "/chietkhau", display: "Chiết khấu của sàn" },
//   { path: "/doanhthu", display: "Doanh thu" },
//   { path: "/quanlynguoidung", display: "Quản lý người dùng" },
// ];

// const Header = () => {
//   const headerRef = useRef(null);
//   const { user, logout } = useAuth(); // Giả sử setUserData được dùng để cập nhật trạng thái người dùng
//   const navigate = useNavigate();
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
//   const [isAdminDropdownOpen, setIsAdminDropdownOpen] = useState(false);

//   const handleLogout = () => {
    
//     Cookies.remove('Token'); 

//     logout();

//     navigate('/home'); 
//        };
    


//   const handleLogin = () => {
//     sso.redirectToLogin(location.origin + '/token');
//   };

//   const stickyHeaderFunc = () => {
//     window.addEventListener("scroll", () => {
//       if (
//         document.body.scrollTop > 80 ||
//         document.documentElement.scrollTop > 80
//       ) {
//         headerRef.current.classList.add("sticky__header");
//       } else {
//         headerRef.current.classList.remove("sticky__header");
//       }
//     });
//   };

//   useEffect(() => {
//     stickyHeaderFunc();
//     return () => window.removeEventListener("scroll", stickyHeaderFunc);
//   }, []);

//   const handleDropdownClick = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleUserDropdownClick = () => {
//     setIsUserDropdownOpen(!isUserDropdownOpen);
//   };

//   const handleAdminDropdownClick = () => {
//     setIsAdminDropdownOpen(!isAdminDropdownOpen);
//   };

//   const avt = "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";

//   return (
//     <header className="header" ref={headerRef}>
//       <Container>
//         <Row>
//           <div className="nav__wrapper d-flex align-items-center justify-content-between">
//             <div className="logo">
//               <img src={logo} alt="Logo" />
//             </div>

//             <div className="navigation">
//               <ul className="menu d-flex align-items-center gap-5">
//                 {nav__links.map((item, index) => (
//                   <li className="nav__item" key={index}>
//                     <NavLink
//                       to={item.path}
//                       className={(navClass) =>
//                         navClass.isActive ? "active__link" : ""
//                       }
//                     >
//                       {item.display}
//                     </NavLink>
//                   </li>
//                 ))}
//                 {user && user.role === 1 && (
//                   <li className="nav__item dropdown-header">
//                     <span className="dropdown-toggle username" onClick={handleDropdownClick}>
//                       Công Ty Tour
//                     </span>
//                     {isDropdownOpen && (
//                       <div className="dropdown-menu">
//                         {NVQLCTLinks.map((item, index) => (
//                           <div className="dropdown-item dropdown-parent" key={index}>
//                             <Link to={item.path}>
//                               {item.display}
//                             </Link>
//                             {item.submenu && (
//                               <div className="dropdown-submenu">
//                                 {item.submenu.map((subItem, subIndex) => (
//                                   <Link to={subItem.path} className="dropdown-item" key={subIndex}>
//                                     {subItem.display}
//                                   </Link>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </li>
//                 )}
//                 {user && user.role === 0 && (
//                   <li className="nav__item dropdown-header">
//                     <span className="dropdown-toggle username" onClick={handleUserDropdownClick}>
//                       Chuyến đi
//                     </span>
//                     {isUserDropdownOpen && (
//                       <div className="dropdown-menu">
//                         {userDropdownLinks.map((item, index) => (
//                           <Link to={item.path} className="dropdown-item" key={index}>
//                             {item.display}
//                           </Link>
//                         ))}
//                       </div>
//                     )}
//                   </li>
//                 )}
//                 {user && user.role === 2 && (
//                   <li className="nav__item dropdown-header">
//                     <span className="dropdown-toggle username" onClick={handleAdminDropdownClick}>
//                       Admin
//                     </span>
//                     {isAdminDropdownOpen && (
//                       <div className="dropdown-menu">
//                         {adminLinks.map((item, index) => (
//                           <div key={index} className="dropdown-item dropdown-parent">
//                             <Link to={item.path}>{item.display}</Link>
//                             {item.submenu && (
//                               <div className="dropdown-submenu">
//                                 {item.submenu.map((subItem, subIndex) => (
//                                   <Link to={subItem.path} className="dropdown-item" key={subIndex}>
//                                     {subItem.display}
//                                   </Link>
//                                 ))}
//                               </div>
//                             )}
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </li>
//                 )}
//               </ul>
//             </div>

//             <div className="nav__right d-flex align-items-center gap-4">
//               <div className="nav__btns d-flex align-items-center gap-4">
//                 {user ? (
//                   <div className="dropdown-header">
//                     <img src={user.photo ? user.photo : avt} alt="Avatar" className="avatar" />
//                     <span className="username">{user.hoVaTen}</span>
//                     <div className="dropdown-menu">
//                       <Link to="/profile" className="dropdown-item">Thông tin tài khoản</Link>
//                       <Link to="/invoices" className="dropdown-item">Lịch sử đặt tour</Link>
//                       <span className="dropdown-item" onClick={handleLogout}>Đăng xuất</span>
//                     </div>
//                   </div>
//                 ) : (
//                   <>
//                     <Button className="btn secondary__btn mt-0" onClick={handleLogin}>
//                       Đăng nhập
//                     </Button>
//                     <Button className="btn primary__btn mt-0" onClick={handleLogin}>Đăng ký</Button>
//                   </>
//                 )}
//               </div>
//               <span className="mobile__menu">
//                 <i className="ri-menu-line"></i>
//               </span>
//             </div>
//           </div>
//         </Row>
//       </Container>
//     </header>
//   );
// };
// export default Header;
import { useRef, useEffect, useState } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.jsx';
import logo from "../../assets/images/logo.png";
import "./header.css";
import Cookies from "js-cookie"; 

import { sso } from '../../../sso.js';

const nav__links = [
  { path: "/home", display: "Trang chủ" },
  { path: "/gioithieu", display: "Giới thiệu" },
];

const NVQLCTLinks = [
  { path: "/admin", display: "Bảng quản lý" },
  { path: "/add-tour", display: "Thêm chuyến đi"},
  { path: "/add-location", display: "Chi tiết tour" },
  { path: "/lichtrinh", display: "Lịch Trình" },
  { path: "/lsdangtour", display: "Lịch sử đăng chuyến đi" },
];

const userDropdownLinks = [
  { path: "/motnguoi", display: "Tour 1 Người" },
  { path: "/tourgiadinh", display: "Tour Gia Đình" },
  { path: "/tournhieunguoi", display: "Tour Nhiều Người" },
];

const adminLinks = [
  { path: "/travelnow", display: "Bảng quản lý" },
  { path: "/congty", display: "Quản lý công ty", submenu: [
    { path: "/danhgia", display: "Quản lý đánh giá" },
    { path: "/khieunai", display: "Quản lý khiếu nại" },
  ] 
},
  { path: "/chietkhau", display: "Chiết khấu của sàn" },
  { path: "/doanhthu", display: "Doanh thu" },
  { path: "/quanlynguoidung", display: "Quản lý người dùng" },
];

const Header = () => {
  const headerRef = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    Cookies.remove('Token');
    logout();
    navigate('/home'); 
  };

  const handleLogin = () => {
    sso.redirectToLogin(location.origin + '/token');
  };

  const stickyHeaderFunc = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };

  useEffect(() => {
    stickyHeaderFunc();
    return () => window.removeEventListener("scroll", stickyHeaderFunc);
  }, []);

  const avt = "https://dulichtoday.vn/wp-content/uploads/2017/04/vinh-Ha-Long.jpg";

  const renderLinks = () => {
    if (!user) {
      return nav__links.map((item, index) => (
        <li className="nav__item" key={index}>
          <NavLink
            to={item.path}
            className={(navClass) => navClass.isActive ? "active__link" : ""}
          >
            {item.display}
          </NavLink>
        </li>
      ));
    } else if (user.role === 0) {
      return (
        <>
          {nav__links.map((item, index) => (
            <li className="nav__item" key={index}>
              <NavLink
                to={item.path}
                className={(navClass) => navClass.isActive ? "active__link" : ""}
              >
                {item.display}
              </NavLink>
            </li>
          ))}
          <li className="nav__item dropdown-header">
            <span className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              Chuyến đi
            </span>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                {userDropdownLinks.map((item, index) => (
                  <Link to={item.path} className="dropdown-item" key={index}>
                    {item.display}
                  </Link>
                ))}
              </div>
            )}
          </li>
        </>
      );
    } else if (user.role === 1) {
      return (
        <li className="nav__item dropdown-header">
          <span className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Công Ty Tour
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {NVQLCTLinks.map((item, index) => (
                <Link to={item.path} className="dropdown-item" key={index}>
                  {item.display}
                </Link>
              ))}
            </div>
          )}
        </li>
      );
    } else if (user.role === 2) {
      return (
        <li className="nav__item dropdown-header">
          <span className="dropdown-toggle" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            Admin
          </span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              {adminLinks.map((item, index) => (
                <div key={index} className="dropdown-item dropdown-parent">
                  <Link to={item.path}>{item.display}</Link>
                  {item.submenu && (
                    <div className="dropdown-submenu">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link to={subItem.path} className="dropdown-item" key={subIndex}>
                          {subItem.display}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </li>
      );
    }
  };

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <Row>
          <div className="nav__wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <div className="navigation">
              <ul className="menu d-flex align-items-center gap-5">{renderLinks()}</ul>
            </div>
            <div className="nav__right d-flex align-items-center gap-4">
              <div className="nav__btns d-flex align-items-center gap-4">
                {user ? (
                  <div className="dropdown-header">
                    <img src={user.photo ? user.photo : avt} alt="Avatar" className="avatar" />
                    <span className="username">{user.hoVaTen}</span>
                    <div className="dropdown-menu">
                      <Link to="/profile" className="dropdown-item">Thông tin tài khoản</Link>
                      <Link to="/invoices" className="dropdown-item">Lịch sử đặt tour</Link>
                      <span className="dropdown-item" onClick={handleLogout}>Đăng xuất</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Button className="btn secondary__btn mt-0" onClick={handleLogin}>
                      Đăng nhập
                    </Button>
                    <Button className="btn primary__btn mt-0" onClick={handleLogin}>Đăng ký</Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </header>
  );
};

export default Header;
