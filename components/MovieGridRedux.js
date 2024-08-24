import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategory,fetchGenre, fetchMovieDetails } from "../redux/movieActions"; 
import "./MovieGrid.css";
import { useNavigate } from "react-router-dom"; // For navigation

// import {
//   fetchMovies,
//   addMovie,
//   removeMovie,
//   updateMovie,
//   clearMovies,
//   fetchmovies,
// } from "../redux/movieActions";


const MovieGridRedux = ({category,genre}) => {
  const dispatch = useDispatch();
  const categoryMovies = useSelector((state) => state.movies[category] || []);
  const genreMovies = useSelector((state) => state.movies[genre] || []);
  const movies = [...categoryMovies, ...genreMovies];
  const navigate = useNavigate();


  useEffect(() => {
    if (category) {
      dispatch(fetchCategory(category));
    }
  }, [dispatch, category]);
  
  useEffect(() => {
    if (genre) {
      dispatch(fetchGenre(genre));
    }
  }, [dispatch, genre]);

  const handleMovieClick = (movieId) => {
    // Dispatch action to fetch movie details
    dispatch(fetchMovieDetails(movieId));

    // Navigate to the movie details page
    navigate(`/movie/${movieId}`);
  };

  // const [newMovieTitle, setNewMovieTitle] = useState("");
  // const [newMovieDate, setNewMovieDate] = useState("");
  // const [newMoviePoster, setNewMoviePoster] = useState("");
  // const [newMovieRating, setNewMovieRating] = useState(0);


  // const handleAddMovie = () => {
  //   const newMovie = {
  //     id: new Date().getTime(), // Unique ID for testing
  //     title: newMovieTitle || "New Movie",
  //     release_date: newMovieDate || "2024-01-01",
  //     poster_path: newMoviePoster || "/path_to_new_movie_poster.jpg",
  //     vote_average: newMovieRating, // Rating for the movie
  //   };
  //   dispatch(addMovie(newMovie));
  // };

  // const handleRemoveMovie = (movieId) => {
  //   dispatch(removeMovie(movieId));
  // };

  // const handleUpdateMovie = (movieId) => {
  //   const updatedMovie = {
  //     id: movieId,
  //     title: newMovieTitle || "Updated Movie Title",
  //     release_date: newMovieDate || "2025-01-01",
  //     poster_path: newMoviePoster || "/path_to_updated_movie_poster.jpg",
  //     vote_average: newMovieRating, // Updated rating
  //   };
  //   dispatch(updateMovie(updatedMovie));
  // };

  // const handleClearMovies = () => {
  //   dispatch(clearMovies());
  // };

  // const handleFetchMovies = async () => {
  //   dispatch(fetchMovies());
  // };

  const getRatingColor = (rating) => {
    if (rating >= 70) return "green";
    if (rating >= 40) return "orange";
    return "red";
  };


  return (
     <div className="movie-container">
       {/* Control buttons 
      <div className="button-group">
           <button onClick={handleAddMovie}>Add Movie</button>
           <button onClick={() => handleRemoveMovie(movies[0]?.id)}>
             Remove First Movie
           </button>
           <button onClick={() => handleUpdateMovie(movies[0]?.id)}>
             Update First Mov ie
           </button>
           <button onClick={handleClearMovies}>Clear Movies</button>
           <button onClick={handleFetchMovies}>Fetch Movies</button> 
         </div>  */} 

      {/* Movie grid */}
      <div className="movie-grid">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card" onClick={() => handleMovieClick(movie.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />

            <div className="rating-container">
              <svg className="rating-circle" viewBox="0 0 36 36">
                <path
                  className="circle-bg"
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{ strokeWidth: 3 }}
                />
                <path
                  className="circle"
                  strokeDasharray={`${Math.round(
                    movie.vote_average * 10
                  )}, 100`}
                  d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                  style={{
                    stroke: getRatingColor(Math.round(movie.vote_average * 10)),
                    strokeWidth: 3,
                  }}
                />
                <text
                  x="18"
                  y="20.35"
                  className="percentage"
                  style={{
                    fill: getRatingColor(Math.round(movie.vote_average * 10)),
                  }}
                >
                  {Math.round(movie.vote_average * 10)}%
                </text>
              </svg>
            </div>

            <h3>{movie.title}</h3>
            <p>{movie.release_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGridRedux;