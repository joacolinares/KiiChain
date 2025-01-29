import React from "react";

const WalletScreen = () => {
  // JSON de billeteras con sus datos
  const walletData = [
    {
      name: "Sign in with Google",
      icon: "/iconsWallets/akar-icons_coin.png",
      tag: "Popular",
      color: "bg-blue-500",
    },
    {
      name: "Metamask",
      icon: "/iconsWallets/Group15.png",
      tag: "Popular",
      color: "bg-orange-500",
    },
    {
      name: "WalletConnect",
      icon: "/iconsWallets/logos_amp-icon.png",
      tag: "",
      color: "bg-indigo-500",
    },
    {
      name: "Ledger",
      icon: "/iconsWallets/openmoji_ledger.png",
      tag: "",
      color: "bg-yellow-500",
    },
    {
      name: "Phantom",
      icon: "/iconsWallets/logos_amp-icon.png",
      tag: "Solana",
      color: "bg-blue-700",
    },
    {
      name: "BitKeep",
      icon: "/iconsWallets/logos_amplitude-icon.png",
      tag: "BNB Chain",
      color: "bg-green-500",
    },
  ];

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
               </div>
               <span className="text-sm font-medium">{wallet.name}</span>
             </div>
             {wallet.tag && (
               <span className="bg-white text-black py-1 px-3 rounded-lg text-sm font-semibold">
                 {wallet.tag}
               </span>
             )}
           </div>

           {/* Separador suave entre los elementos, con un ancho menor al 100% */}
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
