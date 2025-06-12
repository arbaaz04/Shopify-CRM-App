import { useState } from "react";
import { Button, Toast } from "@shopify/polaris";
import { api } from "../api";

interface FulfillOrderButtonProps {
  orderId: string;
  shopId: string;
}

export const FulfillOrderButton = ({ orderId, shopId }: FulfillOrderButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState({ message: "", error: false });

  const handleFulfill = async () => {
    if (!orderId || !shopId) {
      setToastContent({
        message: "Missing order or shop information",
        error: true,
      });
      setToastActive(true);
      return;
    }

    try {
      setIsLoading(true);
      
      // Update the order's fulfillment status
      const result = await api.shopifyOrder.update(orderId, {
        fulfillmentStatus: "fulfilled"
      });

      if (result) {
        setToastContent({
          message: "Order fulfilled successfully",
          error: false,
        });
      } else {
        throw new Error("Failed to fulfill order");
      }
      
    } catch (error) {
      console.error("Error fulfilling order:", error);
      setToastContent({
        message: "Error fulfilling order. Please try again.",
        error: true,
      });
    } finally {
      setIsLoading(false);
      setToastActive(true);
    }
  };

  return (
    <>
      <Button onClick={handleFulfill} loading={isLoading}>
        Fulfill Order
      </Button>
      
      {toastActive && (
        <Toast
          content={toastContent.message}
          error={toastContent.error}
          onDismiss={() => setToastActive(false)}
        />
      )}
    </>
  );
}; 