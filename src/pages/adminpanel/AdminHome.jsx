import React, { useEffect, useState } from "react";
import AdminDashboardTemplate from "../../component/admindashboardcomponent/AdminDashboardTemplate";
import { Link } from "react-router-dom";
import axios from "axios";

const AdminHome = () => {
  const [categoryStats, setCategoryStats] = useState({
    totalCategories: 0,
    totalSubCategories: 0,
  });
  const [totalBrands, setTotalBrands] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/categories/getCategoryStats`
        );
        setCategoryStats(categoriesResponse.data);

        const brandsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/brands/getbrandcount`
        );
        setTotalBrands(brandsResponse.data.totalBrands);
      } catch (error) {
        console.error("Error fetching categories or brands:", error);
      }
    };
    fetchCategoriesAndBrands();
  }, []);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsresponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/products/all`
        );

        setProducts(productsresponse.data.totalDocuments);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);
  const dashboard = [
    { name: "Total Category", number: categoryStats.totalCategories },
    { name: "Sub Category", number: categoryStats.totalSubCategories },
    { name: "Total Products", number: products },
    { name: "Total Brands", number: totalBrands },
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
        {dashboard.map((item, index) =>
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
