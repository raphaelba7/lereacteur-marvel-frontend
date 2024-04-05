import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../../assets/img/marvel-full.jpg";
import "./Login.css";

const Login = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(` http://localhost:3000/user/login`, {
        email: email,
        password: password,
      });
      Cookies.set("userToken", data.token, { expires: 15 });
      setToken(data.token);
      console.log("Bien connecter !!!!");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <main className="main-login">
        <div
          className="signup-main-div"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="login-div">
            <h1 className="title-form">Login</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder="johndoe@mail.com"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="mot de passe"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              <button
                className="form-button"
                type="submit"
                onClick={handleSubmit}
              >
                Se connecter
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
