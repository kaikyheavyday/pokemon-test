import { Routes, Route, Link } from "react-router-dom";
import LayoutPage from "./components/LayoutPage";
import Home from "./modules/home/Home";
import PokemonDetail from "./modules/detail/Detail";
import Checkout from "./modules/checkout/Checkout";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route index element={<Home />} />
          <Route path="/pokemon/:id" element={<PokemonDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}

function NoMatch() {
  return (
    <div>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  );
}
