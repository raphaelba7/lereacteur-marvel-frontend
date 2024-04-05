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
import Signin from "./pages/signin/Signin";
import Login from "./pages/login/Login";
import Favoris from "./pages/favoris/Favoris";

//import fontAwsome
import { library } from "@fortawesome/fontawesome-svg-core";
import { faHeart, faBan } from "@fortawesome/free-solid-svg-icons";
library.add(faHeart, faBan);

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(100);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("true");
  const [token, setToken] = useState(Cookies.get("userToken") || "");

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
              />
            }
          />
          <Route
            path="/signin/"
            element={<Signin token={token} setToken={setToken} />}
          />
          <Route
            path="/login/"
            element={<Login token={token} setToken={setToken} />}
          />
          <Route path="/favoris/" element={<Favoris token={token} />} />
          <Route path="/character/:id" element={<Character />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
