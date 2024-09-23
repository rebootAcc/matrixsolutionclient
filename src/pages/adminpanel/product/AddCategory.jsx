import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import axios from "axios";

const AddCategory = () => {
  const [subcategory, setSubcategory] = useState(false);
  const [subsubcategory, setSubSubcategory] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [loading, setLoading] = useState(false);

  const opensubcategory = () => {
    setSubcategory(!subcategory);
  };
  const opensubsubcategory = () => {
    setSubSubcategory(!subsubcategory);
  };

  const fetchMainCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/categories/getcategory`
      );
      setMainCategories(response.data);
    } catch (error) {
      console.error("Error fetching main categories:", error);
    }
  };

  useEffect(() => {
    fetchMainCategories();
  }, []);

  useEffect(() => {
    if (selectedMainCategory) {
      const mainCat = mainCategories.find(
        (cat) => cat.mainCategory === selectedMainCategory
      );
      if (mainCat) {
        setSubCategories(mainCat.subcategories || []);
      }
    } else {
      setSubCategories([]);
    }
  }, [selectedMainCategory, mainCategories]);

  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/main`, {
        mainCategory,
      });
      setMainCategory("");
      fetchMainCategories();
    } catch (error) {
      console.error("Error adding main category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/sub`, {
        mainCategory: selectedMainCategory,
        subCategoryName,
      });
      setSubCategoryName("");
      fetchMainCategories();
    } catch (error) {
      console.error("Error adding sub category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubSubCategorySubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/categories/subsub`,
        {
          mainCategory: selectedMainCategory,
          subCategoryName: selectedSubCategory,
          subSubCategoryName,
        }
      );
      setSubSubCategoryName("");
      fetchMainCategories();
    } catch (error) {
      console.error("Error adding sub sub category:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminDashboardTemplate>
      <div className="w-[90%]">
        <div className="p-4 flex flex-col gap-6 bg-[#191C20]">
          <form
            className="flex w-full flex-col gap-2"
            onSubmit={handleMainCategorySubmit}
          >
            <label className="text-lg text-white">Enter Category Name</label>
            <div className="w-full flex items-center gap-4">
              <input
                type="text"
                value={mainCategory}
                onChange={(e) => setMainCategory(e.target.value)}
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

          <div className="flex flex-col gap-4">
            <div
              onClick={opensubcategory}
              className="text-xl font-semibold cursor-pointer text-[#ED9C27]"
            >
              Add Sub Category
            </div>
            {subcategory && (
              <div className="flex flex-col gap-8">
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubCategorySubmit}
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-white">
                      Select Category First
                    </label>
                    <select
                      name="mainCategory"
                      value={selectedMainCategory}
                      onChange={(e) => setSelectedMainCategory(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                    >
                      <option value="" className="text-[white]">
                        choose a category first
                      </option>
                      {mainCategories.map((cat) => (
                        <option
                          key={cat._id}
                          className="text-white"
                          value={cat.mainCategory}
                        >
                          {cat.mainCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-lg text-white">
                      Enter Sub Category Name
                    </label>
                    <div className="w-full flex items-center gap-4">
                      <input
                        type="text"
                        value={subCategoryName}
                        onChange={(e) => setSubCategoryName(e.target.value)}
                        className="w-[40%] h-[3.5rem] p-2 focus:outline-none  outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                      />
                      <button
                        disabled={loading}
                        type="submit"
                        className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
                      >
                        {loading ? "Uploading..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </form>

                <div className="flex flex-col gap-6">
                  <div
                    onClick={opensubsubcategory}
                    className="text-xl font-semibold cursor-pointer text-[#C85BFB]"
                  >
                    Add Sub-Sub Category
                  </div>
                  {subsubcategory && (
                    <form
                      className="flex flex-col gap-6"
                      onSubmit={handleSubSubCategorySubmit}
                    >
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold text-white">
                          Select Category First
                        </label>
                        <select
                          name="mainCategory"
                          value={selectedMainCategory}
                          onChange={(e) =>
                            setSelectedMainCategory(e.target.value)
                          }
                          className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                        >
                          <option value="" className="text-[white]">
                            choose a category first
                          </option>
                          {mainCategories.map((cat) => (
                            <option
                              key={cat._id}
                              className="text-white"
                              value={cat.mainCategory}
                            >
                              {cat.mainCategory}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg font-semibold text-white">
                          Select Sub Category
                        </label>
                        <select
                          name="subCategoryName"
                          value={selectedSubCategory}
                          onChange={(e) =>
                            setSelectedSubCategory(e.target.value)
                          }
                          className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                        >
                          <option value="" className="text-[#CCCCCC2B]">
                            choose sub category
                          </option>
                          {subCategories.map((sub) => (
                            <option
                              key={sub._id}
                              className="text-white"
                              value={sub.name}
                            >
                              {sub.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-lg text-white">
                          Enter Sub-Sub Category Name
                        </label>
                        <div className="w-full flex items-center gap-4">
                          <input
                            type="text"
                            value={subSubCategoryName}
                            onChange={(e) =>
                              setSubSubCategoryName(e.target.value)
                            }
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
                      </div>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddCategory;
