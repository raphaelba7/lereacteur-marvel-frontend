import fbBadge from "../../assets/img/fb-social-media.svg";
import linkedBadge from "../../assets/img/linked-social-media.svg";
import instaBadge from "../../assets/img/insta-social-media.svg";
import Mfooter from "../../assets/img/marvel-favincon.png";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <footer>
        <div className="container footer-div">
          <div className="footer-img">
            <img src={Mfooter} alt="" />
          </div>
          <div className="footer-text">
            <p>
              Made at <a href="https://www.lereacteur.io/">Le Reacteur</a> by{" "}
              <a href="https://github.com/raphaelba7?tab=repositories">
                Raphaël Basset
              </a>
            </p>
          </div>
          <div className="footer-social-media">
            <ul>
              <li>
                <img src={fbBadge} alt="badge facebook" />
              </li>
              <li>
                <img src={linkedBadge} alt="badge LinkedIn" />
              </li>
              <li>
                <img src={instaBadge} alt="badge instagram" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
