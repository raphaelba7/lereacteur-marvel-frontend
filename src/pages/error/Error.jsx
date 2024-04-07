import "./Error.css";
import wrongpage from "../../assets/img/wrong-page.jpg";
const Error = () => {
  return (
    <main
      className="main-loader"
      style={{ backgroundImage: `url(${wrongpage})` }}
    >
      <h1 className="loader-title">
        Maybe something wrong happen , click on marvel logo to go back on home
        page
      </h1>
    </main>
  );
};

export default Error;
