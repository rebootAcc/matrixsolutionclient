import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import LoginPage from "./pages/adminpanel/LoginPage";
import AdminHome from "./pages/adminpanel/AdminHome";
import AddCategory from "./pages/adminpanel/product/AddCategory";
import ManageCategory from "./pages/adminpanel/product/ManageCategory";
import AddBrand from "./pages/adminpanel/product/AddBrand";
import ManageBrand from "./pages/adminpanel/product/ManageBrand";
import AddNewProduct from "./pages/adminpanel/product/AddNewProduct";
import ManageProducts from "./pages/adminpanel/product/ManageProducts";
import EditProduct from "./pages/adminpanel/product/EditProduct";

import ProductDetails from "./pages/ProductDetails";
import ProductPageDesignComponent from "./component/pagedesign/ProductPageDesignComponent";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import BrandsPage from "./pages/BrandsPage";
import ShippingAndDelivery from "./pages/ShippingAndDelivery";
import CancelationAndRefund from "./pages/CancelationAndRefund";
import PaymentMethods from "./pages/PaymentMethods";
import BrandSupport from "./pages/BrandSupport";
import BankDetails from "./pages/BankDetails";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />

        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/brands" element={<BrandsPage />} />
        <Route
          path="/products/:category"
          element={<ProductPageDesignComponent />}
        />
        <Route
          path="/products/brand/:brand"
          element={<ProductPageDesignComponent />}
        />
        <Route
          path="/products/:category/:subcategory"
          element={<ProductPageDesignComponent />}
        />
        <Route
          path="/products/:category/:subcategory/:subsubcategory"
          element={<ProductPageDesignComponent />}
        />
        <Route
          path="/products/:category/:subcategory/:subsubcategory/:level3category"
          element={<ProductPageDesignComponent />}
        />
        <Route
          path="/products/:category/:subcategory/:subsubcategory/:level3category/:level4category"
          element={<ProductPageDesignComponent />}
        />

        {/* adminpanel */}
        <Route path="/reboots" element={<LoginPage />} />
        <Route path="/reboots/admin-dashboard-home" element={<AdminHome />} />
        <Route
          path="/reboots/product/admin-dashboard-add-category"
          element={<AddCategory />}
        />
        <Route
          path="/reboots/product/admin-dashboard-manage-category"
          element={<ManageCategory />}
        />
        <Route
          path="/reboots/product/admin-dashboard-add-brand"
          element={<AddBrand />}
        />
        <Route
          path="/reboots/product/admin-dashboard-manage-brand"
          element={<ManageBrand />}
        />
        <Route
          path="/reboots/product/admin-dashboard-add-new-product"
          element={<AddNewProduct />}
        />
        <Route
          path="/reboots/product/admin-dashboard-manage-product"
          element={<ManageProducts />}
        />
        <Route
          path="/reboots/product/admin-dashboard-edit-product/:productId"
          element={<EditProduct />}
        />
        <Route path="/shipping-&-delivery" element={<ShippingAndDelivery />} />
        <Route
          path="/cancelation-&-refund"
          element={<CancelationAndRefund />}
        />
        <Route path="/payment-methods" element={<PaymentMethods />} />
        <Route path="/brand-support" element={<BrandSupport />} />
        <Route path="/bank-details" element={<BankDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
