// src/components/SearchResults.js
import React from "react";
import { useSelector } from "react-redux";
import "./MovieGrid.css";

const SearchResults = () => {
  const searchResults = useSelector((state) => state.movies.searchResults);

  const getRatingColor = (rating) => {
    if (rating >= 70) return "green";
    if (rating >= 40) return "orange";
    return "red";
  };

  return (
    <div className="movie-grid">
      {searchResults.length > 0 ? (
        searchResults.map((movie) => (
          <div key={movie.id} className="movie-card">
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
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResults;
