import axios from "axios";

const API_KEY = "9fe79b52ede4aea7fd21916437ada5c8";
const API_BASE_URL = "https://api.themoviedb.org/3";


export const searchMovies = (query) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query: query,
        page: 1,
      },
    });

    dispatch({
      type: "SET_SEARCH_RESULTS",
      payload: response.data.results,
    });
  } catch (error) {
    console.error("Error searching movies:", error);
  }
};


export const fetchCategory = (category) => async (dispatch) => {
  try {
    let endpoint;
    switch (category) {
      case "upcoming":
        endpoint = "/movie/upcoming";
        break;
      case "now_playing":
        endpoint = "/movie/now_playing";
        break;
      case "top_rated":
        endpoint = "/movie/top_rated";
        break;
      case "popular":
      default:
        endpoint = "/movie/popular";
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    dispatch({
      type: "SET_MOVIES",
      payload: { category, movies: response.data.results },
    });
  } catch (error) {
    console.error(`Error fetching ${category} movies:`, error);
  }
};


export const fetchGenre = (genre) => async (dispatch) => {
  try {
    let endpoint;
    switch (genre) {
      case "action":
        endpoint = "/discover/movie?with_genres=28";
        break;
      case "adventure":
        endpoint = "/discover/movie?with_genres=12";
        break;
        case "animation":
          endpoint = "/discover/movie?with_genres=16";
          break;
        case "drama":
          endpoint = "/discover/movie?with_genres=18";
          break;
          case "crime":
            endpoint="/discover/movie?with_genres=80";
            break;
        case "horror":
          endpoint = "/discover/movie?with_genres=27";
          break;
        case "sci_fi":
          endpoint = "/discover/movie?with_genres=878";
          break;
        case "thriller":
          endpoint = "/discover/movie?with_genres=53";
          break;
        case "war":
          endpoint = "/discover/movie?with_genres=10752";
          break;
      case "comedy":
        endpoint = "/discover/movie?with_genres=35";
        break;
        case "history":
        endpoint = "/discover/movie?with_genres=36";
        break;
      case "fantasy":
        endpoint = "/discover/movie?with_genres=14";
        break;
      case "family":
        endpoint = "/discover/movie?with_genres=10751";
        break;
      case "music":
        endpoint = "/discover/movie?with_genres=10402";
        break;
      case "romance":
      default:
        endpoint = "/discover/movie?with_genres=10749";
    }

    const response = await axios.get(`${API_BASE_URL}${endpoint}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    dispatch({
      type: "SET_MOVIES",
      payload: { genre, movies: response.data.results },
    });
  } catch (error) {
    console.error(`Error fetching ${genre} movies:`, error);
  }
};

export const fetchMovieDetails = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    dispatch({
      type: "SET_MOVIE_DETAILS",
      payload: response.data,
    });
  } catch (error) {
    console.error("Error fetching movie details:", error);
  }
};

export const fetchMovieTrailers = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/videos`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    return response.data.results.find(video => video.type === "Trailer");
  } catch (error) {
    console.error("Error fetching movie trailers:", error);
  }
};

export const fetchMovieCast = (movieId) => async (dispatch) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/movie/${movieId}/credits`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
      },
    });

    dispatch({
      type: "SET_MOVIE_CAST",
      payload: response.data.cast,
    });
  } catch (error) {
    console.error("Error fetching movie cast:", error);
  }
};
// Existing fetchMovies action remains unchanged

// export const addMovie = (movie) => {
//     return {
//       type: "ADD_MOVIE",
//       payload: movie,
//     };
//   };
  
//   export const removeMovie = (movieId) => {
//     return {
//       type: "REMOVE_MOVIE",
//       payload: movieId,
//     };
//   };
  
//   export const updateMovie = (movie) => {
//     return {
//       type: "UPDATE_MOVIE",
//       payload: movie,
//     };
//   };
  
//   export const clearMovies = () => {
//     return {
//       type: "CLEAR_MOVIES",
//     };
//   };

//   export const fetchmovies = () => {
//     return {
//       type:"FETCH_MOVIES"
//     };
//   };
