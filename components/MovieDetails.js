import React, { useEffect, useState } from 'react';
import { fetchMovieDetails, fetchMovieTrailers, fetchMovieCast } from '../redux/movieActions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './MovieDetails.css'; // Import the CSS file

const MovieDetails = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movies.movieDetails);
  const [trailer, setTrailer] = useState(null);
  const movieCast = useSelector((state) => state.movies.movieCast);

  useEffect(() => {
    if (movieId) {
      dispatch(fetchMovieDetails(movieId));
      dispatch(fetchMovieTrailers(movieId)).then((trailer) => setTrailer(trailer));
      dispatch(fetchMovieCast(movieId));
    }
  }, [dispatch, movieId]);

  if (!movieDetails) return <div>Loading...</div>;

  return (
    <div className="movie-details">
      <img src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`} alt={movieDetails.title} />
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.overview}</p>
      <div className="movie-trailer">
        {trailer ? (
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ) : (
          <p>No trailer available</p>
        )}
      </div>
      
      <h1 className="cast-title">Cast</h1>
      <div className="movie-cast">
        {movieCast && movieCast.map((cast) => (
          <div key={cast.cast_id} className="cast-member">
            <img src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`} alt={cast.name} />
            <p>{cast.name}</p>
            <p>{cast.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
