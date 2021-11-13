import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { getReviews } from "../../services/api";

const Reviews = ({ movieId }) => {
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
