import {
  useLocation,
  useHistory,
  Route,
  useRouteMatch,
  Switch,
  Redirect,
} from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { searchMovies } from "../../services/api";
import queryString from "query-string";
import s from "./MoviesPage.module.css";
import NotFound from "../NotFound/NotFound";
import MovieList from "../../components/MovieList/MovieList";

const MoviePage = () => {
  const [searchQ, setSearchQ] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();
  const history = useHistory();
  const { url } = useRouteMatch();
  console.log(url);
  const queryParams = queryString.parse(location.search);
  const search = (e) => {
    setSearchQ(e.target.value);
  };

  useEffect(() => {
    if (queryParams.query)
      searchMovies(queryParams.query)
        .then((res) => setResults(res))
        .finally((queryParams.query = ""));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQ)
      searchMovies(searchQ.trim()).then((res) => {
        if (res.length === 0) history.push(`/movies/404`);
        return setResults(res);
      });
    setSearchQ("");
    history.push(`/movies?query=${searchQ}`);
  };

  return (
    <>
      <header className={s.Searchbar} onSubmit={handleSubmit}>
        <form className={s.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s["SearchForm-button-label"]}>Search</span>
          </button>
          <input
            className={s["SearchForm-input"]}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search movies"
            value={searchQ}
            onChange={search}
          />
        </form>
      </header>
      <Switch>
        <Route path={`/movies/404`} exact>
          <NotFound />
        </Route>
        <Route path={`/movies`} exact>
          <MovieList results={results} />
        </Route>
        <Redirect to="/" />
      </Switch>
    </>
  );
};

export default MoviePage;
