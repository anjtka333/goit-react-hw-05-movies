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
            <img
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                  : `../img/default_img.png`
              }
            />
            <p>{item.character}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Cast;
