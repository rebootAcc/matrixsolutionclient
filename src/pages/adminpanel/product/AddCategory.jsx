import React, { useState, useEffect } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import axios from "axios";

const AddCategory = () => {
  const [subcategory, setSubcategory] = useState(false);
  const [subsubcategory, setSubSubcategory] = useState(false);
  const [lavel3category, setLavel3category] = useState(false);
  const [lavel4category, setLavel4category] = useState(false);

  const [mainCategory, setMainCategory] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [lavel3CategoryName, setLavel3CategoryName] = useState("");
  const [lavel4CategoryName, setLavel4CategoryName] = useState("");

  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subSubCategories, setSubSubCategories] = useState([]);
  const [lavel3Categories, setLavel3Categories] = useState([]);

  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubSubCategory, setSelectedSubSubCategory] = useState("");
  const [selectedLavel3Category, setSelectedLavel3Category] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const opensubcategory = () => setSubcategory(!subcategory);
  const opensubsubcategory = () => setSubSubcategory(!subsubcategory);
  const openlavel3category = () => setLavel3category(!lavel3category);
  const openlavel4category = () => setLavel4category(!lavel4category);

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

  useEffect(() => {
    if (selectedSubCategory) {
      const subCat = subCategories.find(
        (sub) => sub.name === selectedSubCategory
      );
      if (subCat) {
        setSubSubCategories(subCat.subsubcategories || []);
      }
    } else {
      setSubSubCategories([]);
    }
  }, [selectedSubCategory, subCategories]);

  useEffect(() => {
    if (selectedSubSubCategory) {
      const subSubCat = subSubCategories.find(
        (subSub) => subSub.name === selectedSubSubCategory
      );
      if (subSubCat) {
        setLavel3Categories(subSubCat.lavel3CategorySchema || []);
      }
    } else {
      setLavel3Categories([]);
    }
  }, [selectedSubSubCategory, subSubCategories]);

  const handleMainCategorySubmit = async (e) => {
    e.preventDefault();
    if (!mainCategory) {
      setErrorMessage("Main category is required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/main`, {
        mainCategory,
      });
      setMainCategory("");
      setSuccessMessage("Main category added successfully");
      fetchMainCategories();
    } catch (error) {
      setErrorMessage("Error adding main category");
    } finally {
      setLoading(false);
    }
  };

  const handleSubCategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedMainCategory || !subCategoryName) {
      setErrorMessage("Main category and subcategory are required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/categories/sub`, {
        mainCategory: selectedMainCategory,
        subCategoryName,
      });
      setSubCategoryName("");
      setSuccessMessage("Subcategory added successfully");
      fetchMainCategories();
    } catch (error) {
      setErrorMessage("Error adding subcategory");
    } finally {
      setLoading(false);
    }
  };

  const handleSubSubCategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubCategory || !subSubCategoryName) {
      setErrorMessage("Subcategory and sub-subcategory are required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
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
      setSuccessMessage("Sub-subcategory added successfully");
      fetchMainCategories();
    } catch (error) {
      setErrorMessage("Error adding sub-subcategory");
    } finally {
      setLoading(false);
    }
  };

  const handleLavel3CategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedSubSubCategory || !lavel3CategoryName) {
      setErrorMessage("Sub-subcategory and 3rd level category are required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/categories/lavel3`,
        {
          mainCategory: selectedMainCategory,
          subCategoryName: selectedSubCategory,
          subSubCategoryName: selectedSubSubCategory,
          lavel3CategoryName,
        }
      );
      setLavel3CategoryName("");
      setSuccessMessage("3rd level category added successfully");
      fetchMainCategories();
    } catch (error) {
      setErrorMessage("Error adding 3rd level category");
    } finally {
      setLoading(false);
    }
  };

  const handleLavel4CategorySubmit = async (e) => {
    e.preventDefault();
    if (!selectedLavel3Category || !lavel4CategoryName) {
      setErrorMessage("3rd level category and 4th level category are required");
      return;
    }
    setLoading(true);
    setErrorMessage("");
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/categories/lavel4`,
        {
          mainCategory: selectedMainCategory,
          subCategoryName: selectedSubCategory,
          subSubCategoryName: selectedSubSubCategory,
          lavel3CategoryName: selectedLavel3Category,
          lavel4CategoryName,
        }
      );
      setLavel4CategoryName("");
      setSuccessMessage("4th level category added successfully");
      fetchMainCategories();
    } catch (error) {
      setErrorMessage("Error adding 4th level category");
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
            {successMessage && (
              <p className="text-green-500">{successMessage}</p>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </form>

          {/* Add Sub Category Section */}
          <div className="flex flex-col gap-4">
            <div
              onClick={opensubcategory}
              className="text-xl font-semibold cursor-pointer text-[#ED9C27]"
            >
              Add Sub Category
            </div>
            {subcategory && (
              <div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubCategorySubmit}
                >
                  {/* Select Main Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-white">
                      Select Category First
                    </label>
                    <select
                      value={selectedMainCategory}
                      onChange={(e) => setSelectedMainCategory(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                    >
                      <option value="">Choose a category first</option>
                      {mainCategories.map((cat) => (
                        <option key={cat._id} value={cat.mainCategory}>
                          {cat.mainCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Enter Sub Category Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg text-white">
                      Enter Sub Category Name
                    </label>
                    <input
                      type="text"
                      value={subCategoryName}
                      onChange={(e) => setSubCategoryName(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 bg-[#2A3038] text-white rounded-sm"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
                  >
                    {loading ? "Uploading..." : "Submit"}
                  </button>
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </form>
                <div
                  onClick={opensubsubcategory}
                  className="text-xl font-semibold cursor-pointer text-[#C85BFB]"
                >
                  Add Sub-Sub Category
                </div>
              </div>
            )}
          </div>

          {/* Add Sub-Sub Category Section */}
          <div className="flex flex-col gap-4">
            {subsubcategory && (
              <div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleSubSubCategorySubmit}
                >
                  {/* Select Sub Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-white">
                      Select Sub Category
                    </label>
                    <select
                      value={selectedSubCategory}
                      onChange={(e) => setSelectedSubCategory(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                    >
                      <option value="">Choose sub category</option>
                      {subCategories.map((sub) => (
                        <option key={sub._id} value={sub.name}>
                          {sub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Enter Sub-Sub Category Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg text-white">
                      Enter Sub-Sub Category Name
                    </label>
                    <input
                      type="text"
                      value={subSubCategoryName}
                      onChange={(e) => setSubSubCategoryName(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 bg-[#2A3038] text-white rounded-sm"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
                  >
                    {loading ? "Uploading..." : "Submit"}
                  </button>
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </form>
                <div
                  onClick={openlavel3category}
                  className="text-xl font-semibold cursor-pointer text-[#FF5733]"
                >
                  Add 3rd Level Category
                </div>
              </div>
            )}
          </div>

          {/* Add 3rd Level Category Section */}
          <div className="flex flex-col gap-4">
            {lavel3category && (
              <div>
                <form
                  className="flex flex-col gap-6"
                  onSubmit={handleLavel3CategorySubmit}
                >
                  {/* Select Sub-Sub Category */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg font-semibold text-white">
                      Select Sub-Sub Category
                    </label>
                    <select
                      value={selectedSubSubCategory}
                      onChange={(e) =>
                        setSelectedSubSubCategory(e.target.value)
                      }
                      className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                    >
                      <option value="">Choose sub-sub category</option>
                      {subSubCategories.map((subSub) => (
                        <option key={subSub._id} value={subSub.name}>
                          {subSub.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Enter 3rd Level Category Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-lg text-white">
                      Enter 3rd Level Category Name
                    </label>
                    <input
                      type="text"
                      value={lavel3CategoryName}
                      onChange={(e) => setLavel3CategoryName(e.target.value)}
                      className="w-[40%] h-[3.5rem] p-2 bg-[#2A3038] text-white rounded-sm"
                    />
                  </div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
                  >
                    {loading ? "Uploading..." : "Submit"}
                  </button>
                  {successMessage && (
                    <p className="text-green-500">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500">{errorMessage}</p>
                  )}
                </form>
                <div
                  onClick={openlavel4category}
                  className="text-xl font-semibold cursor-pointer text-[#33FFBD]"
                >
                  Add 4th Level Category
                </div>
              </div>
            )}
          </div>

          {/* Add 4th Level Category Section */}
          <div className="flex flex-col gap-4">
            {lavel4category && (
              <form
                className="flex flex-col gap-6"
                onSubmit={handleLavel4CategorySubmit}
              >
                {/* Select 3rd Level Category */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg font-semibold text-white">
                    Select 3rd Level Category
                  </label>
                  <select
                    value={selectedLavel3Category}
                    onChange={(e) => setSelectedLavel3Category(e.target.value)}
                    className="w-[40%] h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                  >
                    <option value="">Choose 3rd level category</option>
                    {lavel3Categories.map((lavel3) => (
                      <option key={lavel3._id} value={lavel3.name}>
                        {lavel3.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Enter 4th Level Category Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-lg text-white">
                    Enter 4th Level Category Name
                  </label>
                  <input
                    type="text"
                    value={lavel4CategoryName}
                    onChange={(e) => setLavel4CategoryName(e.target.value)}
                    className="w-[40%] h-[3.5rem] p-2 bg-[#2A3038] text-white rounded-sm"
                  />
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="w-[15%] h-[3.5rem] bg-[#5BC0DE] rounded-sm text-lg text-white font-medium flex justify-center items-center"
                >
                  {loading ? "Uploading..." : "Submit"}
                </button>
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddCategory;
