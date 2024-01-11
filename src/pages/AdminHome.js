import AdminProductList from "../features/admin/components/AdminProductList";
import Footer from "../features/common/Footer";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function AdminHome() {
  return (
    <>
      <AdminProductList></AdminProductList>
      <Footer></Footer>
    </>
  );
}
export default AdminHome;
