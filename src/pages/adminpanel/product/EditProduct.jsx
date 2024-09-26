import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const EditProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const page = queryParams.get("page") || 1;

  // Product fields
  const [categoryName, setCategoryName] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [subSubCategoryName, setSubSubCategoryName] = useState("");
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [brandId, setBrandId] = useState("");
  const [brandimage, setBrandImage] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [price, setPrice] = useState("");
  const [offerPrice, setOfferPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [fullTitleDescription, setFullTitleDescription] = useState("");
  const [inStockAvailable, setInStockAvailable] = useState("");
  const [soldOutStock, setSoldOutStock] = useState("");

  // Images

  const [productthumbnailimage, setProductThumbnailImage] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [images, setImages] = useState([]); // For new images
  const [existingImages, setExistingImages] = useState([]); // For existing images in DB
  const [removedImages, setRemovedImages] = useState([]); // For removed existing images
  const [allImagePreviews, setAllImagePreviews] = useState([]);

  // Dropdown data
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [subsubCategories, setSubsubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const [specifications, setSpecifications] = useState([]);
  const [specificationName, setSpecificationName] = useState("");
  const [specificationDetails, setSpecificationDetails] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editSpecificationName, setEditSpecificationName] = useState("");
  const [editSpecificationDetails, setEditSpecificationDetails] = useState("");

  const [selected3rdLevelCategory, setSelected3rdLevelCategory] = useState("");
  const [selected4thLevelCategory, setSelected4thLevelCategory] = useState("");
  const [thirdLevelCategories, setThirdLevelCategories] = useState([]);
  const [fourthLevelCategories, setFourthLevelCategories] = useState([]);

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

  // Fetch product details to populate fields
  const fetchProduct = async () => {
    try {
      const brandsResponse = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/brands/getbrand`
      );
      const fetchedBrands = brandsResponse.data;
      setBrands(fetchedBrands);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/products/${productId}`
      );
      const product = response.data;

      if (product) {
        setCategoryName(product.categoryName);
        setSubCategoryName(product.subCategoryName);
        setSubSubCategoryName(product.subSubCategoryName);
        setSelected3rdLevelCategory(product.level3subCategoryName);
        setSelected4thLevelCategory(product.level4subCategoryName);
        setTitle(product.title);
        setBrand(product.brand);
        setBrandImage(product.brandimage);
        setModelNumber(product.modelNumber);
        setPrice(product.price);
        setOfferPrice(product.offerPrice);
        setDiscount(product.discount);
        setFullDescription(product.fullDescription);
        setFullTitleDescription(product.fullTitleDescription.join("\n"));
        setSpecifications(product.specifications);
        setInStockAvailable(product.inStockAvailable);
        setSoldOutStock(product.soldOutStock);
        setImages(product.images);
        setProductThumbnailImage(product.productthumbnailimage);

        setExistingImages(product.images); // Set existing images
        // Initialize allImagePreviews with existing images
        const existingImagePreviews = product.images.map((img) => ({
          url: img,
          type: "existing", // Mark them as existing
        }));
        setAllImagePreviews(existingImagePreviews);

        const selectedBrand = fetchedBrands.find(
          (b) =>
            b.brandname.toLowerCase().trim() ===
            product.brand.toLowerCase().trim()
        );

        if (selectedBrand) {
          setBrandId(selectedBrand._id);
        }
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Fetch dropdown data for categories and brands
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

  // Handle image and thumbnail changes
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 512 * 1024; // 512 KB

    const validFiles = [];
    const newImagePreviews = [];

    for (const file of files) {
      if (!validImageTypes.includes(file.type)) {
        alert("Only jpeg, png, and gif image formats are allowed.");
        continue; // Skip invalid types
      }

      if (file.size > maxSize) {
        alert(`Image ${file.name} exceeds the 512 KB size limit.`);
        continue; // Skip files larger than 512 KB
      }

      // If the file passes both checks, add it to the valid files array
      validFiles.push(file);

      // Create a preview URL for the valid file
      newImagePreviews.push({
        url: URL.createObjectURL(file),
        type: "new",
      });
    }

    // Add valid images to the state
    setImages((prevImages) => [...prevImages, ...validFiles]);

    // Add valid image previews to the state
    setAllImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...newImagePreviews,
    ]);
  };

  // Handle removing an image (works for both existing and new images)
  const handleRemoveImage = (index, type) => {
    if (type === "existing") {
      const removedImage = existingImages[index];
      setRemovedImages([...removedImages, removedImage]); // Track removed images
      setExistingImages(existingImages.filter((_, i) => i !== index)); // Update existing images state
    } else if (type === "new") {
      setImages(images.filter((_, i) => i !== index)); // Update new images state
    }

    // Update the preview list
    setAllImagePreviews(allImagePreviews.filter((_, i) => i !== index));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];

    const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
    const maxSize = 512 * 1024;

    if (!file) return;
    if (!validImageTypes.includes(file.type)) {
      alert(
        "Only jpeg, png, and gif image formats are allowed for thumbnails."
      );
      return;
    }
    if (file.size > maxSize) {
      alert("The thumbnail image must be less than 512kb.");
      return;
    }
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

  // Handle dropdown selections
  useEffect(() => {
    fetchMainCategories();
    fetchBrands();
    fetchProduct(); // Load product data when the component mounts
  }, [productId]);

  useEffect(() => {
    if (categoryName) {
      const mainCategory = mainCategories.find(
        (cat) => cat.mainCategory === categoryName
      );
      if (mainCategory) {
        setSubCategories(mainCategory.subcategories || []);
      }
    }
  }, [categoryName, mainCategories]);

  useEffect(() => {
    if (subCategoryName && categoryName) {
      const mainCategory = mainCategories.find(
        (cat) => cat.mainCategory === categoryName
      );
      const subCategory = mainCategory?.subcategories.find(
        (subcat) => subcat.name === subCategoryName
      );
      if (subCategory) {
        setSubsubCategories(subCategory.subsubcategories || []);
      }
    }
  }, [subCategoryName, categoryName, mainCategories]);
  useEffect(() => {
    if (subSubCategoryName) {
      const mainCat = mainCategories.find(
        (cat) => cat.mainCategory === categoryName
      );
      const subCat = mainCat?.subcategories.find(
        (sub) => sub.name === subCategoryName
      );
      const subSubCat = subCat?.subsubcategories.find(
        (subsub) => subsub.name === subSubCategoryName
      );

      if (subSubCat) {
        setThirdLevelCategories(subSubCat.lavel3CategorySchema || []);
        setSelected3rdLevelCategory(selected3rdLevelCategory);
        setSelected4thLevelCategory("");
      } else {
        setThirdLevelCategories([]);
        setFourthLevelCategories([]);
      }
    }
  }, [subSubCategoryName, categoryName, subCategoryName, mainCategories]);

  // Fetch 4th level categories based on 3rd level selection
  useEffect(() => {
    if (selected3rdLevelCategory) {
      const mainCat = mainCategories.find(
        (cat) => cat.mainCategory === categoryName
      );
      const subCat = mainCat?.subcategories.find(
        (sub) => sub.name === subCategoryName
      );
      const subSubCat = subCat?.subsubcategories.find(
        (subsub) => subsub.name === subSubCategoryName
      );
      const thirdLevelCat = subSubCat?.lavel3CategorySchema.find(
        (level3) => level3.name === selected3rdLevelCategory
      );

      if (thirdLevelCat) {
        setFourthLevelCategories(thirdLevelCat.lavel4CategorySchema || []);
        setSelected4thLevelCategory(selected4thLevelCategory); // Reset 4th level category selection
      } else {
        setFourthLevelCategories([]); // Clear if no 4th level available
      }
    }
  }, [
    selected3rdLevelCategory,
    subSubCategoryName,
    subCategoryName,
    categoryName,
  ]);

  useEffect(() => {
    const cleanPrice = price ? parseFloat(price.replace(/,/g, "")) : 0; // Fallback to 0 if price is null/undefined
    if (price && discount) {
      const discountValue = (cleanPrice * parseFloat(discount)) / 100;
      setOfferPrice(Math.round(cleanPrice - discountValue));
    } else {
      setOfferPrice(Math.round(cleanPrice)); // Set offerPrice to price if no discount
    }
  }, [price, discount]);

  // Handle updating the product
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("categoryName", categoryName);
    formData.append("subCategoryName", subCategoryName);
    formData.append("subSubCategoryName", subSubCategoryName);
    formData.append("level3subCategoryName", selected3rdLevelCategory); // Add this
    formData.append("level4subCategoryName", selected4thLevelCategory);
    formData.append("title", title);
    formData.append("brand", brand);
    formData.append("brandimage", brandimage);
    formData.append("modelNumber", modelNumber);
    formData.append("price", price);
    formData.append("offerPrice", offerPrice);
    formData.append("discount", discount);
    formData.append("fullDescription", fullDescription);
    formData.append("fullTitleDescription", fullTitleDescription);
    formData.append("specifications", JSON.stringify(specifications));
    formData.append("inStockAvailable", inStockAvailable);
    formData.append("soldOutStock", soldOutStock);
    formData.append("removedImages", JSON.stringify(removedImages));

    images.forEach((image) => {
      formData.append("images", image);
    });
    if (productthumbnailimage) {
      formData.append("productthumbnailimage", productthumbnailimage);
    }

    try {
      await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/products/update/${productId}?page=${page}`,
        formData
      );
      navigate(`/reboots/product/admin-dashboard-manage-product?page=${page}`);
    } catch (error) {
      console.error("Error updating product:", error);
      alert(
        "Please provide all required fields (category, model number, title, brand, price, product thumbnail image, and images) for publishing."
      );
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
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select Category</option>
                {mainCategories.map((cat) => (
                  <option key={cat._id} value={cat.mainCategory}>
                    {cat.mainCategory}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Select Sub Category</label>
              <select
                name="subCategoryName"
                value={subCategoryName}
                onChange={(e) => setSubCategoryName(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select Sub Category</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub.name}>
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
                value={subSubCategoryName}
                onChange={(e) => setSubSubCategoryName(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select Sub Sub Category</option>
                {subsubCategories.map((subsub) => (
                  <option key={subsub._id} value={subsub.name}>
                    {subsub.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Select 3rd Level Category</label>
              <select
                name="level3subCategoryName"
                value={selected3rdLevelCategory}
                onChange={(e) => setSelected3rdLevelCategory(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select 3rd Level Category</option>
                {thirdLevelCategories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Select 4th Level Category</label>
              <select
                name="level4subCategoryName"
                value={selected4thLevelCategory}
                onChange={(e) => setSelected4thLevelCategory(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select 4th Level Category</option>
                {fourthLevelCategories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Enter Title*</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Enter Product Title"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Select Brand*</label>
              <select
                name="brand"
                value={brandId || ""} // Set value to brandId or an empty string initially
                onChange={(e) => {
                  const selectedBrand = brands.find(
                    (b) => b._id === e.target.value
                  );
                  if (selectedBrand) {
                    setBrand(selectedBrand.brandname); // Set the brand name
                    setBrandId(selectedBrand._id); // Set the brand ID
                    setBrandImage(selectedBrand.brandimage);
                  }
                }}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              >
                <option value="">Select Brand</option>
                {brands.length > 0
                  ? brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brandname} {/* Show brandname */}
                      </option>
                    ))
                  : null}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label>Model Number*</label>
              <input
                type="text"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Enter Model Number"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>MRP (Price)*</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Enter Product Price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Discount (%)</label>
              <input
                type="text"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Enter Discount Percentage"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Offer Price</label>
              <input
                type="text"
                value={offerPrice}
                readOnly
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Offer Price"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>In Stock (Available)</label>
              <input
                type="text"
                value={inStockAvailable}
                onChange={(e) => setInStockAvailable(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="In Stock Availability"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 w-full gap-4">
            <div className="flex flex-col gap-2">
              <label>Full Title Description</label>
              <textarea
                value={fullTitleDescription}
                onChange={(e) => setFullTitleDescription(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Enter Full Title Description"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Sold Out Stock</label>
              <input
                type="text"
                value={soldOutStock}
                onChange={(e) => setSoldOutStock(e.target.value)}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
                placeholder="Sold Out Stock"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 w-full gap-4">
            <div className="flex flex-col gap-2 text-white">
              <label>Enter Description (Bullet Points)</label>
              <ReactQuill
                value={fullDescription}
                onChange={setFullDescription}
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
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col gap-2 w-full">
              <label>Product Image Upload*</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              />
              <div className="grid grid-cols-6 gap-4">
                {allImagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img
                      src={preview.url}
                      alt={`Product Image ${index + 1}`}
                      className="w-full h-[80px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index, preview.type)}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6"
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
                className="h-[3.5rem] p-2 bg-[#2A3038] text-white"
              />
              {thumbnailPreview ? (
                <div>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-[80px] h-[80px] object-cover"
                  />
                </div>
              ) : productthumbnailimage ? (
                <div>
                  <img
                    src={productthumbnailimage}
                    alt="Product Thumbnail"
                    className="w-[80px] h-[80px] object-cover"
                  />
                </div>
              ) : null}
            </div>
          </div>

          <div className="flex flex-row items-center w-[70%] gap-2">
            <button
              type="submit"
              className="h-[3.5rem] w-[50%] p-2 bg-[#5BC0DE] text-white rounded-sm"
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Product"}
            </button>
            <button
              type="button"
              className="h-[3.5rem] w-[50%] p-2 bg-red-700 text-white rounded-sm"
              onClick={() =>
                navigate(
                  `/reboots/product/admin-dashboard-manage-product?page=${page}`
                )
              }
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </AdminDashboardTemplate>
  );
};

export default EditProduct;
