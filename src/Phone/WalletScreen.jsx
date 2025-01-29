import React, { useEffect, useState } from "react";
import { ConnectButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { client, myChain } from '../utils/constants.ts';
import { PrivateInfoStorage } from "../utils/contracts.ts";
import { useNavigate } from "react-router-dom";

const WalletScreen = () => {

  const navigate = useNavigate();

  const [isOwner, setIsOwner] = useState(false)

  const walletData = [
    {
      name: "Connect with Google or your wallet",
      icon: "/iconsWallets/akar-icons_coin.png",
      icon2: "/iconsWallets/Group15.png",
      tag: "Popular",
      color: "bg-blue-500",
    },
  ];
  const address = useActiveAccount();
  const userWallet = address?.address 

  const { data: owner } = useReadContract({ 
    contract: PrivateInfoStorage,
    method: "owner",
    params: [],
  });
  const { data: isWhitelisted } = useReadContract({ 
    contract: PrivateInfoStorage,
    method: "isWhitelisted",
    params: [userWallet],
  });

  console.log(isWhitelisted)

  useEffect(() => {
    if(isWhitelisted != undefined){
      if(isWhitelisted){
        if(owner == userWallet){
          console.log("Es owner")
          navigate("/whitelist1?isOwner=true");
        }else{
          console.log("No es owner")
          navigate("/whitelist1?isOwner=false");
        }
       
      }else{
        navigate("/whitelist2");
      }
    }
  }, [isWhitelisted])
  

 return (
   <div className="min-h-screen flex flex-col items-center justify-center p-4">
     <div className="flex items-center justify-center mb-8">
       <img
         src="/logoIni.png"
         alt="Logo"
         className="w-28 h-28 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-2xl"
       />
     </div>

     <div className="w-full max-w-lg space-y-3 bg-black bg-opacity-50 rounded-lg border border-gray-400">
       {walletData.map((wallet, index) => (
         <div key={index} className="relative">
           <div
             className={`flex justify-between items-center p-3 rounded-lg text-white`}
           >
             <div className="flex items-center">
               <div className="mr-3">
                 <img src={wallet.icon} alt={wallet.name} className="h-6 w-6" />
                 <img src={wallet.icon2} alt={wallet.name} className="h-6 w-6" />
               </div>
               <span className="text-sm font-medium">{wallet.name}</span>
             </div>
             <ConnectButton
      connectButton={{
       
        label: 'Connect Wallet',
      }}
      client={client}
      chain={myChain}
  
    />
           </div>
          
           {index !== walletData.length - 1 && (
             <hr className="border-t border-gray-600 w-11/12 mx-auto mb-0" />
           )}
         </div>
       ))}
     </div>
   </div>
 );
};

export default WalletScreen;
