// import React, { useEffect } from "react";
// import { Outlet } from "react-router-dom";
// import { Footer } from "../../components/footer/Footer";
// import { Navbar } from "../../components/navbar/Navbar";
// import { ScrollTop } from "../../components/scrollTop/ScrollTop";
// // import { GustNavbar } from "../../components/navbar/GustNavbar";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCurrentUser } from "../../redux/authSlice";

// export const GustLayout = () => {
//   const dispatch = useDispatch();
//   const { user, status } = useSelector((state) => state.auth);

//   useEffect(() => {
//     if (status === "idle") {
//       dispatch(fetchCurrentUser());
//     }
//   }, [status, dispatch]);

//   console.log("user", user);

//   return (
//     <>
//       <Navbar />
//       <div className="main-content min-h-screen">
//         <ScrollTop />
//         <Outlet />
//       </div>
//       <Footer />
//     </>
//   );
// };
