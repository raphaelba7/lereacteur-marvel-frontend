import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import hero from "../../assets/img/hero2.jpg";
import "./Comic.css";
import { useParams } from "react-router-dom";
const Comic = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://site--backend-marvel--ky7tz22vm4g7.code.run/comic/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);
  //console.log(data);

  if (isLoading === true) {
    return (
      <Loader
        visible={true}
        height="80"
        width="80"
        color="red"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
      />
    );
  } else {
    let pathImgChar = data.thumbnail.path;
    let extensionChar = data.thumbnail.extension;

    return (
      <main className="main-comic">
        <section className="hero-section">
          <div className="box-hero">
            <img src={hero} alt="Hero comics bd" />
            <div className="charac-card">
              <div>
                <img
                  src={pathImgChar + "/portrait_xlarge." + extensionChar}
                  alt={data.title}
                />
              </div>
              <h1>{data.title}</h1>
            </div>
          </div>
        </section>
        <section className="background-title-filter">
          <div className="container">
            <div className="title-page-search">
              <p>{data.description}</p>
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default Comic;
