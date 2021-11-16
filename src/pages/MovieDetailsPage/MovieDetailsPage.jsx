import s from "./MovieDetails.module.css";
import { useEffect, useState } from "react";
import { getMovieInfo } from "../../services/api";
import {
  useHistory,
  useRouteMatch,
  Route,
  NavLink,
  useLocation,
  Switch,
  Redirect,
} from "react-router-dom";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import NotFound from "../NotFound/NotFound";

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
    getMovieInfo(movieId)
      .then((resp) => setMovieInfo(resp))
      .catch((err) => history.push("/404"));
    return () => {};
  }, []);

  const onGoBack = () => {
    history.push(location.state?.from);
  };

  return movieInfo ? (
    <>
      <button className={s.Button} type="button" onClick={onGoBack}>
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
          className={s.Button}
          activeClassName={s.ButtonActive}
          to={{
            pathname: `${url}/cast`,
            state: { ...location.state }, //{from: {…}}
          }}
        >
          <li> Casts</li>
        </NavLink>
        <NavLink
          className={s.Button}
          activeClassName={s.ButtonActive}
          to={{
            pathname: `${url}/reviews`,
            state: { ...location.state },
          }}
        >
          <li> Reviews</li>
        </NavLink>
      </ul>
      <Switch>
        <Route path={`/movie/${movieId}/cast`}>
          <Cast movieId={movieId} />
        </Route>
        <Route path={`/movie/${movieId}/reviews`}>
          <Reviews movieId={movieId} />
        </Route>
        {/* <Redirect to="/" /> */}
      </Switch>
    </>
  ) : null;
};

export default MovieDetailsPage;
