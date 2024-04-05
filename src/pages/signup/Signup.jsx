import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
import background from "../../assets/img/marvel-full.jpg";

const Signup = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const { data } = await axios.post(` http://localhost:3000/user/signup`, {
        username: username,
        email: email,
        password: password,
      });

      Cookies.set("userToken", data.token, { expires: 15 });
      setToken(data.token);
      console.log("Bien inscrit !!!!");
      navigate("/");
    } catch (error) {
      console.log(error.response);
      if (error.response.status === 409) {
        setErrorMessage(
          "This email already has an account, please use another one"
        );
      } else if (error.response.data.message === "Missing parameters") {
        setErrorMessage("Please fill in all the fields");
      }
    }
  };
  return (
    <>
      <main className="main-signup">
        <div
          className="signup-main-div"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="container-signup">
            <img
              className="spiderman"
              src="https://i.ibb.co/XDFkXMx/spiderman-colgado.png"
              alt="Spider-man animated"
            />
            <div className="shadow"></div>
          </div>
          <div className="signup-div">
            <h1 className="title-form">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
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
                S'inscrire
              </button>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
