import "./Shared_styles.css";
import { lazy, Suspense } from "react";
import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  Link,
  NavLink,
  Redirect,
} from "react-router-dom";
// import HomePage from "./pages/HomePage/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import NotFound from "./pages/NotFound/NotFound";
import s from "./App.module.css";

// const MovieDetailsPage = lazy(() =>
//   import("./pages/MovieDetailsPage/MovieDetailsPage")
// );

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
function App() {
  return (
    <div className={s.App}>
      <nav>
        <NavLink
          className={s.Button}
          activeClassName={s.ButtonActive}
          exact
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={s.Button}
          activeClassName={s.ButtonActive}
        >
          Movies
        </NavLink>
      </nav>
      <Suspense fallback={<h1>Is loading...</h1>}>
        <Switch>
          <Route path="/movie/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route path="/movies" component={MoviesPage} />
          <Route path="/404">
            <NotFound />
          </Route>
          <Route path="/" exact>
            <HomePage />
          </Route>

          {/* <Route path="/">
            <NotFound />
          </Route> */}
          {/* <Redirect to="/" /> */}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
