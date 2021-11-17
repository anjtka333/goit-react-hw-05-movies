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
import { lazy } from "react";

const Cast = lazy(() =>
  import("../../components/Cast/Cast" /* webpackChunkName: "Cast" */)
);
const Reviews = lazy(() =>
  import("../../components/Reviews/Reviews" /* webpackChunkName: "Reviews" */)
);

const MovieDetailsPage = () => {
  const {
    params: { movieId },
    url,
  } = useRouteMatch();
  const history = useHistory();
  const { isExact } = useRouteMatch();
  const location = useLocation();
  const [movieInfo, setMovieInfo] = useState(null);

  useEffect(() => {
    getMovieInfo(movieId)
      .then((resp) => setMovieInfo(resp))
      .catch((err) => history.push("/404"));
    return () => {};
  }, []);

  const onGoBack = () => {
    history.push(location.state?.from || "/");
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
            src={
              movieInfo.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movieInfo.backdrop_path}`
                : `../img/default_img.png`
            }
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
            // state: { ...location.state }, //{from: {…}}
            state: { from: location.state?.from }, //{from: {…}}
          }}
        >
          Casts
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
        {!isExact && <Redirect to="/" />}
      </Switch>
    </>
  ) : null;
};

export default MovieDetailsPage;
