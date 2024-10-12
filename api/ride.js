// Mock API function to fetch nearby ride requests
export const fetchNearbyRideRequests = async (latitude, longitude) => {
  // Simulating API call with dummy data
  return [
    {
      id: "1",
      userId: "user1",
      userName: "John Doe",
      driverId: null,
      pickupLocation: {
        latitude: latitude + 0.01,
        longitude: longitude + 0.01
      },
      destination: { latitude: latitude + 0.02, longitude: longitude + 0.02 },
      status: "pending",
      pickupTime: new Date(Date.now() + 1000 * 60 * 15), // 15 minutes from now
      timestamp: new Date()
    },
    {
      id: "2",
      userId: "user2",
      userName: "Jane Smith",
      driverId: null,
      pickupLocation: {
        latitude: latitude - 0.01,
        longitude: longitude - 0.01
      },
      destination: { latitude: latitude - 0.02, longitude: longitude - 0.02 },
      status: "pending",
      pickupTime: new Date(Date.now() + 1000 * 60 * 20), // 20 minutes from now
      timestamp: new Date()
    },
    {
      id: "3",
      userId: "user3",
      userName: "Bob Johnson",
      driverId: null,
      pickupLocation: {
        latitude: latitude + 0.02,
        longitude: longitude - 0.02
      },
      destination: { latitude: latitude + 0.03, longitude: longitude - 0.03 },
      status: "pending",
      pickupTime: new Date(Date.now() + 1000 * 60 * 25), // 25 minutes from now
      timestamp: new Date()
    }
  ];
};

// Mock API function to update ride status
export const updateRideStatus = async (rideId, newStatus) => {
  // Simulating API call to update ride status
  // In a real application, this would make an API request to update the status in the backend
  console.log(`Updating ride ${rideId} status to ${newStatus}`);

  // Return a mock updated ride object
  return {
    id: rideId,
    userId: "user1",
    userName: "John Doe",
    driverId: "driver1",
    pickupLocation: {
      latitude: 0,
      longitude: 0
    },
    destination: { latitude: 0.01, longitude: 0.01 },
    status: newStatus,
    pickupTime: new Date(),
    timestamp: new Date()
  };
};
