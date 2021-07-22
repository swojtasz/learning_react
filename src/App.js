import { Redirect, Route } from "react-router-dom";
import MainHeader from "./components/MainHeader";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Welcome from "./pages/Welcome";

function App() {
  return (
    <div>
      <MainHeader />
      <main>
        <Route path="/" exact>
          <Redirect to="/welcome" />
        </Route>
        <Route path="/welcome">
          <Welcome />
        </Route>
        <Route path="/products" exact>
          <Products />
        </Route>
        <Route path="/products/:productId">
          <ProductDetail />
        </Route>
      </main>
    </div>
  );
}

export default App;
