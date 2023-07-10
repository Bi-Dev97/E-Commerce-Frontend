import React from "react";
import { Outlet } from "react-router-dom"; /**An <Outlet> 
should be used in parent route elements to render their child route elements. This allows nested
 UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route. */
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify"; /**🎉 React-Toastify 
allows you to add notifications to your app with ease. */
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Layout;
