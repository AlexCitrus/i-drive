# IRide Driver App

## Overview

IRide Driver App is a simplified ride-sharing driver mobile application built using React Native and Redux. This app allows drivers to view nearby ride requests and accept or decline them.

## Core Features

1. **Home Screen**

   - Displays a map with the driver's current location
   - Shows nearby ride requests as markers on the map
   - Fetches ride requests from a mock API or generates dummy requests locally

2. **Ride Request Details Screen**

   - Allows drivers to select a ride request from the map
   - Displays details of the selected ride request (pickup location, destination, user information)

3. **Redux Implementation**

   - Manages driver location, nearby ride requests, and selected ride
   - Implements actions, reducers, and selectors for state management

4. **Functionality**

   - Enables drivers to view and select ride requests
   - Updates selected ride in the Redux store

5. **UI/UX**

   - Utilizes appropriate UI components for a user-friendly experience
   - Ensures smooth transitions between screens and intuitive interactions

6. **Location Services**

   - Uses device GPS to track driver's current location
   - Updates map view based on driver's movement

7. **Map Integration**
   - Implements Google Maps API for map rendering and directions
   - Displays route from driver's location to pickup point and destination

## Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Maps API key: `GOOGLE_MAPS_API_KEY=your_api_key_here`
   - Note: The API key will be sent through Gmail using the email pasoquinalexander@gmail.com
4. Run the app: `yarn start`
5. Choose your preferred method to run the app:
   - For iOS simulator: Press `i` in the terminal
   - For Android simulator: Press `a` in the terminal
   - For running on an actual device:
     - Download the Expo Go app on your device
     - Scan the QR code displayed in the terminal

## Technologies Used

- React Native
- Redux (with Redux Toolkit)
- React Navigation
- React Native Maps
- Google Maps API

## Project Structure

- `screens/`: Contains main screen components
- `components/`: Reusable UI components
- `slices/`: Redux slices for state management
- `contexts/`: React Context providers (e.g., LocationContext)
- `store.js`: Redux store configuration
- `App.js`: Main application component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
