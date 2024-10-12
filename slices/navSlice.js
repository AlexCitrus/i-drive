import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  nearbyRides: [],
  ride: null
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload;
    },
    setRide: (state, action) => {
      state.ride = action.payload;
    },
    setNearbyRides: (state, action) => {
      state.nearbyRides = action.payload;
    }
  }
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setRide,
  setNearbyRides
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectRide = (state) => state.nav.ride;
export const selectNearbyRides = (state) => state.nav.nearbyRides;

export default navSlice.reducer;
