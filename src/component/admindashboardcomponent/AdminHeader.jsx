import React from "react";
import { HiViewGrid } from "react-icons/hi";
import { IoNotificationsSharp } from "react-icons/io5";
import { RiLogoutCircleRLine } from "react-icons/ri";

const AdminHeader = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");

    window.location.href = "/reboots"; // Redirect to login page
  };

  return (
    <div className="px-8 w-full h-[6rem] flex justify-between items-center bg-[#000000]">
      <div className="w-full">
        <input
          type="text"
          className="bg-[#191C20] text-white w-[60%] p-4  "
          placeholder="Search Here ......"
        />
      </div>
      <div className=" flex flex-row gap-4 items-center text-white">
        <span>
          <HiViewGrid className="text-3xl" />
        </span>
        <span>
          <IoNotificationsSharp className="text-3xl" />
        </span>
        <span className="w-[4rem]">
          <button
            onClick={handleLogout}
            className="w-8 h-8 flex justify-center items-center rounded-full text-black bg-white text-[20px]"
          >
            <RiLogoutCircleRLine />
          </button>
        </span>
        <span>
          <img src="/adminimages/profile.svg" alt="" className="h-[3rem]" />
        </span>
      </div>
    </div>
  );
};

export default AdminHeader;
