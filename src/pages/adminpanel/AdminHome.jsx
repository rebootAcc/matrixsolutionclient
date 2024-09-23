import React from "react";
import AdminDashboardTemplate from "../../component/admindashboardcomponent/AdminDashboardTemplate";
import { Link } from "react-router-dom";

const AdminHome = () => {
  const categories = [
    { name: "Total Category", number: "100" },
    { name: "Sub Category", number: "100" },
    { name: "Total Products", number: "100" },
    { name: "Total Enquiry", number: "100" },
    {
      name: "Add New Products",
      link: "/reboots/product/admin-dashboard-add-new-product",
    },
    {
      name: "Manage Products",
      link: "/reboots/product/admin-dashboard-manage-product",
    },
    {
      name: "Add New Category",
      link: "/reboots/product/admin-dashboard-add-category",
    },
    {
      name: "Add Brand",
      link: "/reboots/product/admin-dashboard-add-brand",
    },
    {
      name: "Manage Brand",
      link: "/reboots/product/admin-dashboard-manage-brand",
    },
  ];
  const getColor = (index) => {
    const colors = ["text-[#63B263]", "text-[#5BC0DE]", "text-[#D53F3A]"];
    return colors[index % 3];
  };
  return (
    <AdminDashboardTemplate>
      <div className="grid grid-cols-3 gap-6 p-4">
        {categories.map((item, index) =>
          item.link ? (
            <Link
              to={item.link}
              className="p-6 bg-[#191C20] rounded-md flex w-full justify-center items-center  hover:bg-[#2A3A4A] transition duration-300"
              key={index}
            >
              <span
                className={`${getColor(
                  index
                )} xl:w-[40%] lg:w-[50%]  font-bold text-2xl`}
              >
                {item.name}
              </span>
            </Link>
          ) : (
            <div
              className="p-6 bg-[#191C20] rounded-md flex text-xl flex-col gap-2"
              key={index}
            >
              <span className="text-white font-medium">{item.name}</span>
              <span className={`${getColor(index)} font-bold text-2xl`}>
                {item.number}+
              </span>
            </div>
          )
        )}
      </div>
    </AdminDashboardTemplate>
  );
};

export default AdminHome;
