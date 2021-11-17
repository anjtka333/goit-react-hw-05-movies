import { useEffect, useState } from "react";
import { getReviews } from "../../services/api";

const Reviews = ({ movieId }) => {
  const [movieReview, setMovieReview] = useState([]);
  useEffect(() => {
    getReviews(movieId).then((data) => setMovieReview(data));
  }, []);
  return movieReview.length ? (
    <ul>
      {movieReview.map((item) => {
        return (
          <li key={item.id}>
            <p>{item.author}</p>
            <p>{item.content}</p>
          </li>
        );
      })}
    </ul>
  ) : (
    <h1> Sorry no review</h1>
  );
};

export default Reviews;
