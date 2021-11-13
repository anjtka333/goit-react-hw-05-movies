import { Link, useLocation, useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { searchMovies } from "../services/api";

const MoviePage = () => {
  const [searchQ, setSearchQ] = useState("");
  const [results, setResults] = useState([]);
  const location = useLocation();
  const history = useHistory();

  const search = (e) => {
    setSearchQ(e.target.value);
  };
  console.log("history " + history);
  useEffect(() => {
    if (searchQ) searchMovies(searchQ.trim()).then((res) => setResults(res));
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQ) searchMovies(searchQ.trim()).then((res) => setResults(res));
    setSearchQ("");
    history.push(`?query=${searchQ}`);
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
          <li key={item.id}>
            <Link
              to={{
                pathname: `movies/${item.id}`,
                state: { from: location },
              }}
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MoviePage;
