import AdminProductDetail from "../features/admin/components/AdminProductDetail";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";

function AdminProductDetailPage() {
  return (
    <>
      <Navbar>
        <AdminProductDetail></AdminProductDetail>
      </Navbar>
    </>
  );
}
export default AdminProductDetailPage;
