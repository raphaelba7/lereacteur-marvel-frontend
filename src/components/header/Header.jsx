import "./Header.css";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/img/logo-marvel.svg";
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
        <div className="navBar-header">
          <div>
            <Link to="/" onClick={handleReset}>
              Characters
            </Link>
            <Link to="/comics" onClick={handleReset}>
              Comics
            </Link>
          </div>
          <div>
            <img src={logo} alt="logo-marvel" />
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
                <Link to="/signin" onClick={handleReset}>
                  Sign in
                </Link>
              </>
            )}
          </div>
          <div>
            <Link to="/favoris" onClick={handleReset}>
              Favoris
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
