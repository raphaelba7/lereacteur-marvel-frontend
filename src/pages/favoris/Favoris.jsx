import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../components/loader/Loader";
import { useParams } from "react-router-dom";
const Favoris = ({ token }) => {
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  const handleDelete = async (elem) => {
    try {
      await axios.delete(`http://localhost:3000/favorisdislike/${elem._id}`);
      const updatedData = data.favoris.filter((item) => item._id !== elem._id);
      setData({ ...data, favoris: updatedData });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCom = async (elem) => {
    try {
      await axios.delete(`http://localhost:3000/favorisdislik/${elem._id}`);
      const updatedData2 = data2.favoris.filter(
        (item) => item._id !== elem._id
      );
      setData2({ ...data2, favoris: updatedData2 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios
          .get(`http://localhost:3000/favoris/char`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData(response.data);
          });
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    const fetchData2 = async () => {
      try {
        const response = await axios
          .get(`http://localhost:3000/favoris/comics`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setData2(response.data);
          });
        setIsLoading(false);
        //console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData2();
  }, [userId, token]);

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
        <main>
          <div>Les favoris</div>
          <div>
            {data.favoris.map((elem) => {
              return (
                <div key={elem.id_api}>
                  <FontAwesomeIcon
                    icon="ban"
                    onClick={() => {
                      handleDelete(elem);
                    }}
                  />
                  <p>{elem.name}</p>
                  <img src={elem.image} alt=""></img>
                </div>
              );
            })}
          </div>
          <div>
            {data2.favoris.map((elem2) => {
              return (
                <div key={elem2.id_api}>
                  <FontAwesomeIcon
                    icon="ban"
                    onClick={() => {
                      handleDeleteCom(elem2);
                    }}
                  />
                  <p>{elem2.title}</p>
                  <img src={elem2.image} alt=""></img>
                </div>
              );
            })}
          </div>
        </main>
      </>
    );
  }
};

export default Favoris;
