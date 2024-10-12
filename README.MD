# Wingz Driver App

## Overview

Wingz Driver App is a simplified ride-sharing driver mobile application built using React Native and Redux. This app allows drivers to view nearby ride requests and accept or decline them.

## Core Features

1. **Home Screen**
   - Displays a map with the driver's current location
   - Shows nearby ride requests as markers on the map
   - Fetches ride requests from a mock API or generates dummy requests locally

2. **Ride Request Details Screen**
   - Allows drivers to select a ride request from the map
   - Displays details of the selected ride request (pickup location, user information)

3. **Redux Implementation**
   - Manages driver location, nearby ride requests, and ride request status
   - Implements actions, reducers, and selectors for state management

4. **Functionality**
   - Enables drivers to accept or decline ride requests
   - Updates ride request status in the Redux store

5. **UI/UX**
   - Utilizes appropriate UI components for a user-friendly experience
   - Ensures smooth transitions between screens and intuitive interactions

6. **Error Handling**
   - Gracefully handles edge cases (e.g., no nearby requests, data fetching errors)
   - Provides appropriate error messages and fallback mechanisms

## Getting Started

1. Clone the repository
2. Install dependencies: `yarn install`
3. Run the app: `yarn start`

## Technologies Used

- React Native
- Redux (with Redux Toolkit)
- React Navigation
- React Native Maps

## Project Structure

- `screens/`: Contains main screen components
- `components/`: Reusable UI components
- `slices/`: Redux slices for state management
- `store.js`: Redux store configuration
- `App.js`: Main application component

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
