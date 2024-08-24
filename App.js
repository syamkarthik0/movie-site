  import React from 'react';
  import Box from '@mui/material/Box';
  import Header from './components/Header';
  import MovieCategoryBar from './components/Sidebar';
  import MovieGridRedux from "./components/MovieGridRedux.js";
  import './App.css';
  import SearchResults from "./components/SearchResults";
  import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
  import MovieDetails from "./components/MovieDetails";


  function App() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [drawerOpen, setDrawerOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const toggleDrawer = (open) => (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
      setDrawerOpen(open);
    };

    return (
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <Header
            toggleDrawer={toggleDrawer}
            handleOpenUserMenu={handleOpenUserMenu}
            handleCloseUserMenu={handleCloseUserMenu}
            anchorElUser={anchorElUser}
          />
          <MovieCategoryBar
            drawerOpen={drawerOpen}
            toggleDrawer={toggleDrawer}
          />
          
          <Box 
            component="main"
            sx={{
              flexGrow: 1,
              marginLeft: drawerOpen ? '250px' : '0px', // Adjust margin based on drawer state
              marginTop: '64px', // Space for the header
              transition: 'margin-left 0.3s',
              overflow: 'auto',
              backgroundColor: '#000000', // Background color
              color: '#ffffff', // Text color
              width: '100%',
            }}
          >
            <Routes>
              <Route path="/" element={<MovieGridRedux category="home" />} />
              <Route path="/popular" element={<MovieGridRedux category="popular" />} />
              <Route path="/upcoming" element={<MovieGridRedux category="upcoming" />} />
              <Route path="/top-rated" element={<MovieGridRedux category="top_rated" />} />
              <Route path="/now-playing" element={<MovieGridRedux category="now_playing" />} /> 

              <Route path="/genre/action" element={<MovieGridRedux genre="action"/>} />
              <Route path="/genre/adventure" element={<MovieGridRedux genre="adventure"/>}/>
              <Route path="/genre/animation" element={<MovieGridRedux genre="animation"/>}/>
              <Route path="/genre/comedy" element={<MovieGridRedux genre="comedy"/>} />
              <Route path="/genre/crime" eleme  nt={<MovieGridRedux genre="crime"/>} />
              <Route path="/genre/drama" element={<MovieGridRedux genre="drama"/>} />
              <Route path="/genre/horror" element={<MovieGridRedux genre="horror"/>} />
              <Route path="/genre/sci-fi" element={<MovieGridRedux genre="sci_fi"/>} />
              <Route path="/genre/thriller" element={<MovieGridRedux genre="thriller"/>} />
              <Route path="/genre/war" element={<MovieGridRedux genre="war"/>} />
              <Route path="/genre/history" element={<MovieGridRedux genre="history"/>}/>
              <Route path="/genre/fantasy" element={<MovieGridRedux genre="fantasy"/>}/>
              <Route path="/genre/family" element={<MovieGridRedux genre="family"/>}/>
              <Route path="/genre/music" element={<MovieGridRedux genre="music"/>}/>
              <Route path="/genre/romance" element={<MovieGridRedux genre="romance"/>}/>
              <Route path="/movie/:movieId" element={<MovieDetails />} /> {/* New route for movie details */}
              <Route path="/search" element={<SearchResults />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    );
  }

  export default App;
