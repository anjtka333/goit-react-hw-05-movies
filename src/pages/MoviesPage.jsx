import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import { searchMovies } from "../services/api";

const MoviePage = () => {
  const [searchQ, setSearchQ] = useState("");
  const [results, setResults] = useState([]);

  const search = (e) => {
    setSearchQ(e.target.value);
  };
  console.log(searchQ);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQ) searchMovies(searchQ.trim()).then((res) => setResults(res));
    setSearchQ("");
  };

  return (
    <>
      <header>
        <form onSubmit={handleSubmit}>
          <button type="submit">
            <span>Search</span>
          </button>
          <input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQ}
            onChange={search}
          />
        </form>
      </header>
      <ul>
        {results.map((item) => (
          <Link to={`movies/${item.id}`}>
            <li>{item.title}</li>
          </Link>
        ))}
      </ul>
    </>
  );
};

export default MoviePage;
