import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
//api.themoviedb.org/3/movie/550?api_key=e84de41571d692c43346b27dff51241a
https: axios.defaults.baseURL = "https://api.themoviedb.org/";

const setParams = (params) =>
  (axios.defaults.params = { key: API_KEY, ...params });

export const getMovies = () => {
  setParams({});

  return (
    axios
      // .get(`everything`)
      .get(`3/trending/movie/day`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        throw err;
      })
  );
};
