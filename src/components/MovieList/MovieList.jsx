import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
import defaulfImg from "../../img/defaulfImg.png";
const MovieList = ({ results }) => {
  const location = useLocation();
  return (
    <ul className={s.ImageGallery}>
      {results.map((movie) => (
        <li className={s.ImageGalleryItem} key={movie.id}>
          <img
            className={s["ImageGalleryItem-image"]}
            src={
              movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                : defaulfImg
            }
          />
          <Link
            to={{
              pathname: `/movie/${movie.id}`,
              state: { from: location },
            }}
          >
            {movie.title ? movie.title : "not found"}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
