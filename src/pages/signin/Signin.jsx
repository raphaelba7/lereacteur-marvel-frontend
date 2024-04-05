import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = ({ token, setToken }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setErrorMessage("");

      const { data } = await axios.post(` http://localhost:3000/user/signin`, {
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
      <main>
        <h1>Signin form</h1>
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
          <button className="form-button" type="submit" onClick={handleSubmit}>
            S'inscrire
          </button>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </main>
    </>
  );
};

export default Signin;
