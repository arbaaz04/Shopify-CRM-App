/**
 * Scheduled job to sync orders with Google Sheets
 * Runs every 6 hours to ensure all orders are properly recorded
 */

export default async function scheduledOrderSync(ctx: any) {
  const { api, logger } = ctx;
  
  try {
    logger.info("Starting scheduled order sync job");
    
    // Call the syncOrders action with default limit of 100
    const result = await api.syncOrders.run({});
    
    if (result.success) {
      logger.info("Scheduled order sync completed successfully", { 
        processedOrders: result.results?.processedOrders || 0,
        confirmedOrders: result.results?.confirmedOrders || 0,
        pendingOrders: result.results?.pendingOrders || 0,
        skippedOrders: result.results?.skippedOrders || 0,
        errors: result.results?.errors || 0
      });
    } else {
      logger.error("Scheduled order sync failed", { error: result.error });
    }
  } catch (error) {
    logger.error("Error in scheduled order sync job", { 
      error: error instanceof Error ? error.message : String(error)
    });
  }
}

// Configure the job to run every 6 hours
export const interval = "0 */6 * * *"; // Cron syntax: At minute 0 past every 6th hour 