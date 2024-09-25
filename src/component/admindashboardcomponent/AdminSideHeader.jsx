import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminSideHeader = () => {
  const navelement = [
    {
      name: "Home",
      icon: "/adminimages/homeicon.svg",
      link: "/reboots/admin-dashboard-home",
    },
    { name: "Slider", icon: "/adminimages/slidericon.svg", link: "" },

    {
      name: "Product",
      icon: "/adminimages/producticon.svg",
      dropdownItems: [
        {
          name: "Add New Product",
          link: "/reboots/product/admin-dashboard-add-new-product",
        },
        {
          name: "Manage Product",
          link: "/reboots/product/admin-dashboard-manage-product",
        },
        {
          name: "Add Category",
          link: "/reboots/product/admin-dashboard-add-category",
        },
        {
          name: "Manage Category",
          link: "/reboots/product/admin-dashboard-manage-category",
        },
      ],
    },
    {
      name: "Brands",
      icon: "/adminimages/enquiryicon.svg",
      dropdownItems: [
        {
          name: "Add Brand",
          link: "/reboots/product/admin-dashboard-add-brand",
        },
        {
          name: "Manage Brand",
          link: "/reboots/product/admin-dashboard-manage-brand",
        },
      ],
    },
  ];
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setUserName(name);
    }
  }, []);
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };
  return (
    <div className="flex flex-col relative   bg-[#191C20] h-screen no-scrollbar overflow-auto ">
      <div className=" h-[5rem] w-full flex justify-center items-center text-[#63B263] text-lg font-bold ">
        Reboots Admin Panel
      </div>
      <div className="relative w-full">
        <img
          src="/adminimages/adminsideheaderbg.jpg"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <div className=" flex flex-row items-center gap-2  bg-opacity-100 p-4 rounded text-white">
            <span>
              <img
                src="/adminimages/profile.svg"
                alt=""
                className="h-[2.5rem]"
              />
            </span>
            <span className="flex flex-col gap-1 justify-center text-center items-center">
              <span className="text-[17px]/[20px] font-semibold">
                {userName}
              </span>
              <span className="text-[14px]/[18px] font-medium">Admin</span>
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center">
        {navelement.map((item, index) => (
          <div key={index} className="w-full">
            {item.dropdownItems ? (
              <>
                <div
                  onClick={() => handleDropdownClick(index)}
                  className={`py-2 flex flex-row w-full justify-center gap-4 items-center font-semibold text-white cursor-pointer ${
                    location.pathname.includes(item.link)
                      ? "bg-[#0E0F13]"
                      : "bg-transparent"
                  }`}
                >
                  <span className="w-[20%] justify-center items-center flex text-sm">
                    <span className="h-8 w-8 bg-[#121417]  flex justify-center items-center rounded-full">
                      <img src={item.icon} alt="" className="h-3" />
                    </span>
                  </span>
                  <span className="w-[80%] text-sm">{item.name}</span>
                </div>
                {openDropdown === index && (
                  <div className="flex flex-col w-full items-center bg-[#1A1D21]">
                    {item.dropdownItems.map((dropdownItem, subIndex) => (
                      <Link
                        to={dropdownItem.link}
                        key={subIndex}
                        className={`py-2 flex flex-row w-full justify-center text-sm gap-4 items-center font-semibold text-white ${
                          location.pathname === dropdownItem.link
                            ? "bg-[#0E0F13]"
                            : "bg-transparent"
                        }`}
                      >
                        {" "}
                        <span className="w-[20%]"></span>
                        <span className="w-[80%] text-[13px]">
                          {dropdownItem.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                to={item.link}
                className={`py-2 flex flex-row w-full justify-center gap-4 text-sm items-center font-semibold text-white ${
                  location.pathname === item.link
                    ? "bg-[#0E0F13]"
                    : "bg-transparent"
                }`}
              >
                <span className="w-[20%] justify-center items-center flex">
                  <span className="h-8 w-8 bg-[#121417] flex justify-center items-center rounded-full">
                    <img src={item.icon} alt="" className="h-3" />
                  </span>
                </span>
                <span className="w-[80%]">{item.name}</span>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSideHeader;
