import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginScreen from "./Phone/LoginScreen";

import Layout from "./componentes/Layout";
import './App.css'; 
import WalletScreen from "./Phone/WalletScreen";
import Whitelist1 from "./Phone/Whitelis1";
import Whitelist2 from "./Phone/Whitelist2";
import Showcase from "./Phone/Showcase";


function App() {
  
  return (
    <div>
      <Layout>
        <ToastContainer />
        <Routes>
          {/* ver todas las vistas */}
          <Route path="/" element={<Showcase />} />
          <Route path="/login" element={<LoginScreen />} />{" "}
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/wallet" element={<WalletScreen />} />
          <Route path="/whitelist1" element={<Whitelist1 />} />
          <Route path="/whitelist2" element={<Whitelist2 />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
