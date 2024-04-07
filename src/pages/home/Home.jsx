import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Home.css";
import Loader from "../../components/loader/Loader";
import hero from "../../assets/img/deadpool-marvel.jpg";

const Home = ({
  currentPage,
  setCurrentPage,
  limit,
  setLimit,
  search,
  setSearch,
  sort,
  setSort,
  token,
  isOpen,
  setIsOpen,
}) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const maxPage = Math.ceil(data.count / limit);

  const pageNumbers = [];

  for (let i = 1; i <= maxPage; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchData = async () => {
      let skip = 0;
      if (sort === "false") {
        if (currentPage !== 1) {
          skip = limit * (maxPage - currentPage);
        } else {
          skip = limit * (maxPage - 1);
        }

        try {
          const response = await axios.get(
            ` https://site--backend-marvel--ky7tz22vm4g7.code.run/characters?skip=${skip}&limit=${limit}&name=${search}`
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
            ` https://site--backend-marvel--ky7tz22vm4g7.code.run/characters?skip=${skip}&limit=${limit}&name=${search}`
          );
          setData(response.data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
    };
    // console.log(data);

    fetchData();
  }, [currentPage, search, limit, sort, maxPage]);

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
    //console.log(limit);
  };
  const handleCharacFav = async (characters) => {
    try {
      const response = await axios.post(
        `https://site--backend-marvel--ky7tz22vm4g7.code.run/favoris/char`,
        {
          name: characters.name,
          id_api: characters._id,
          image:
            characters.thumbnail.path +
            "/portrait_xlarge." +
            characters.thumbnail.extension,
          description: characters.description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsOpen(true);
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
        <section className="hero-section">
          <div className="box-hero">
            <img src={hero} alt="Hero deadpool bd" />
            <div className="hero-text">
              <h1>MARVEL CHARACTERS</h1>
              <span>
                Come find the mythical heroes and villains gathered over the
                years in the different Marvel comics
              </span>
            </div>
          </div>
        </section>
        <section className="background-title-filter">
          <div className="container">
            <div className="title-page-search">
              <h2>The characters</h2>
              <div className="search-bar">
                <FontAwesomeIcon
                  icon="magnifying-glass"
                  className="icon-glass"
                />
                <input
                  type="search-input"
                  onChange={handleSearchChange}
                  placeholder="Deadpool"
                  className="search-input"
                />
              </div>
            </div>
            <div className="character-filter">
              <div className="result-filter">
                <p>Result : {data.count}</p>
              </div>
              <div className="limit-order-filter">
                <div>
                  <label htmlFor="limit-select">Display : </label>
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
                </div>
                <div>
                  <label htmlFor="sort-select">Order by : </label>
                  <select name="sort" id="sort-select" onChange={handleSort}>
                    <option value="true">A-Z</option>
                    <option value="false">Z-A</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container">
          <div className="div-grid-base">
            {sort === "true"
              ? data.results.map((characters) => {
                  let pathImg = characters.thumbnail.path;
                  let extension = characters.thumbnail.extension;
                  let totalPath = pathImg + "/portrait_xlarge." + extension;
                  return (
                    <div key={characters._id} className="card-grid">
                      {token ? (
                        <FontAwesomeIcon
                          icon="heart"
                          onClick={() => {
                            handleCharacFav(characters);
                            console.log(characters);
                          }}
                          className="icon-fav"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="heart"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                          className="icon-fav"
                        />
                      )}

                      <div>
                        <Card
                          name={characters.name}
                          description={characters.description}
                          pathImg={totalPath}
                          characters={characters._id}
                        />
                      </div>
                    </div>
                  );
                })
              : reverseSortData.map((characters) => {
                  let pathImg = characters.thumbnail.path;
                  let extension = characters.thumbnail.extension;
                  let totalPath = pathImg + "/portrait_xlarge." + extension;
                  return (
                    <div key={characters._id} className="card-grid">
                      {token ? (
                        <FontAwesomeIcon
                          icon="heart"
                          onClick={() => {
                            handleCharacFav(characters);
                            //console.log(characters);
                          }}
                          className="icon-fav"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon="heart"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                          className="icon-fav"
                        />
                      )}
                      <div>
                        <Card
                          name={characters.name}
                          description={characters.description}
                          pathImg={totalPath}
                          characters={characters._id}
                        />
                      </div>
                    </div>
                  );
                })}
          </div>
          <div className="home-page">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>
              Précédent
            </button>
            <ul>
              {currentPage - 3 > 0 && (
                <li
                  onClick={() => {
                    setCurrentPage(1);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  ...
                </li>
              )}
              {pageNumbers.map((number) => {
                if (number <= currentPage + 2 && number >= currentPage - 2) {
                  if (number === currentPage) {
                    return (
                      <li
                        key={number + "p"}
                        onClick={() => {
                          setCurrentPage(number);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="current-page"
                      >
                        {number}
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={number + "p"}
                        onClick={() => {
                          setCurrentPage(number);
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                      >
                        {number}
                      </li>
                    );
                  }
                } else {
                  return <></>;
                }
              })}
              {currentPage + 2 < maxPage && (
                <li
                  onClick={() => {
                    setCurrentPage(maxPage);
                    window.scrollTo({
                      top: 0,
                      behavior: "smooth",
                    });
                  }}
                >
                  ...
                </li>
              )}
            </ul>
            <button onClick={handleNextPage} disabled={currentPage === maxPage}>
              Suivant
            </button>
          </div>
          {isOpen && (
            <div className="pop-up">
              {token ? (
                <>
                  <div>Hero add to your favorites.</div>
                  <button onClick={() => setIsOpen(false)}>Close Pop-up</button>
                </>
              ) : (
                <>
                  <div>You need to be login to add favories.</div>
                  <button onClick={() => setIsOpen(false)}>Close Pop-up</button>
                </>
              )}
            </div>
          )}
        </section>
      </main>
    );
  }
};

export default Home;
