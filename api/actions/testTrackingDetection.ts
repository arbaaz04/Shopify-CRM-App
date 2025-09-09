/**
 * Test Tracking Number Based Courier Detection
 * 
 * This action tests the new tracking number based courier detection logic
 */

export const run = async ({ params, logger }: { 
  params: { 
    trackingNumbers?: string[];
  };
  logger: any;
}) => {
  try {
    const trackingNumbers = params.trackingNumbers || [
      'DH123456789',
      'MA987654321', 
      'dh555555555',
      'ma111111111',
      'XX123456789',
      '',
      '   DH   999999999   ',
      'MALICIOUS123',
      'DHFAST123'
    ];

    logger.info('Testing tracking number courier detection', { trackingNumbers });

    const results = trackingNumbers.map(trackingNumber => {
      const courierService = determineCourierService(trackingNumber, logger);
      return {
        trackingNumber,
        detectedCourier: courierService,
        isValid: courierService !== null
      };
    });

    logger.info('Detection results', { results });

    return {
      success: true,
      results,
      summary: {
        total: results.length,
        senditDetected: results.filter(r => r.detectedCourier === 'sendit').length,
        speedafDetected: results.filter(r => r.detectedCourier === 'speedaf').length,
        unrecognized: results.filter(r => r.detectedCourier === null).length
      }
    };

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('Error in tracking detection test', { error: errorMessage });
    return {
      success: false,
      error: errorMessage
    };
  }
};

/**
 * Determine courier service from tracking number prefix
 */
function determineCourierService(trackingNumber: string, logger: any): string | null {
  if (!trackingNumber || typeof trackingNumber !== 'string') {
    logger.info('No tracking number provided or invalid format');
    return null;
  }

  const trimmedTracking = trackingNumber.trim().toUpperCase();
  
  // Check for Sendit indicators (tracking starts with "DH")
  if (trimmedTracking.startsWith('DH')) {
    logger.info(`Detected Sendit delivery from tracking number: ${trackingNumber}`);
    return 'sendit';
  }

  // Check for Speedaf indicators (tracking starts with "MA")
  if (trimmedTracking.startsWith('MA')) {
    logger.info(`Detected Speedaf delivery from tracking number: ${trackingNumber}`);
    return 'speedaf';
  }

  logger.info(`No recognized courier service found for tracking number: ${trackingNumber}`);
  return null;
}
