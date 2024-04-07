import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import marvelHero from "../../assets/img/marvel-comics.jpg";
import "./Character.css";

const Character = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://site--backend-marvel--ky7tz22vm4g7.code.run/comics/${id}`
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
      <main>
        <section className="hero-section">
          <div className="box-hero">
            <img src={marvelHero} alt="Hero comics bd" />
            <div className="charac-card">
              <div>
                <img
                  src={pathImgChar + "/portrait_xlarge." + extensionChar}
                  alt=""
                />
              </div>
              <h1>{data.name}</h1>
              <span>{data.description}</span>
            </div>
          </div>
        </section>
        <section className="bg-black">
          <div className="container charac-comics-title">
            <h2>The Comics where you can see him :</h2>
          </div>
        </section>
        <section className="container section-comics-charac">
          <div className="comics-charac">
            <div className="comics-grid">
              {data.comics.map((elem) => {
                let pathImg = elem.thumbnail.path;
                let extension = elem.thumbnail.extension;
                //   console.log(pathImg + "/portrait_small." + extension);
                return (
                  <>
                    <div className="comics-card">
                      <h2>{elem.title}</h2>
                      <p>{elem.description}</p>
                      <img
                        src={pathImg + "/portrait_xlarge." + extension}
                        alt=""
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    );
  }
};

export default Character;
