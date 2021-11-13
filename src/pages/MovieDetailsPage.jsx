import { useEffect, useState } from "react";
import { getMovieInfo } from "../services/api";
import { useHistory, useRouteMatch, Route, NavLink } from "react-router-dom";
import Cast from "../components/Cast/Cast";
import Reviews from "../components/Reviews/Reviews";

const MovieDetailsPage = () => {
  const {
    params: { movieId },
    url,
  } = useRouteMatch();
  const histiry = useHistory();
  const data = useRouteMatch();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    histiry.push(movieId);
    console.log(movieId);
    getMovieInfo(movieId).then((resp) => setMovieInfo(resp));
    return () => {};
  }, []);

  return movieInfo ? (
    <>
      <ul>
        <li>{movieInfo.title}</li>
        <li>{movieInfo.release_date}</li>
        <li>
          <img
            src={`https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`}
          />
        </li>
        <li>{movieInfo.vote_average}</li>
        <li>{movieInfo.overview}</li>
        <li>
          {movieInfo.genres?.map((item) => (
            <span>{item.name} </span>
          ))}
        </li>
      </ul>
      <h2>Addittional information</h2>
      <ul>
        <NavLink to={`/movies/${movieId}/cast`}> Casts </NavLink>
        <NavLink to={`${url}/reviews`}>Reviews</NavLink>
      </ul>
      <Route path={`/movies/${movieId}/cast`}>
        <Cast movieId={movieId} />
      </Route>
      <Route path={`/movies/${movieId}/reviews`}>
        <Reviews movieId={movieId} />
      </Route>
    </>
  ) : null;
};

export default MovieDetailsPage;
