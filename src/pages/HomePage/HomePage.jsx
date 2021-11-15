import { getMovies } from "../../services/api";
import { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch, useLocation } from "react-router-dom";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movieTrendingList, setMovieTrendingList] = useState([]);
  const location = useLocation();
  const getData = () => {
    getMovies()
      .then((data) => {
        setMovieTrendingList(data);
      })
      .catch((err) => console.log("homepage err" + err));
  };

  useEffect(() => {
    getData();
    return () => {};
  }, []);
  return (
    <>
      <h1>Trending tooday</h1>
      <ul className={s.ImageGallery}>
        {movieTrendingList.map((movie) => (
          <li className={s.ImageGalleryItem} key={movie.id}>
            <img
              className={s["ImageGalleryItem-image"]}
              src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
            />
            <Link
              to={{
                pathname: `/movie/${movie.id}`,
                state: { from: location },
              }}
            >
              {movie.title ? movie.title : "not found"}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default HomePage;
