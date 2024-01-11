import React from "react";
import Navbar from "../features/navbar/Navbar";
import Footer from "../features/common/Footer";
import ProductList from "../features/product/components/ProductList";

const Shop = () => {
  return (
    <div>
      <ProductList></ProductList>
      <Footer></Footer>
    </div>
  );
};

export default Shop;
