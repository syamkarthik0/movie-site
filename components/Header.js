import React, { useState, useRef, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { searchMovies } from "../redux/movieActions";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { List, ListItem, ListItemText } from "@mui/material";

const settings = ["Profile", "Account", "Dashboard", "Logout"];

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000", // Royal Black color
    },
  },
});

function ResponsiveAppBar({ toggleDrawer }) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [suggestions, setSuggestions] = useState([]); // Suggestions state

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use navigate for routing

  // Refs for search input and suggestions list
  const searchRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Close suggestion box when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target)
      ) {
        setSuggestions([]);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

 

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };


  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      dispatch(searchMovies(searchQuery));
      navigate("/search");
      setSuggestions([]);
    }
  };

  const fetchSuggestions = async (query) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=9fe79b52ede4aea7fd21916437ada5c8&query=${query}`
      );
      setSuggestions(response.data.results.slice(0, 5));
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSuggestions([]);
    dispatch(searchMovies(suggestion.title));
    navigate("/search");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>

              <Typography
                variant="h6"
                noWrap
                component="a"
                href="#"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                RulzBird Cinema
              </Typography>

              {/* Search Field */}
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  position: "relative", // For placing suggestions below
                  zIndex: 1, // Ensure the search bar is above the movie grid
                }}
              >
                <form onSubmit={handleSearch} style={{ width: "100%", maxWidth: "600px" }}>
                  <TextField
                    ref={searchRef}
                    variant="outlined"
                    placeholder="Search…"
                    value={searchQuery}
                    onChange={handleInputChange}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                      borderRadius: 1,
                      height: "56px", // Increased height of the search bar
                    }}
                  />
                </form>

                {/* Search Suggestions */}
                {suggestions.length > 0 && (
                  <List
                    ref={suggestionsRef}
                    sx={{
                      position: "absolute",
                      top: "60px", // Adjust based on search bar height
                      width: "60%",
                      bgcolor: "aquamarine",
                      borderRadius: "10px",
                      zIndex: 1, // Ensure suggestions are above the movie grid
                      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Subtle shadow for depth
                      border: "1px solid #ddd", // Light border for definition
                    }}
                  >
                    {suggestions.map((suggestion) => (
                      <ListItem
                        key={suggestion.id}
                        button
                        onClick={() => handleSuggestionClick(suggestion)}
                        sx={{
                          bgcolor: "background.paper", // Background color matches search box
                          color: "black", // Font color for suggestions
                          '&:hover': {
                            backgroundColor: "#e0f7fa", // Light background on hover
                          },
                        }}
                      >
                        <ListItemText primary={suggestion.title} />
                      </ListItem>
                    ))}
                  </List>
                )}
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;
