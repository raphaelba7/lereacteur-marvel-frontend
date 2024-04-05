import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
      <main>
        <h2>Login</h2>
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
          <button className="form-button" type="submit" onClick={handleSubmit}>
            Se connecter
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </main>
    </>
  );
};

export default Login;
