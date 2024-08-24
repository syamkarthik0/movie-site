  const initialState = {
    popular: [],
    Upcoming: [],
    top_rated: [],
    now_playing: [],
    searchResults: [],
    action: [],
    adventure: [],
    comedy: [],
    crime: [],
    drama: [],
    horror: [],
    sci_fi: [],
    thriller: [],
    war: [],
    history: [],
    fantasy: [],
    family: [],
    music: [],
    romance: [],
    movieDetails: null, // New state for movie details
    };
    
    const movieReducer = (state = initialState, action) => {
      switch (action.type) {
        case "SET_MOVIES":
          // Check if the payload contains a genre or category
          const key = action.payload.genre || action.payload.category;
          return {
            ...state,
            [key]: action.payload.movies,
          };
        
          case "SET_SEARCH_RESULTS":
            return {
              ...state,
              searchResults: action.payload,
            };

            case "SET_MOVIE_DETAILS":
              return {
                ...state,
                movieDetails: action.payload, // Store movie details in state
              };

              case "SET_MOVIE_CAST":
                return {
                  ...state,
                  movieCast: action.payload, // Add movie cast to state
                };
        // case "ADD_MOVIE":
        //   return {
        //     ...state,
        //     movies: [...state.movies, action.payload],
        //   };
    
        // case "REMOVE_MOVIE":
        //   return {
        //     ...state,
        //     movies: state.movies.filter((movie) => movie.id !== action.payload),
        //   };
    
        // case "UPDATE_MOVIE":
        //   return {
        //     ...state,
        //     movies: state.movies.map((movie) =>
        //       movie.id === action.payload.id
        //         ? { ...movie, ...action.payload }
        //         : movie
        //     ),
        //   };
    
        // case "CLEAR_MOVIES":
        //   return {
        //     ...state,
        //     movies: [],
        //   };

        // case "FETCH_MOVIES":
        //   return{
        //     ...state,
        //     movies: action.payload,
        //   };
    
        default:
          return state;
      }
    };
    
    export default movieReducer;