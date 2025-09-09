// Tracking URL utilities for different courier services

// Simple function to create a fulfillment tracking URL for Sendit
export const getSenditTrackingUrl = (trackingNumber: string): string => {
  return `https://app.sendit.ma/deliveries/${trackingNumber}`;
};

// Simple function to create a fulfillment tracking URL for Speedaf
export const getSpeedafTrackingUrl = (trackingNumber: string): string => {
  return `https://t.17track.net/en#nums=${trackingNumber}`;
};
