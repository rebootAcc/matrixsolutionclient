import React, { useEffect, useRef, useState } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddNewProduct = () => {
  const [description, setDescription] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const fileInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [productthumbnailimage, setProductThumbnailImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [inStockAvailable, setInStockAvailable] = useState("");
  const [fullTitleDescription, setFullTitleDescription] = useState("");
  const [soldOutStock, setSoldOutStock] = useState("");
  const [brand, setBrand] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandimage, setBrandImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [selectedSubsubCategory, setSelectedSubsubCategory] = useState("");
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [specifications, setSpecifications] = useState([]);
  const [specificationName, setSpecificationName] = useState("");
  const [specificationDetails, setSpecificationDetails] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editSpecificationName, setEditSpecificationName] = useState("");
  const [editSpecificationDetails, setEditSpecificationDetails] = useState("");

  useEffect(() => {
    if (price && discount) {
      const cleanPrice = parseFloat(price.replace(/,/g, ""));
      const discountValue = (cleanPrice * parseFloat(discount)) / 100;
      setOfferPrice(Math.round(cleanPrice - discountValue));
    } else {
      setOfferPrice(Math.round(parseFloat(price.replace(/,/g, ""))));
    }
  }, [price, discount]);

  const handleDescriptionChange = (value) => {
    setDescription(value);
  };

  const handleBrandChange = (e) => {
    const selectedBrand = brands.find((brand) => brand._id === e.target.value);
    if (selectedBrand) {
      setBrand(selectedBrand.brandname);
      setBrandId(selectedBrand._id);
      setBrandImage(selectedBrand.brandimage);
    }
  };

  // Handle product image selection and preview generation
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);

    // Validate file type and size
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 2 * 1024 * 1024; // 2MB limit per image

    for (const file of selectedFiles) {
      if (!validImageTypes.includes(file.type)) {
        alert("Only jpeg, png, and gif image formats are allowed.");
        return;
      }
      if (file.size > maxSize) {
        alert("Each image must be less than 2MB.");
        return;
      }
    }

    setImages((prevImages) => [...prevImages, ...selectedFiles]);

    const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previewUrls]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const handleThumbnailChange = (event) => {
    const file = event.target.files[0];
    setProductThumbnailImage(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleEditSpecification = (index) => {
    setEditingIndex(index);
    setEditSpecificationName(specifications[index].name);
    setEditSpecificationDetails(specifications[index].details.join("\n"));
  };

  const handleUpdateSpecification = (index) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index] = {
      name: editSpecificationName,
      details: editSpecificationDetails.split("\n"),
    };
    setSpecifications(updatedSpecifications);
    setEditingIndex(null);
  };

  const handleDeleteSpecification = (index) => {
    const updatedSpecifications = specifications.filter((_, i) => i !== index);
    setSpecifications(updatedSpecifications);
  };

  const handleAddSpecification = (e) => {
    e.preventDefault();

    if (!specificationName || !specificationDetails) {
      alert("Please enter both specification name and details.");
      return;
    }

    const detailsArray = specificationDetails.split("\n");

    const newSpecification = {
      name: specificationName,
      details: detailsArray,
    };

    setSpecifications([...specifications, newSpecification]);
    setSpecificationName("");
    setSpecificationDetails("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !categoryName ||
      !title ||
      !brand ||
      !modelNumber ||
      !price ||
      !productthumbnailimage
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("subCategoryName", selectedSubCategory);
    formData.append("subSubCategoryName", selectedSubsubCategory);
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("brandimage", brandimage); // You may skip if it's coming from the brand
    formData.append("modelNumber", modelNumber);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("offerPrice", offerPrice);
    formData.append("inStockAvailable", inStockAvailable);
    formData.append("fullTitleDescription", fullTitleDescription); // Optional
    formData.append("soldOutStock", soldOutStock);
    formData.append("fullDescription", description);
    formData.append("active", true);
    formData.append("isdraft", false);

    // Append specifications as JSON string
    formData.append("specifications", JSON.stringify(specifications));

    // Append images and thumbnail image
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("productthumbnailimage", productthumbnailimage);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products/add`,
        formData
      );

      navigate("/reboots/product/admin-dashboard-manage-product");
    } catch (error) {
      console.error("Error creating product:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        alert("No response received from server. Please try again.");
      } else {
        alert(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveAsDraft = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !categoryName ||
      !title ||
      !brand ||
      !brandimage ||
      !modelNumber ||
      !price ||
      !productthumbnailimage
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("subCategoryName", selectedSubCategory);
    formData.append("title", title);
    formData.append("subSubCategoryName", selectedSubsubCategory);
    formData.append("shortDescription", shortDescription);
    formData.append("bulletPoints", bulletPoints);
    formData.append("brand", brand);
    formData.append("brandimage", brandimage);
    formData.append("modelNumber", modelNumber);
    formData.append("price", price);
    formData.append("discount", discount);
    formData.append("offerPrice", offerPrice); // Add offer price
    formData.append("fullDescription", description);
    formData.append("active", false);
    formData.append("isdraft", true);

    // Append images and thumbnail image
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    formData.append("productthumbnailimage", productthumbnailimage);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/products/add`,
        formData
      );

      navigate("/reboots/product/admin-dashboard-manage-product");
    } catch (error) {
      console.error("Error saving product as draft:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.message}`);
      }
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else if (error.request) {
        alert("No response received from server. Please try again.");
      } else {
        alert(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "list",
    "bullet",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "align",
    "color",
    "background",
    "link",
    "image",
    "video",
  ];

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

  useEffect(() => {
    fetchMainCategories();
    fetchBrands();
  }, []);

  useEffect(() => {
    if (selectedMainCategory) {
      setCategoryName(selectedMainCategory); // Update categoryName state
      const mainCat = mainCategories.find(
        (cat) => cat.mainCategory === selectedMainCategory
      );
      if (mainCat) {
        setSubCategories(mainCat.subcategories || []);
        setSelectedSubCategory(""); // Reset selected subcategory
        setSelectedSubsubCategory(""); // Reset selected sub-subcategory
      } else {
        setSubCategories([]);
      }
    } else {
      setSubCategories([]);
    }
  }, [selectedMainCategory, mainCategories]);

  useEffect(() => {
    if (selectedSubCategory) {
      const mainCat = mainCategories.find(
        (cat) => cat.mainCategory === selectedMainCategory
      );
      const subCat = mainCat.subcategories.find(
        (subcat) => subcat.name === selectedSubCategory
      );
      if (subCat) {
        setSubsubCategories(subCat.subsubcategories || []);
        setSelectedSubsubCategory("");
      } else {
        setSubsubCategories([]);
      }
    } else {
      setSubsubCategories([]);
    }
  }, [selectedSubCategory, selectedMainCategory, mainCategories]);

  return (
    <AdminDashboardTemplate>
      <div className="w-[95%] bg-[#191C20] p-4">
        <form
          className="flex flex-col gap-4 text-white"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Select Category Name*</label>
              <select
                name="categoryName"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                value={selectedMainCategory}
                onChange={(e) => setSelectedMainCategory(e.target.value)}
              >
                <option value="" className="text-[#CCCCCC2B]">
                  select a category
                </option>
                {mainCategories.map((cat) => (
                  <option
                    key={cat._id}
                    className="white"
                    value={cat.mainCategory}
                  >
                    {cat.mainCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Select Sub Category</label>
              <select
                name="subCategoryName"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                value={selectedSubCategory}
                onChange={(e) => setSelectedSubCategory(e.target.value)}
              >
                <option value="" className="text-[#CCCCCC2B]">
                  select a sub category
                </option>
                {subCategories.map((sub) => (
                  <option key={sub._id} className="text-white" value={sub.name}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Select Sub Sub Category</label>
              <select
                name="subSubCategoryName"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                value={selectedSubsubCategory}
                onChange={(e) => setSelectedSubsubCategory(e.target.value)}
              >
                <option value="" className="text-[#CCCCCC2B]">
                  select a sub sub category
                </option>
                {subsubCategories.map((subsub) => (
                  <option
                    key={subsub._id}
                    className="text-white"
                    value={subsub.name}
                  >
                    {subsub.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Enter Title*</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Product Title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Brand*</label>
              <select
                name="brand"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-[white] rounded-sm"
                value={brandId}
                onChange={handleBrandChange}
              >
                <option value="" className="text-[#CCCCCC2B]">
                  select a brand
                </option>
                {brands.map((brand) => (
                  <option
                    key={brand._id}
                    className="text-white"
                    value={brand._id}
                  >
                    {brand.brandname}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Model Number*</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Model Number"
                name="modelNumber"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
              />
              {errorMessage && (
                <span className="text-red-500 text-sm">{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>MRP (Price)*</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Product Price"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Discount (%)</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Discount Percentage"
                name="discount"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Offer Price</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Offer Price"
                name="offerPrice"
                value={offerPrice}
                readOnly
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>In Stock (Available)</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Stock Available"
                name="inStockAvailable"
                value={inStockAvailable}
                onChange={(e) => setInStockAvailable(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Enter Full Title In Description*</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Full Title Description"
                name="fullTitleDescription"
                value={fullTitleDescription}
                onChange={(e) => setFullTitleDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Sold Out (Sell)</label>
              <input
                type="text"
                className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                placeholder="Enter Sold Out Stock"
                name="soldOutStock"
                value={soldOutStock}
                onChange={(e) => setSoldOutStock(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 w-full gap-4">
            <div className="flex flex-col gap-2 text-white">
              <label>Enter Description* (Bullet Points)</label>
              <ReactQuill
                value={description}
                onChange={handleDescriptionChange}
                modules={modules}
                formats={formats}
                className="bg-[#2A3038] !text-white"
              />
            </div>
          </div>

          <div className="flex flex-col w-full ">
            <div className="h-[3.5rem] items-center flex px-4 w-full bg-[#2A3038]">
              Specification
            </div>
            <div className="flex flex-col border border-[#2A3038]">
              {specifications.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-row border-b border-[#2A3038] gap-4"
                >
                  {editingIndex === index ? (
                    <>
                      <div className="w-[30%] p-4 border-r border-[#2a3038]">
                        <input
                          type="text"
                          value={editSpecificationName}
                          onChange={(e) =>
                            setEditSpecificationName(e.target.value)
                          }
                          className="p-2 text-black"
                        />
                      </div>
                      <div className="w-[70%] p-4">
                        <textarea
                          value={editSpecificationDetails}
                          onChange={(e) =>
                            setEditSpecificationDetails(e.target.value)
                          }
                          className="p-2 w-[80%] text-black"
                        />
                      </div>
                      <button onClick={() => handleUpdateSpecification(index)}>
                        Update
                      </button>
                      <button onClick={() => setEditingIndex(null)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="w-[30%] border-r border-[#2a3038] p-4">
                        {item.name}
                      </div>
                      <div className="w-[70%] p-4">
                        {item.details.map((item, index) => (
                          <div key={index}>{item}</div>
                        ))}
                      </div>
                      <div className="flex justify-start items-start gap-4 p-2">
                        <button onClick={() => handleEditSpecification(index)}>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSpecification(index)}
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
          <div className="w-full flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="flex flex-col gap-2">
                <label>Specification Item Name</label>
                <input
                  type="text"
                  className="h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                  placeholder="Specification Item Name"
                  name="specificationName"
                  value={specificationName}
                  onChange={(e) => setSpecificationName(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Specification Item Details</label>
                <textarea
                  className="h-[3.5rem] p-2 focus:outline-none text-start outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                  placeholder="Specification Item Details"
                  name="specificationDetails"
                  value={specificationDetails}
                  onChange={(e) => setSpecificationDetails(e.target.value)}
                />
              </div>
            </div>
            <button
              type="button"
              onClick={handleAddSpecification}
              className="w-fit px-10 flex justify-center items-center bg-[#5BC0DE] text-white text-lg h-[3rem]"
            >
              Submit
            </button>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2 w-full">
              <label>Product Image Upload*</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
                onChange={handleImageChange}
                ref={fileInputRef} // Ref to reset file input
              />
              {images.length > 0 && (
                <p className="text-gray-300">
                  {images.length} file(s) selected
                </p>
              )}
              <div className="grid grid-cols-6 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview}
                      alt={`Product Preview ${index + 1}`}
                      className="w-full h-[80px] object-cover"
                    />
                    {/* Remove button on the top-right corner */}
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full w-6 h-6 flex justify-center items-center"
                    >
                      &minus;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <label>Thumbnail Image*</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full h-[3.5rem] p-2 focus:outline-none outline-[#5BC0DE] bg-[#2A3038] text-white rounded-sm"
              />
              {thumbnailPreview && (
                <div>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-[80px] h-[80px] object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row gap-4 items-center">
            <button
              type="submit"
              className="w-[10%] h-[3.5rem] p-2 bg-[#5BC0DE] text-[white] rounded-sm"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              type="button"
              onClick={handleSaveAsDraft}
              className="w-[10%] h-[3.5rem] p-2 bg-[#5BC0DE] text-[white] rounded-sm"
              disabled={loading}
            >
              {loading ? "Saving as Draft..." : "Save As Draft"}
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardTemplate>
  );
};

export default AddNewProduct;
