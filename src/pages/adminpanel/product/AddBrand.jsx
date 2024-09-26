import React, { useRef, useState } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBrand = () => {
  const [brandname, setBrandName] = useState("");
  const [brandimage, setBrandImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileKey, setFileKey] = useState(Date.now());
  const navigate = useNavigate();
  const handleBrandNameChange = (event) => {
    setBrandName(event.target.value);
  };

  const handleBrandImageChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 512 * 1024; // 512 KB in bytes

    if (file) {
      if (file.size > maxSize) {
        alert("The image size must be less than 512 KB.");
        return;
      }
      setBrandImage(file); // Set the brand image if it's valid
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("brandname", brandname);
    formData.append("brandimage", brandimage);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/brands/createbrand`,
        formData
      );
      navigate("/reboots/product/admin-dashboard-manage-brand");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setBrandName("");
      setBrandImage(null);
      setFileKey(Date.now());
    }
  };

  return (
    <AdminDashboardTemplate>
      <div className="w-[90%] p-4 bg-[#191C20]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <div className="text-lg font-medium text-white">
            <label htmlFor="brandName">Enter Brand Name</label>
          </div>
          <div className="flex flex-row items-center w-full gap-4">
            <input
              type="text"
              id="brandName"
              value={brandname}
              onChange={handleBrandNameChange}
              className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleBrandImageChange}
              className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
            >
              {loading ? "Uploading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddBrand;
