import { getMovies } from "../services/api";
import { useEffect, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

const HomePage = () => {
  const [movieTrendingList, setMovieTrendingList] = useState([]);
  const { url } = useRouteMatch();
  const getData = () => {
    getMovies().then((data) => {
      setMovieTrendingList(data);
    });
  };
  useEffect(() => {
    getData();
    return () => {};
  }, []);
  return (
    <>
      <h1>Trending tooday</h1>
      <ul>
        {movieTrendingList.map((movie) => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`}>
              {movie.title ? movie.title : "no title"}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default HomePage;
