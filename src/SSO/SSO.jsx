// import React,{useEffect,useContext} from "react";
// import { useNavigate,useSearchParams } from "react-router-dom";
// import {useJwt } from "react-jwt";
// import {AuthContext, useAuth} from "../context/AuthContext";
// import axios from "axios";
// const SS0 = () => {
//     const {auth,setAuth} = useContext(AuthContext);
//     const [searchParams] = useSearchParams();
//     const token = searchParams.get('Token');
//     const {decodedToken,isExpired} = useJwt(token);
//     const navigate = useNavigate();
//     const {Login} = useContext(AuthContext);

//     useEffect(() => {
//         const setToken = async () => {
//             if(decodedToken &&!isExpired){
//                 axios.post("",{decodedToken},{withCredentials: true})
//                 .then(res=>{
//                     setAuth({
//                         isAuthenticated: true,
//                         user:{
//                             id:res.data.id,
//                             name: res.data.name,
//                             email: res.data.email,
                            
//                         }
//                     })
//                 })
//                 .catch(err=>{
//                     console.log(err);
//                 })
//                 if(decodedToken.role === "user"){
//                     navigate("/user");
//                 }else if(decodedToken.role === "NVQL"){
//                     const res = await axios.get("",{decodedToken},{withCredentials: true});
//                     if(res.status === 202){
//                         localStorage.setItem('token', token);
//                         console.log('set token',token);
//                         navigate("/admin");
//                     }else{
//                         console.log('Invalid token');
//                     }
//                 }
//             }
//             if(isExpired){
//                 console.log('Token expired');
//             }
//         }
//         setToken();

        
//     }, [decodedToken,isExpired,login,navigate]);
// }
// export default SS0;
import React, { useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useJwt } from "react-jwt";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const SS0 = () => {
  const { setAuth } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('Token');
  const { decodedToken, isExpired } = useJwt(token);
  const navigate = useNavigate();

  useEffect(() => {
    const setToken = async () => {
      if (decodedToken && !isExpired) {
        try {
          // Gửi dữ liệu token lên backend
          const response = await axios.post('https://tourdulich-bheqa4hpbgbjdrey.southeastasia-01.azurewebsites.net/user/NguoiDung', { token }, { withCredentials: true });

          if (response.status === 200) {
            setAuth({
              isAuthenticated: true,
              user: {
                id: response.data.id,
                name: response.data.name,
                email: response.data.email,
              }
            });

            // Lưu token vào localStorage nếu cần thiết
            localStorage.setItem('token', token);

            // Điều hướng người dùng đến trang phù hợp
            if (decodedToken.role === "user") {
              navigate("/user");
            } else if (decodedToken.role === "NVQL") {
              navigate("/admin");
            }
          }
        } catch (err) {
          console.error("Lỗi khi gửi token lên backend:", err);
        }
      } else {
        console.log('Token expired');
      }
    };

    setToken();
  }, [decodedToken, isExpired, navigate, setAuth]);

  return null;
};

export default SS0;
