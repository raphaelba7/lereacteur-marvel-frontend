import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/loader/Loader";
import gifMarvel from "../../assets/img/giphy.gif";
import "./Favoris.css";
const Favoris = ({ token }) => {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = async (elem) => {
    try {
      await axios.delete(
        ` https://site--backend-marvel--ky7tz22vm4g7.code.run/favorisdislike/${elem._id}`
      );
      const updatedData = data.favoris.filter((item) => item._id !== elem._id);
      setData({ ...data, favoris: updatedData });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCom = async (elem) => {
    try {
      await axios.delete(
        ` https://site--backend-marvel--ky7tz22vm4g7.code.run/favorisdislik/${elem._id}`
      );
      const updatedData2 = data2.favoris.filter(
        (item) => item._id !== elem._id
      );
      setData2({ ...data2, favoris: updatedData2 });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const [charactersResponse, comicsResponse] = await Promise.all([
        axios.get(
          `https://site--backend-marvel--ky7tz22vm4g7.code.run/favoris/char`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
        axios.get(
          `https://site--backend-marvel--ky7tz22vm4g7.code.run/favoris/comics`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ),
      ]);
      setData(charactersResponse.data);
      setData2(comicsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

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
    return (
      <>
        <main className="main-favoris">
          <section className="hero-section">
            <div className="box-hero">
              <img src={gifMarvel} alt="Gif marvel" />
              <div className="charac-card">
                <h1>Your favorites</h1>
              </div>
            </div>
          </section>
          <section className="section-favorite">
            <div className="container flex-favorite">
              <div className="flex-title-favorite">
                <h2>Characters : </h2>
              </div>
              <div className="flex-favorite-charac">
                {data.favoris.map((elem) => {
                  return (
                    <div key={elem.id_api} className="card-fav-charac">
                      <FontAwesomeIcon
                        icon="ban"
                        onClick={() => {
                          handleDelete(elem);
                        }}
                        className="icon-fav-remove"
                      />
                      <h3>{elem.name}</h3>
                      <img src={elem.image} alt=""></img>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="red-separate container"></div>
            <div className="container flex-favorite">
              <div className="flex-title-favorite">
                <h2>Comics : </h2>
              </div>
              <div className="flex-favorite-comic">
                {data2.favoris.map((elem2) => {
                  return (
                    <div key={elem2.id_api} className="card-fav-comic">
                      <FontAwesomeIcon
                        icon="ban"
                        onClick={() => {
                          handleDeleteCom(elem2);
                        }}
                        className="icon-fav-remove"
                      />
                      <p>{elem2.title}</p>
                      <img src={elem2.image} alt=""></img>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </>
    );
  }
};

export default Favoris;
