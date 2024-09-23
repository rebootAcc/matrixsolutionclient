import React, { useEffect, useState } from "react";
import AdminSideHeader from "./AdminSideHeader";
import AdminHeader from "./AdminHeader";

const AdminDashboardTemplate = ({ children }) => {
  const [isTokenVerified, setIsTokenVerified] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsTokenVerified(false);
      setTimeout(() => {
        alert("You are not logged in");
        window.location.href = "/";
      }, 0);
      return;
    }

    setIsTokenVerified(true);
  }, []);
  if (!isTokenVerified) {
    // Render blank page
    return <div></div>;
  }
  return (
    <div className="flex flex-row gap-4 w-full bg-[#2E2F32] h-full overflow-hidden ">
      <div className="w-[20%]">
        <AdminSideHeader />
      </div>
      <div className="w-[80%] flex flex-col gap-8 h-screen overflow-y-scroll">
        <span>
          <AdminHeader />
        </span>
        <span>{children}</span>
      </div>
    </div>
  );
};

export default AdminDashboardTemplate;
