import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;
//api.themoviedb.org/3/movie/550?api_key=e84de41571d692c43346b27dff51241a
https: axios.defaults.baseURL = "https://api.themoviedb.org/3";

const setParams = (params = {}) =>
  (axios.defaults.params = { api_key: API_KEY, ...params });

export const getMovies = () => {
  setParams();

  return axios
    .get(`/trending/movie/day`)
    .then(({ data }) => {
      const moviesTitle = data.results.map((item) => {
        return {
          title: item.title,
          id: item.id,
          backdrop_path: item.backdrop_path,
        };
      });
      return moviesTitle;
    })
    .catch((err) => {
      throw err;
    });
};

export const getMovieInfo = (movieId) => {
  setParams();
  return axios
    .get(`movie/${movieId}`)
    .then(
      ({
        data: {
          title,
          release_date,
          vote_average,
          overview,
          genres,
          backdrop_path,
        },
      }) => {
        const moviesDetail = {
          title,
          release_date,
          vote_average,
          overview,
          genres,
          backdrop_path,
        };
        return moviesDetail;
      }
    )
    .catch((err) => {
      console.log("Eroor" + err);

      throw err;
    });
};

export const getMovieCast = (movieId) => {
  setParams();
  return axios
    .get(`/movie/${movieId}/credits`)
    .then(({ data: { cast } }) => {
      return cast;
    })
    .catch((err) => {
      throw err;
    });
};

export const getReviews = (movieId) => {
  setParams();
  return axios
    .get(`/movie/${movieId}/reviews`)
    .then(({ data: { results } }) => {
      console.log(results);
      return results;
    })
    .catch((err) => {
      throw err;
    });
};

export const searchMovies = (query) => {
  setParams();
  return axios
    .get(
      `/search/movie?&language=en-US&page=1&include_adult=false&query=?${query}`
    )
    .then(({ data: { results } }) => {
      return results;
    })
    .catch((err) => {
      throw err;
    });
};
