import { Portfolio } from "./components/github-portfolio.jsx";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Repositories from "./components/Repositories.jsx";
import Errorpage from "./components/ErrorPage.jsx";

export default function App() {
  return (
    <main className="container">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/Repositories" element={<Repositories />} />
          <Route path="*" element={<Errorpage />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
