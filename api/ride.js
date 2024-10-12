import { RIDE_STATUS } from "../util/constants";
import { DRIVER_ID } from "../util/constants";

// Initialize mock ride data
const createMockRideData = (latitude, longitude) => [
  {
    id: "1",
    userId: "550e8400-e29b-41d4-a716-446655440000",
    userName: "John Doe",
    driverId: null,
    pickupLocation: {
      latitude: latitude + 0.001,
      longitude: longitude + 0.02
    },
    destination: { latitude: latitude + 0.02, longitude: longitude + 0.02 },
    status: RIDE_STATUS.PENDING,
    timestamp: new Date()
  },
  {
    id: "2",
    userId: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
    userName: "Jane Smith",
    driverId: null,
    pickupLocation: {
      latitude: latitude - 0.01,
      longitude: longitude - 0.01
    },
    destination: { latitude: latitude - 0.02, longitude: longitude - 0.02 },
    status: RIDE_STATUS.PENDING,
    timestamp: new Date()
  },
  {
    id: "3",
    userId: "6ba7b811-9dad-11d1-80b4-00c04fd430c8",
    userName: "Bob Johnson",
    driverId: null,
    pickupLocation: {
      latitude: latitude + 0.02,
      longitude: longitude - 0.02
    },
    destination: { latitude: latitude + 0.03, longitude: longitude - 0.03 },
    status: RIDE_STATUS.PENDING,
    timestamp: new Date()
  }
];

let mockRideData = [];

// Mock API function to fetch nearby ride requests
export const fetchNearbyRideRequests = async (latitude, longitude) => {
  mockRideData = createMockRideData(latitude, longitude);
  return mockRideData;
};

// Mock API function to accept a ride
export const acceptRide = async (rideId) => {
  mockRideData = mockRideData.map((ride) =>
    ride.id === rideId
      ? {
          ...ride,
          driverId: DRIVER_ID,
          status: RIDE_STATUS.ACCEPTED
        }
      : ride
  );
  return mockRideData;
};

// Mock API function to start a ride
export const startRide = async (rideId) => {
  mockRideData = mockRideData.map((ride) =>
    ride.id === rideId
      ? {
          ...ride,
          status: RIDE_STATUS.STARTED
        }
      : ride
  );

  return mockRideData;
};

// Mock API function to decline a ride
export const declineRide = async (rideId) => {
  mockRideData = mockRideData.map((ride) =>
    ride.id === rideId ? { ...ride, status: RIDE_STATUS.DECLINED } : ride
  );
  return mockRideData;
};

// Mock API function to drop off a ride
export const dropOffRide = async (rideId) => {
  mockRideData = mockRideData.map((ride) =>
    ride.id === rideId
      ? {
          ...ride,
          status: RIDE_STATUS.DROPPED_OFF
        }
      : ride
  );
  return mockRideData;
};
