import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const routes = [
    { path: "/login", name: "Login Screen" },
    { path: "/loginV1", name: "Login Screen V1" },
    { path: "/profileScreenV2", name: "Profile Screen V2" },
    { path: "/profileScreen", name: "Profile Screen" },
    { path: "/DashboardScreen", name: "Dashboard Screen" },
    { path: "/ChatsScreen", name: "Chats Screen" },
    { path: "/ChatScreen", name: "Chat Screen" },
    { path: "/DashboardView", name: "Dashboard View NO IRIA" },
    { path: "/ChatsDashboard", name: "Chats Dashboard NO IRIA" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {routes.map((route, index) => (
          <Link
            key={index}
            to={route.path}
            className="block bg-blue-500 text-white py-2 px-4 rounded-lg text-center shadow-md hover:bg-blue-600"
          >
            {route.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
