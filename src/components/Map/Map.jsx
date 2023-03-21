import React from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@mui/material";
import { LocationOnOutlined } from "@mui/icons-material";
import Rating from "@mui/material/Rating";

const Map = ({ coordinates, setCoordinates, setBounds, places, setChildClicked }) => {
  const isDeskTop = useMediaQuery("(min-width:600px)");
  return (
    <div style={{ height: "85vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY}}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        marigin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => (
          <div
            style={{
              position: "absolute",
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              "&:hover": { zIndex: 2 },
            }}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            key={i}
          >
            {!isDeskTop ? (
              <LocationOnOutlined
                color="primary"
                fontSize="large"
              ></LocationOnOutlined>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  padding: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  width: "100px",
                }}
              
              >
                <Typography variant="subtitle2" gutterBottom>
                  {place.name}
                </Typography>
                <img
                  style={{ cursor: "pointer" }}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fchicago.eater.com%2Fmaps%2Fbest-places-eat-drink-gold-coast&psig=AOvVaw13MPOagZnKhcER0XiEEijU&ust=1679469965492000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCLiZ0Ke_7P0CFQAAAAAdAAAAABAE"
                  }
                  alt={place.name}
                ></img>
                <Rating
                  size="small"
                  value={Number(place.rating)}
                  ReadOnly
                ></Rating>
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
