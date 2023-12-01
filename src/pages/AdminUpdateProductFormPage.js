import ProductForm from "../features/admin/components/ProductForm";
import UpdateProductForm from "../features/admin/components/UpdateProductForm";
import Navbar from "../features/navbar/Navbar";

function AdminUpdateProductFormPage() {
  return (
    <>
      <Navbar>
        <UpdateProductForm></UpdateProductForm>
      </Navbar>
    </>
  );
}
export default AdminUpdateProductFormPage;
