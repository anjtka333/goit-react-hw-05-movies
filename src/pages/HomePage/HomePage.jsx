import { getMovies } from "../../services/api";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

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
      <MovieList results={movieTrendingList} />
    </>
  );
};
export default HomePage;
