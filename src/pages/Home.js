import { Link } from "react-router-dom";
import Navbar from "../features/navbar/Navbar";
import ProductList from "../features/product/components/ProductList";
import Footer from "../features/common/Footer";
import Homesubpage from "../subpages/Homesubpage";
import Homesubproduct from "../subpages/Homesubproduct";

function Home() {
  return (
    <div className="relative">
      <main clas>
        <Homesubpage></Homesubpage>
        <Homesubproduct></Homesubproduct>
      </main>
      <Footer></Footer>
    </div>
  );
}
export default Home;
