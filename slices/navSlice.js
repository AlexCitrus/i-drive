import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
  nearbyRides: [],
  ride: null,
  completedRides: []
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
    },
    addCompletedRide: (state, action) => {
      state.completedRides.push(action.payload);
    }
  }
});

export const {
  setOrigin,
  setDestination,
  setTravelTimeInformation,
  setRide,
  setNearbyRides,
  addCompletedRide
} = navSlice.actions;

// Selectors
export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTravelTimeInformation = (state) =>
  state.nav.travelTimeInformation;
export const selectRide = (state) => state.nav.ride;
export const selectNearbyRides = (state) => state.nav.nearbyRides;
export const selectCompletedRides = (state) => state.nav.completedRides;

export default navSlice.reducer;
