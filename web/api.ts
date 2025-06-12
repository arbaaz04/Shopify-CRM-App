// Sets up the API client for interacting with your backend.
// For your API reference, visit: https://docs.gadget.dev/api/bambe
import { Client } from "@gadget-client/bambe";

// Skip type declarations as they can be difficult to get right with the generated client
// The custom actions will still work at runtime even without the type declarations
export const api = new Client({ environment: window.gadgetConfig.environment });

// Add any additional API setup or utilities here
