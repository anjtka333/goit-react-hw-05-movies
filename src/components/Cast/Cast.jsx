import { useEffect } from "react";
import { useState } from "react";
import { getMovieCast } from "../../services/api";

const Cast = ({ movieId }) => {
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
