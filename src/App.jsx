import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import HomePage from "./HomePage";
import Details from "./Details";
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<HomePage />} />
          <Route path="/pokedex" element={<HomePage />} />
          <Route path="/details/:pokemon" element={<Details />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("No container to render to!");
}
const root = createRoot(container);
root.render(<App />);
