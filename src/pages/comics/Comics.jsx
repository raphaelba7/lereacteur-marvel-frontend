import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Loader from "../../components/loader/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Comics = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  search,
  setSearch,
  sort,
  setSort,
  token,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const maxPage = Math.ceil(data.count / limit);
  useEffect(() => {
    const fetchData = async () => {
      let skip = 0;
      if (sort === "false") {
        if (currentPage !== 1) {
          skip = limit * (maxPage - currentPage);
        } else if (currentPage === maxPage) {
          skip = limit * (maxPage - 1);
        } else {
          skip = limit * (maxPage - 2) + (data.count % limit);
        }
        try {
          const response = await axios.get(
            `http://localhost:3000/comics?skip=${skip}&limit=${limit}&title=${search}`
          );

          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      } else {
        if (currentPage !== 1) {
          skip = limit * (currentPage - 1);
        }
        try {
          const response = await axios.get(
            ` http://localhost:3000/comics?skip=${skip}&limit=${limit}&title=${search}`
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchData();
  }, [currentPage, search, limit, sort, maxPage, data]);
  //console.log(data);

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    //console.log(currentPage);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    //console.log(currentPage);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearch(value);
  };
  const handleSort = (event) => {
    const value = event.target.value;
    setSort(value);
    setCurrentPage(1);
    //console.log(sort);
  };
  const handleLimit = (event) => {
    const value = event.target.value;
    setLimit(value);
    console.log(limit);
  };
  const handleComicFav = async (comics) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/favoris/comics`,
        {
          title: comics.title,
          id_api: comics._id,
          image:
            comics.thumbnail.path +
            "/portrait_xlarge." +
            comics.thumbnail.extension,
          description: comics.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

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
    const sortData = [...data.results];
    const reverseSortData = sortData.reverse();
    return (
      <main>
        <section>
          <div>Les comics</div>
          <input type="search" onChange={handleSearchChange} />
          <label htmlFor="limit-select">afficher :</label>
          <select
            name="limit"
            id="limit-select"
            defaultValue="choisissez le nombre à afficher"
            onChange={handleLimit}
          >
            <option value="100">100</option>
            <option value="50">50</option>
            <option value="30">30</option>
            <option value="20">20</option>
            <option value="10">10</option>
          </select>
          <div>
            <label htmlFor="sort-select">Trier :</label>
            <select name="sort" id="sort-select" onChange={handleSort}>
              <option value="true">A-Z</option>
              <option value="false">Z-A</option>
            </select>
          </div>
          <div>
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <p>...</p>
            <p>{currentPage - 1}</p>
            <p style={{ fontWeight: "bold" }}>{currentPage}</p>
            <p>{currentPage + 1}</p>
            <p>...</p>
            <button onClick={handleNextPage} disabled={currentPage === maxPage}>
              Suivant
            </button>
          </div>
          <div className="div-grid-base">
            {sort === "true"
              ? data.results.map((comics) => {
                  let pathImg = comics.thumbnail.path;
                  let extension = comics.thumbnail.extension;
                  let totalPath = pathImg + "/portrait_xlarge." + extension;
                  return (
                    <div key={comics._id}>
                      <FontAwesomeIcon
                        icon="heart"
                        onClick={() => {
                          handleComicFav(comics);
                          console.log(comics);
                        }}
                      />
                      <Card
                        name={comics.title}
                        description={comics.description}
                        pathImg={totalPath}
                      />
                    </div>
                  );
                })
              : reverseSortData.map((comics) => {
                  let pathImg = comics.thumbnail.path;
                  let extension = comics.thumbnail.extension;
                  let totalPath = pathImg + "/portrait_xlarge." + extension;
                  return (
                    <div key={comics._id}>
                      <Card
                        name={comics.title}
                        description={comics.description}
                        pathImg={totalPath}
                      />
                    </div>
                  );
                })}
          </div>
        </section>
      </main>
    );
  }
};

export default Comics;
