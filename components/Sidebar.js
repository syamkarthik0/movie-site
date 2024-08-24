  import React from 'react';
  import Box from '@mui/material/Box';
  import Drawer from '@mui/material/Drawer';
  import List from '@mui/material/List';
  import ListItem from '@mui/material/ListItem';
  import ListItemIcon from '@mui/material/ListItemIcon';
  import ListItemText from '@mui/material/ListItemText';
  import Divider from '@mui/material/Divider';
  import WhatshotIcon from '@mui/icons-material/Whatshot';
  import NewReleasesIcon from '@mui/icons-material/NewReleases';
  import StarIcon from '@mui/icons-material/Star';
  import MovieFilterIcon from '@mui/icons-material/MovieFilter';
  import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
  import ExploreIcon from '@mui/icons-material/Explore';
  import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
  import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
  import BugReportIcon from '@mui/icons-material/BugReport';
  import ScienceIcon from '@mui/icons-material/Science';
  import FavoriteIcon from '@mui/icons-material/Favorite';
  import { createTheme, ThemeProvider } from '@mui/material/styles';
  import { useNavigate } from 'react-router-dom';
  import logo from './BlueBird.png'; // Adjust the path as needed

  const categories = [
    { name: 'Popular', icon: <WhatshotIcon />, path: '/popular' },
    { name: 'Upcoming', icon: <NewReleasesIcon />, path: '/upcoming' },
    { name: 'Top-Rated', icon: <StarIcon />, path: '/top-rated' },
    { name: 'Now-Playing', icon: <MovieFilterIcon />, path: '/now-playing' },
  ];

  const genres = [
    { name: 'Action', icon: <EmojiEventsIcon />, path: '/genre/action' },
    { name: 'Adventure', icon: <ExploreIcon />, path: '/genre/adventure' },
    { name: 'Comedy', icon: <SentimentVerySatisfiedIcon />, path: '/genre/comedy' },
    { name: 'Crime', icon: <BugReportIcon />, path: '/genre/crime' },
    { name: 'Drama', icon: <TheaterComedyIcon />, path: '/genre/drama' },
    { name: 'Horror', icon: <BugReportIcon />, path: '/genre/horror' },
    { name: 'Sci-Fi', icon: <ScienceIcon />, path: '/genre/sci-fi' },
    { name: 'Thriller', icon: <EmojiEventsIcon />, path: '/genre/thriller' },
    { name: 'War', icon: <FavoriteIcon />, path: '/genre/war' },
    { name: 'History', icon: <FavoriteIcon />, path: '/genre/history' },
    { name: 'Fantasy', icon: <ExploreIcon />, path: '/genre/fantasy' },
    { name: 'Family', icon: <SentimentVerySatisfiedIcon />, path: '/genre/family' },
    { name: 'Music', icon: <EmojiEventsIcon />, path: '/genre/music' },
    { name: 'Romance', icon: <FavoriteIcon />, path: '/genre/romance' },
  ];
  

  const theme = createTheme({
    palette: {
      primary: {
        main: '#000000', // Royal Black
      },
      text: {
        primary: '#ffffff', // White
      },
    },
  });

  const MovieCategoryBar = ({ drawerOpen, toggleDrawer }) => {
    const navigate = useNavigate();

    const list = () => (
      <Box
      className="custom-scrollbar" // Apply the custom scrollbar class
        sx={{ width: 250, bgcolor: 'primary.main', color: 'text.primary', height: '100%', overflow: 'auto', // Hide scrollbar
        }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <List>
        
        

          {/* Logo */}
          <ListItem >
            <img src={logo} alt="logo" className="w-24" style={{ width: 96, height: 'auto' }} />
            <ListItemText
              primary="RulzBird Cinema"
              sx={{ textAlign: 'center', ml: 2, color: 'text.primary' }}
            />
          </ListItem>

          <Divider sx={{ bgcolor: 'text.primary' }} />

          {/* Home Link */}
      {/* <ListItem 
            button 
            sx={{ justifyContent: 'center', fontWeight: 'bold' }}
            onClick={() => navigate('/')}
          >
            <ListItemText primary="HOME" 
            sx={{ textAlign: 'center', width: '100%' }}
            />
          </ListItem>
          
          <Divider sx={{ bgcolor: 'text.primary' }} /> */}
          
          {/* CATEGORIES */}
          <ListItem>
            <ListItemText
              primary="CATEGORIES"
              sx={{ textAlign: 'center', width: '100%' }}
            />
          </ListItem>
          {categories.map((category) => (
            <ListItem
              button
              key={category.name}
              sx={{ justifyContent: 'center' }}
              onClick={() => navigate(category.path)}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>{category.icon}</ListItemIcon>
              <ListItemText primary={category.name} />
            </ListItem>
          ))}
        </List>
        
        <Divider sx={{ bgcolor: 'text.primary' }} />
        
        <List>
          {/* GENRES */}
          <ListItem>
            <ListItemText
              primary="GENRES"
              sx={{ textAlign: 'center', width: '100%' }}
            />
          </ListItem>
          {genres.map((genre) => (
            <ListItem
              button
              key={genre.name}
              sx={{ justifyContent: 'center' }}
              onClick={() => navigate(genre.path)}
            >
              <ListItemIcon sx={{ color: 'text.primary' }}>{genre.icon}</ListItemIcon>
              <ListItemText primary={genre.name} />
            </ListItem>
          ))}
        </List>
      </Box>
    );

    return (
      <ThemeProvider theme={theme}>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </ThemeProvider>
    );
  };

  export default MovieCategoryBar;
