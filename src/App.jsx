import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";

//import components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

//import page
import Home from "./pages/home/Home";
import Comics from "./pages/comics/Comics";
import Character from "./pages/character/Character";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import Favoris from "./pages/favoris/Favoris";
import Comic from "./pages/comic/Comic";

//import fontAwsome
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faHeart,
  faBan,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import Error from "./pages/error/Error";
library.add(faHeart, faBan, faMagnifyingGlass);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("true");
  const [token, setToken] = useState(Cookies.get("userToken") || "");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Router>
        <Header
          setCurrentPage={setCurrentPage}
          setLimit={setLimit}
          setSearch={setSearch}
          setSort={setSort}
          token={token}
          setToken={setToken}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                setLimit={setLimit}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                token={token}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            }
          />
          <Route
            path="/comics"
            element={
              <Comics
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                limit={limit}
                setLimit={setLimit}
                search={search}
                setSearch={setSearch}
                sort={sort}
                setSort={setSort}
                token={token}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            }
          />
          <Route path="/comic/:id" element={<Comic />} />
          <Route
            path="/signup/"
            element={<Signup token={token} setToken={setToken} />}
          />
          <Route
            path="/login/"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route path="/favoris/" element={<Favoris token={token} />} />
          <Route path="/character/:id" element={<Character />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
