import {
  Route,
  Switch,
  useRouteMatch,
  withRouter,
  Link,
  NavLink,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";
import MoviesPage from "./pages/MoviesPage";
function App() {
  return (
    <div className="App">
      <nav>
        <NavLink exact to="/">
          Home
        </NavLink>
        <NavLink to="/movies"> Movies </NavLink>
      </nav>
      <Switch>
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />
        <Route path="/" exact component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
