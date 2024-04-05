import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Character = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(` http://localhost:3000/comics/${id}`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  console.log(data);
  if (isLoading === true) {
    return (
      <>
        <h2>En chargement....</h2>
      </>
    );
  } else {
    let pathImgChar = data.thumbnail.path;
    let extensionChar = data.thumbnail.extension;

    return (
      <main>
        <section>
          <div>Le character</div>
          <input type="search" />
          <div>
            <h2>{data.name}</h2>
            <div>{data.description}</div>
            <div>
              <img
                src={pathImgChar + "/portrait_xlarge." + extensionChar}
                alt=""
              />
            </div>
          </div>
          <div>
            {data.comics.map((elem) => {
              let pathImg = elem.thumbnail.path;
              let extension = elem.thumbnail.extension;
              //   console.log(pathImg + "/portrait_small." + extension);
              return (
                <div key={elem.title}>
                  <span>{elem.title}</span>
                  <span>{elem.description}</span>
                  <img src={pathImg + "/portrait_xlarge." + extension} alt="" />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    );
  }
};

export default Character;
