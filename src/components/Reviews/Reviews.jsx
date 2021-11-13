import { useEffect } from "react";
import { useLocation } from "react-router";
import { useState } from "react/cjs/react.development";
import { getReviews } from "../../services/api";

const Reviews = ({ movieId, location }) => {
  const revievLocation = useLocation();
  revievLocation.state.from.label = location.state.from.pathname;
  const [movieReview, setMovieReview] = useState([]);
  useEffect(() => {
    getReviews(movieId).then((data) => setMovieReview(data));
  }, []);
  return (
    <ul>
      Review
      {movieReview.map((item) => {
        return (
          <li>
            <p>{item.author}</p>
            <p>{item.content}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
