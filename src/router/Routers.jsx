import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Tour from "../pages/Tour";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DKCongTy from "../pages/DKCongTy";
import ThankYou from "../pages/ThankYou";
import Profile from "../pages/Profile";
import AddTour from "../admin_pages/AddTour";
import AddCategory from '../admin_pages/AddCategory';
import AddSchedule from '../admin_pages/AddSchedule';
import AdminPage from "../admin_pages/AdminPage";
import AddLocation from "../admin_pages/AddLocation";
import BookingDetails from "../pages/BookingDetails";
import EditTour from "../admin_pages/EditTour";
import ActiveToursItinerary from "../pages/ActiveToursItinerary";
import BookingCancelled from "../pages/BookingCancelled";
import UpdateCategory from "../admin_pages/UpdateCategory";
import UpdateLocation from "../admin_pages/UpdateLocation";
import TourRevenue from "../admin_pages/TourRevenue";
import Lsdangtour from "../admin_pages/Lsdangtour";  
import LichTrinh from "../pages/LichTrinh";
import TourChitiet from "../pages/TourChitiet";
import Admin from "../adminSan/Admin";
import Congty from "../adminSan/Congty";
import QuanlyDanhgia from "../adminSan/QuanlyDanhgia";
import DoanhThu from "../adminSan/DoanhThu";
import ChietKhau from "../adminSan/ChietKhau";
import KhieuNai from "../adminSan/KhieuNai";
import QuanLyNguoiDung from "../adminSan/QuanLyNguoiDung";
import XemLichTrinh from "../pages/XemLichTrinh";
import Tour1Nguoi from "../LoaiTour/Tour1Nguoi";
import TourNhieuNguoi from "../LoaiTour/TourNhieuNguoi";
import TourGiaDinh from "../LoaiTour/TourGiaDinh";
import DatTour from "../pages/DatTour";
import GioiThieu from "../pages/GioiThieu";
import Token from "../pages/Token";
import HoaDon from "../pages/HoaDon";
import Phieudattour from "../pages/Phieudattour";
import QlDatTour from "../adminSan/QlDatTour";
const Routers = () => {
  return (
    <Routes>
      <Route path="/dkct" element={<DKCongTy />} />
      <Route path="/" element={<Navigate to="/home"/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tour />} />
      <Route path="/tours/:maTour" element={<TourChitiet />} /> 
      <Route path="/xemlichtrinh" element={<XemLichTrinh />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/travelnow" element={<Admin />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/add-tour" element={<AddTour />} />
      <Route path="/add-category" element={<AddCategory />} />
      <Route path="/add-schedule" element={<AddSchedule />} />
      <Route path="/add-location" element={<AddLocation />} />
      <Route path="/booking-details" element={<BookingDetails />} />
      <Route path="/tours/edit/:tourId" element={<EditTour />} />
      <Route path="/active-tours-itinerary" element={<ActiveToursItinerary />} />
      <Route path="/booking-canceled" element={<BookingCancelled />} />
      <Route path="/update-location/:id" element={<UpdateLocation />} />
      <Route path="/update-category/:id" element={<UpdateCategory />} />
      <Route path="/tour-revenue" element={<TourRevenue />} />
      <Route path="/lsdangtour" element={<Lsdangtour />} /> 
      <Route path="/lichtrinh" element={<LichTrinh />} /> 
      <Route path="/congty" element={<Congty/>} /> 
      <Route path="/danhgia" element={<QuanlyDanhgia/>} /> 
      <Route path="/doanhthu" element={<DoanhThu/>} /> 
      <Route path="/motnguoi" element={<Tour1Nguoi/>} /> 
      <Route path="/tournhieunguoi" element={<TourNhieuNguoi/>} /> 
      <Route path="/tourgiadinh" element={<TourGiaDinh/>} /> 
      <Route path="/khieunai" element={<KhieuNai/>} />
      <Route path="/quanlynguoidung" element={<QuanLyNguoiDung/>} />
      <Route path="/chietkhau" element={<ChietKhau/>} />
      <Route path="/dattour/:maPhieu" element={<DatTour/>} />
      <Route path="/gioithieu" element={<GioiThieu/>} />
      <Route path="/token" element={<Token/>} />  
      <Route path="/phieudattour/:maPhieu" element={<Phieudattour />} />
      <Route path="/hoadon/:maPhieu" element={<HoaDon/>} />
      <Route path="/qldattour" element={<QlDatTour/>} />
      </Routes>
  );
};

export default Routers;
