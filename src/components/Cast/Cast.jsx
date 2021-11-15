import s from "./Cast.module.css";
import { useEffect } from "react";
import {
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router";
import { useState } from "react/cjs/react.development";
import { getMovieCast } from "../../services/api";

const Cast = ({ movieId, location }) => {
  const castLocation = useLocation();
  const newPathname = location?.state.from.pathname;
  if (castLocation.state) {
    castLocation.state.from.label = newPathname;
  } else {
    castLocation.state.from.label = "/";
  }
  const [movieCast, setMovieCast] = useState([]);
  useEffect(() => {
    getMovieCast(movieId).then((cast) => {
      setMovieCast(cast);
    });
  }, []);

  return (
    <>
      <ul>
        {movieCast.map((item) => (
          <li key={item.id}>
            <p>{item.name}</p>
            <img src={`https://image.tmdb.org/t/p/w500${item.profile_path}`} />
            <p>{item.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
