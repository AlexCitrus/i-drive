// Generate a unique driver ID
export const DRIVER_ID = "550e8400-e29b-41d4-a716-446655440000";

// Other constants can be added here as needed
export const MAX_PICKUP_DISTANCE = 10; // in kilometers
export const RIDE_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  DECLINED: "declined",
  STARTED: "started",
  PICKED_UP: "picked-up",
  DROPPED_OFF: "dropped-off"
};

export const RIDE_STATUS_TO_SHOW = [
  RIDE_STATUS.PENDING,
  RIDE_STATUS.ACCEPTED,
  RIDE_STATUS.STARTED,
  RIDE_STATUS.PICKED_UP
];
