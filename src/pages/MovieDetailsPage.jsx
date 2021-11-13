import { useEffect, useState } from "react";
import { getMovieInfo } from "../services/api";
import {
  useHistory,
  useRouteMatch,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import Cast from "../components/Cast/Cast";
import Reviews from "../components/Reviews/Reviews";

const MovieDetailsPage = () => {
  const {
    params: { movieId },
    url,
  } = useRouteMatch();
  const history = useHistory();
  const { isExact } = useRouteMatch();
  const location = useLocation();
  console.log(location);
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    getMovieInfo(movieId).then((resp) => setMovieInfo(resp));
    return () => {};
  }, []);

  const onGoBack = () => {
    if (!isExact) {
      history.push(location.state.from.label);
      console.log("here");
      return;
    }
    history.push(location.state.from);
  };
  console.log(location.state.from);
  return movieInfo ? (
    <>
      <button type="button" onClick={onGoBack}>
        Go back
      </button>
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
            <span key={item.id}>{item.name} </span>
          ))}
        </li>
      </ul>
      <h2>Addittional information</h2>
      <ul>
        <NavLink
          to={{
            pathname: `${url}/cast`,
            state: { from: location },
          }}
        >
          Casts
        </NavLink>
        <NavLink
          to={{
            pathname: `${url}/reviews`,
            state: {
              from: location,
            },
          }}
        >
          Reviews
        </NavLink>
      </ul>
      <Route path={`/movies/${movieId}/cast`}>
        <Cast movieId={movieId} location={location.state.from} />
      </Route>
      <Route path={`/movies/${movieId}/reviews`}>
        <Reviews movieId={movieId} location={location.state.from} />
      </Route>
    </>
  ) : null;
};

export default MovieDetailsPage;
