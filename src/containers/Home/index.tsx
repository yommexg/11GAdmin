import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import HomeCards from "./cards";

const Home: React.FC = () => {
  const [currentDateTime, setCurrentDateTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const formattedDateTime = date.toLocaleString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
      setCurrentDateTime(formattedDateTime);
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="md:ml-[250px] bg-white">
        <div className="mb-2 px-4 py-3 md:py-6 md:px-8 flex flex-col md:flex-row gap-2 items-center justify-between bg-white shadow-2xl">
          <h2 className="font-bold text-xl lg:text-2xl">11G Admin Dashboard</h2>
          <p className="font-semibold text-blue-600 text-xs md:text-base">
            {currentDateTime}
          </p>
        </div>
        <HomeCards />
      </div>
    </>
  );
};

export default Home;
