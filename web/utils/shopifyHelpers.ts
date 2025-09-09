// Shopify-related utility functions

// Helper function to format Shopify order ID for GraphQL
export const formatShopifyOrderId = (orderId: string): string => {
  try {
    // Clean the order ID (remove any non-numeric characters)
    const cleanOrderId = String(orderId).replace(/\D/g, '');
    console.log(`Cleaning order ID: ${orderId} -> ${cleanOrderId}`);
    return cleanOrderId;
  } catch (error) {
    console.error("Error formatting Shopify order ID:", error);
    return String(orderId).replace(/\D/g, '');
  }
};

// Function to get Shopify admin URL for an order
export const getShopifyOrderAdminUrl = (shop: any, id: string): string => {
  if (!shop || !id) return "#";
  
  // Get the store name from the URL example provided by the user
  const storeName = "08d880-20";
  
  // Clean the ID to ensure it's just the numeric part
  const orderId = id.replace(/\D/g, '');
  
  // Use the exact format provided by the user
  return `https://admin.shopify.com/store/${storeName}/orders/${orderId}`;
};
