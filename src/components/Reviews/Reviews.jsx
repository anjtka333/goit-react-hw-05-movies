import s from "./Reviews.module.css";
import { useEffect } from "react";
import { useLocation } from "react-router";
import { useState } from "react/cjs/react.development";
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
