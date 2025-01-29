import React, { useState, useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa"; // Importa el ícono de billetera
import { useNavigate } from "react-router-dom"; // Importa useNavigate para la navegación

const LoginScreen = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate(); // Instancia de useNavigate

  useEffect(() => {
    const delayDuration = moment.duration(2, "seconds");
    const timer = setTimeout(() => {
      setShowButton(true);
    }, delayDuration.asMilliseconds());

    return () => clearTimeout(timer);
  }, []);

  const handleConnectWallet = () => {
    navigate("/wallet"); 
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center mb-8">
        <img
          src="/logoIni.png"
          alt="Logo"
          className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl"
        />
      </div>

      {showButton && (
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className=" text-white flex items-center justify-center    transition-all duration-500"
          onClick={handleConnectWallet} 
        >
          <button className="bordeDegradado">
            <FaWallet className="w-6 h-6 mr-2" /> 
            Connect Wallet
          </button>
        </motion.button>
      )}
    </div>
  );
};

export default LoginScreen;
