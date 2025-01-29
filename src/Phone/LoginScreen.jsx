import React, { useState, useEffect } from "react";
import moment from "moment";
import { motion } from "framer-motion";
import { FaWallet } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 
import { ConnectButton } from 'thirdweb/react';
import { client, myChain } from '../utils/constants.ts';
const LoginScreen = () => {
  const [showButton, setShowButton] = useState(false);
  const navigate = useNavigate();

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


      <p className="text-white text-center px-6 lg:px-12 text-sm lg:text-lg leading-relaxed max-w-2xl mx-auto">
        <span className="font-semibold text-violet-400">Hola, bienvenido</span> a la aplicación de 
        <span className="text-violet-300 font-semibold"> Whitelist de KiiChain</span>.  
        Para ingresar, asegúrate de estar dentro de la whitelist y luego conecta tu billetera.  
        <br /><br />
        Dentro de esta app, si eres parte de la whitelist, podrás ver la 
        <span className="text-violet-300 font-semibold"> palabra clave</span>.  
        Si eres un <span className="text-violet-400 font-semibold">administrador</span>, 
        podrás <span className="underline">agregar</span> y <span className="underline">eliminar</span> personas de la whitelist, 
        además de <span className="text-violet-300 font-semibold">modificar la palabra clave</span>.
      </p>
            <br />
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
