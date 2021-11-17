import "./Shared_styles.css";
import { lazy, Suspense } from "react";
import { Route, Switch, NavLink, Redirect } from "react-router-dom";
import s from "./App.module.css";

const HomePage = lazy(() =>
  import("./pages/HomePage/HomePage" /* webpackChunkName: "HomePage" */)
);
const MovieDetailsPage = lazy(() =>
  import(
    "./pages/MovieDetailsPage/MovieDetailsPage" /* webpackChunkName: "MovieDetailsPage" */
  )
);
const MoviesPage = lazy(() =>
  import("./pages/MoviesPage/MoviesPage" /* webpackChunkName: "MoviesPage" */)
);
const NotFound = lazy(() =>
  import("./pages/NotFound/NotFound" /* webpackChunkName: "NotFound" */)
);
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
          <Redirect to="/" />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
