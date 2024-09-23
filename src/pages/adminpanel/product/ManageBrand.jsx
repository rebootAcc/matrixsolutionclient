import React, { useEffect, useState } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";

const ManageBrand = () => {
  const [brands, setBrands] = useState([]);
  const [editingBrand, setEditingBrand] = useState(null);
  const [editedBrandName, setEditedBrandName] = useState("");
  const [editedBrandImage, setEditedBrandImage] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/brands/getbrand`
      );
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleEditClick = (brand) => {
    setEditingBrand(brand);
    setEditedBrandName(brand.brandname);
    setEditedBrandImage(null);
  };

  const handleCancelClick = () => {
    setEditingBrand(null);
    setEditedBrandName("");
    setEditedBrandImage(null);
  };

  const handleDeleteClick = async (brandId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/brands/deletebrands/${brandId}`
      );
      fetchBrands(); // Refresh brand list after deletion
    } catch (error) {
      console.error("Error deleting brand:", error);
    }
  };

  const handleSaveClick = async () => {
    try {
      const formData = new FormData();
      setLoading(true);
      formData.append("brandname", editedBrandName);
      if (editedBrandImage) {
        formData.append("brandimage", editedBrandImage);
      }

      await axios.put(
        `${import.meta.env.VITE_BASE_URL}/api/brands/updatebrands/${
          editingBrand.brandId
        }`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setEditingBrand(null);
      setEditedBrandName("");
      setEditedBrandImage(null);
      fetchBrands(); // Refresh brand list after update
    } catch (error) {
      console.error("Error updating brand:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardTemplate>
      <div className="flex flex-col gap-8">
        <Link
          to={"/reboots/product/admin-dashboard-add-brand"}
          className="flex w-[20%] bg-[#191C20] text-white h-[4rem] gap-2 justify-center items-center text-lg font-semibold "
        >
          <span className="text-lg ">
            <FaSquarePlus />
          </span>
          <span>Add New Brand</span>
        </Link>
        <div className="w-[90%] bg-[#191C20]">
          <div className="flex flex-col gap-2">
            <div className="grid grid-cols-3 p-4 border-b-2 border-[#2E2F32] text-white text-lg font-semibold">
              <div>Brand Name</div>
              <div>Preview Logo</div>
              <div>Actions</div>
            </div>
            <div className="flex flex-col h-screen no-scrollbar overflow-auto">
              {brands.map((brand) => (
                <div
                  className="grid grid-cols-3 p-4 text-[#CCCCCC]"
                  key={brand.brandId}
                >
                  {editingBrand && editingBrand.brandId === brand.brandId ? (
                    <>
                      <div className="flex flex-col gap-2">
                        <input
                          type="text"
                          value={editedBrandName}
                          onChange={(e) => setEditedBrandName(e.target.value)}
                          className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                        />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            setEditedBrandImage(e.target.files[0])
                          }
                          className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                        />
                      </div>
                      <div>
                        <img
                          src={brand.brandimage}
                          alt=""
                          className="h-[3rem] w-fit"
                        />
                      </div>
                      <div className="flex flex-row items-center font-semibold gap-5">
                        <button
                          className="text-[#5BC0DE]"
                          disabled={loading}
                          onClick={handleSaveClick}
                        >
                          {loading ? "Uploading..." : "Save"}
                        </button>
                        <button
                          className="text-[#D53F3A]"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-lg font-semibold">
                        {brand.brandId}-{brand.brandname}
                      </div>
                      <div>
                        <img
                          src={brand.brandimage}
                          alt=""
                          className="h-[3rem] w-fit"
                        />
                      </div>
                      <div className="flex flex-row items-center font-semibold gap-5">
                        <button
                          className="text-[#5BC0DE]"
                          onClick={() => handleEditClick(brand)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-[#D53F3A]"
                          onClick={() => handleDeleteClick(brand.brandId)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default ManageBrand;
