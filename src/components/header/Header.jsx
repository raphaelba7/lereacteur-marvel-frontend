import "./Header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/img/logo-marvel.svg";
import deadpool from "../../assets/img/deadpool-chill.png";
const Header = ({
  setCurrentPage,
  setLimit,
  setSearch,
  setSort,
  setToken,
  token,
}) => {
  const handleReset = () => {
    setCurrentPage(1);
    setLimit(100);
    setSearch("");
    setSort("true");
  };
  const handleLogOut = () => {
    Cookies.remove("userToken");
    setToken();
  };
  return (
    <>
      <header>
        <div className="navBar-header container">
          <div>
            <Link to="/" onClick={handleReset}>
              Characters
            </Link>
            <Link to="/comics" onClick={handleReset}>
              Comics
            </Link>
          </div>
          <div className="div-logo-marvel">
            <img src={logo} alt="logo-marvel" className="logo-marvel" />
          </div>
          <div>
            {token ? (
              <button name="Se deconnecter" onClick={handleLogOut}>
                Se Déconnecter
              </button>
            ) : (
              <>
                <Link to="/login" onClick={handleReset}>
                  Login
                </Link>
                <Link to="/signup" onClick={handleReset}>
                  Signup
                </Link>
              </>
            )}
          </div>
          <div>
            <Link to="/favoris" onClick={handleReset}>
              Favoris
            </Link>
          </div>
          <div className="dead-pool-nav">
            <img
              className="deadpool-chill"
              src={deadpool}
              alt="deadpool chill"
            />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
