import React, {useState} from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Box, Typography, InputBase, AppBar, Toolbar } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Header = ({setCoordinates}) => {
  const [autocomplete, setAutocomplete] = useState(null)
  const onLoad= (autoC)=>{
    setAutocomplete(autoC)
  }
  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat()
    const lng = autocomplete.getPlace().geometry.location.lng()
    setCoordinates({lat, lng})
  }
  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ display: { md:"block", lg: "block", sm: "none", xs:"none" } }}>
          Jayden Travel Helper
        </Typography>
        <Box display="flex" alignItems="center" gap="1rem">
          <Typography variant="h6">Start your traveling</Typography>
          <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <Box
              sx={{
                postion: "relative",
                borderRadius: "0.75rem",
                backgroundColor: "blue",
                "&:hover": { backgroundColor: "bluewhite", cursor:"pointer" },
                marginRight: "2rem",
                marginLeft: { lg: 0, sm: "1rem" },
                width: { lg: "100%", sm: "auto" },
                display:"flex",
                alignItems:'center'
              }}
            >
              <div
                style={{
                  p: "0, 1rem",
                  height: "100%",
                  postion: "absolute",
                  pointerEvents: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
              
                }}
              >
                <SearchIcon></SearchIcon>
              </div>
              <InputBase
                placeholder="Search..."
                sx={{
                  color: "inherit",
                  padding: "1, 1, 1, 0",
                  width: { md: "20ch", sm: "100%" },
                }}
              ></InputBase>
            </Box>
          </Autocomplete>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
