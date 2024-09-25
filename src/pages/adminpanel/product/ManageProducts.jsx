import React, { useState, useEffect, useMemo } from "react";
import AdminDashboardTemplate from "../../../component/admindashboardcomponent/AdminDashboardTemplate";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSquarePlus } from "react-icons/fa6";
import LoadingAnimation from "../../../component/admindashboardcomponent/LoadingAnimation";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [loading, setLoading] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page"), 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const itemsPerPage = 15;
  const [totalPages, setTotalPages] = useState(0);
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingPage(true);
      try {
        const params = new URLSearchParams();

        // Add pagination query params
        params.append("page", currentPage);
        params.append("limit", itemsPerPage);

        // Add category and brand filters if selected
        if (selectedCategory) {
          params.append("categoryName", selectedCategory);
        }
        if (selectedBrand) {
          params.append("brand", selectedBrand);
        }

        const response = await axios.get(
          `${
            import.meta.env.VITE_BASE_URL
          }/api/products/all?${params.toString()}`
        );

        // Handle the response: extract products, page, and total pages
        const { data, page, totalPages } = response.data;

        setProducts(data);
        setCurrentPage(page);
        setTotalPages(totalPages); // assuming totalPages is returned from the backend
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoadingPage(false); // Hide loading animation when fetching ends
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory, selectedBrand]);

  useEffect(() => {
    const fetchCategoriesAndBrands = async () => {
      try {
        const categoriesResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/categories/getcategory`
        );
        setCategories(categoriesResponse.data);

        const brandsResponse = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/brands/getbrand`
        );
        setBrands(brandsResponse.data);
      } catch (error) {
        console.error("Error fetching categories or brands:", error);
      }
    };
    fetchCategoriesAndBrands();
  }, []);

  const toggleActiveState = async (productId, index) => {
    try {
      const response = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/products/toggle-active/${productId}`
      );
      const updatedProduct = response.data;

      // Find the index of the product in the main products list
      const updatedProducts = products.map((product) =>
        product.productId === productId ? updatedProduct : product
      );
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error updating product active state:", error);
    }
  };

  const deleteProduct = async (productId, index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return; // Exit the function if user cancels the confirmation
    }
    setLoading((prevState) => ({ ...prevState, [productId]: true }));

    try {
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/products/delete/${productId}`
      );
      const updatedProducts = products.filter((_, idx) => idx !== index);
      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setLoading((prevState) => ({ ...prevState, [productId]: false }));
    }
  };

  const navigate = useNavigate();
  const handleEdit = (productId) => {
    navigate(
      `/reboots/product/admin-dashboard-edit-product/${productId}?page=${currentPage}`
    );
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
    setCurrentPage(1); // Reset to page 1 when filter changes
  };

  const currentItems = products;

  useEffect(() => {
    setTotalPages(Math.ceil(products.length / itemsPerPage));
  }, [products, itemsPerPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageRange = 5; // Number of page links to show
  let startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  let endPage = startPage + pageRange - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - pageRange + 1);
  }

  return (
    <AdminDashboardTemplate>
      <div className="flex flex-col gap-6">
        <div className="flex flex-row gap-4 items-center">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="flex w-[20%] bg-[#191C20] text-white h-[4rem] gap-2 justify-center items-center text-lg font-semibold"
          >
            <option value="">Filter By Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.mainCategory}>
                {category.mainCategory}
              </option>
            ))}
          </select>
          <select
            value={selectedBrand}
            onChange={handleBrandChange}
            className="flex w-[20%] bg-[#191C20] text-white h-[4rem] gap-2 justify-center items-center text-lg font-semibold"
          >
            <option value="">Filter By Brand</option>
            {brands.map((brand) => (
              <option key={brand._id} value={brand.brandname}>
                {brand.brandname}
              </option>
            ))}
          </select>
          <Link
            to={"/reboots/product/admin-dashboard-add-new-product"}
            className="flex w-[20%] bg-[#191C20] text-white h-[4rem] gap-2 justify-center items-center text-lg font-semibold "
          >
            <span className="text-lg ">
              <FaSquarePlus />
            </span>
            <span>Add Product</span>
          </Link>
        </div>
        <div className="w-[97%] bg-[#191C20]">
          {loadingPage ? (
            <LoadingAnimation />
          ) : (
            <div className="flex flex-col gap-2">
              <div className="grid grid-cols-7 p-4 border-b-2 border-[#2E2F32]  text-white text-sm font-semibold">
                <div>Product Name</div>
                <div>Preview Logo</div>
                <div>Category</div>
                <div>Brand</div>
                <div>Model Name</div>
                <div>Price</div>
                <div>Actions</div>
              </div>
              <div className="flex flex-col h-screen no-scrollbar overflow-auto">
                {currentItems.length > 0 ? (
                  currentItems.map((product, index) => (
                    <div
                      className="grid grid-cols-7 h-fit items-center border-b border-[#2E2F32] p-4 text-[#CCCCCC] text-sm font-semibold"
                      key={index}
                    >
                      <div className="threelinelimit">{product.title}</div>
                      <div>
                        <img
                          src={product.brandimage}
                          alt=""
                          className="h-[3rem] w-fit"
                        />
                      </div>
                      <div className="">{product.categoryName}</div>
                      <div className="">{product.brand}</div>

                      <div className="">{product.modelNumber}</div>
                      <div className="">{product.price}</div>
                      <div className="flex flex-row items-center font-semibold gap-3">
                        <button
                          className={`${
                            product.active ? "text-[#63B263]" : "text-[#ED9C27]"
                          }`}
                          onClick={() =>
                            toggleActiveState(product.productId, index)
                          }
                        >
                          {product.active ? "Active" : "Deactive"}
                        </button>
                        <button
                          className="text-[#5BC0DE]"
                          onClick={() => handleEdit(product.productId)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            deleteProduct(product.productId, index)
                          }
                          className="text-[#D53F3A]"
                        >
                          {loading[product.productId]
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white p-4">
                    No products available.
                  </div>
                )}
              </div>
              {/* Pagination */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md  text-lg ${
                    currentPage === 1
                      ? "text-gray-400 font-semibold "
                      : "text-white font-bold"
                  }`}
                >
                  Prev
                </button>
                {Array.from(
                  { length: endPage - startPage + 1 },
                  (_, idx) => startPage + idx
                ).map((pageNumber) => (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`${
                      pageNumber === currentPage
                        ? " text-white"
                        : " text-[#CCCCCC]"
                    } px-4 py-2 rounded-md font-bold text-lg`}
                  >
                    {pageNumber}
                  </button>
                ))}
                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md  text-lg ${
                    currentPage === totalPages
                      ? "text-gray-400 font-semibold"
                      : "text-white font-bold"
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminDashboardTemplate>
  );
};

export default ManageProducts;
