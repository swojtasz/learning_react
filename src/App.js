import { Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
        <Route path="/product-details/:productId">
          <ProductDetail />
        </Route>
      </main>
    </div>
  );
}

export default App;
