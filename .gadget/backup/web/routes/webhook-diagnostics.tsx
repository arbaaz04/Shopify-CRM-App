import React, { useState, useEffect } from "react";
import {
  Page,
  Layout,
  Card,
  Text,
  Banner,
  Button,
  BlockStack,
  InlineStack,
  Box,
  Spinner,
  Divider,
  List
} from "@shopify/polaris";
import { api } from "../api";

export default function WebhookDiagnostics() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState("");
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchRecentOrders();
  }, []);

  const fetchRecentOrders = async () => {
    try {
      const orders = await api.shopifyOrder.findMany({ 
        first: 5,
        sort: [{ field: "createdAt", direction: "Descending" }]
      });
      setRecentOrders(orders);
    } catch (err) {
      console.error("Error fetching recent orders:", err);
    }
  };

  const runDiagnostic = async (action: string, params = {}) => {
    setLoading(true);
    setResult(null);
    setError("");

    try {
      let response;
      switch (action) {
        case "checkWebhooks":
          response = await api.checkWebhooks.run();
          break;
        case "testGoogleAuth":
          response = await api.testGoogleAuth.run();
          break;
        case "triggerWebhook":
          if (!params.orderId) {
            throw new Error("Order ID is required");
          }
          response = await api.triggerWebhookProcessing.run(params);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
      setResult(response);
    } catch (err) {
      console.error(`Error running ${action}:`, err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };

  const renderDiagnosticResult = () => {
    if (!result) return null;

    return (
      <Card>
        <BlockStack gap="400">
          <Text variant="headingMd">Diagnostic Results</Text>
          
          {result.success ? (
            <Banner tone="success">
              Success: {result.message || "Operation completed successfully"}
            </Banner>
          ) : (
            <Banner tone="critical">
              Error: {result.error || "Unknown error occurred"}
            </Banner>
          )}
          
          <Details data={result} />
        </BlockStack>
      </Card>
    );
  };

  const Details = ({ data }: { data: any }) => {
    // Recursively display object data
    if (!data) return null;
    
    return (
      <BlockStack gap="200">
        {Object.entries(data).map(([key, value]) => {
          if (key === "success" || key === "message" || key === "error") return null;
          
          // Handle different value types
          if (typeof value === "object" && value !== null) {
            return (
              <BlockStack key={key} gap="200">
                <Text variant="headingSm">{key}:</Text>
                <Box paddingInlineStart="400">
                  <Details data={value} />
                </Box>
              </BlockStack>
            );
          } else {
            return (
              <Text key={key} variant="bodyMd">
                <strong>{key}:</strong> {String(value)}
              </Text>
            );
          }
        })}
      </BlockStack>
    );
  };

  return (
    <Page title="Webhook Diagnostics">
      <BlockStack gap="500">
        {error && (
          <Banner tone="critical" onDismiss={() => setError("")}>
            {error}
          </Banner>
        )}

        <Layout>
          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Webhook Status</Text>
                <Text>
                  Check if webhooks are properly configured in your Shopify store.
                </Text>
                <Button
                  onClick={() => runDiagnostic("checkWebhooks")}
                  loading={loading}
                  disabled={loading}
                >
                  Check Webhook Configuration
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Google Sheets Authentication</Text>
                <Text>
                  Test connection to Google Sheets with your service account credentials.
                </Text>
                <Button
                  onClick={() => runDiagnostic("testGoogleAuth")}
                  loading={loading}
                  disabled={loading}
                >
                  Test Google Authentication
                </Button>
              </BlockStack>
            </Card>
          </Layout.Section>

          <Layout.Section>
            <Card>
              <BlockStack gap="400">
                <Text variant="headingMd">Test Order Processing</Text>
                <Text>
                  Manually trigger webhook processing for a specific order.
                </Text>
                
                <Text variant="headingSm">Recent Orders:</Text>
                {recentOrders.length === 0 ? (
                  <Text>No recent orders found</Text>
                ) : (
                  <List>
                    {recentOrders.map((order: any) => (
                      <List.Item key={order.id}>
                        <InlineStack gap="200" align="center">
                          <Text>
                            {order.name} - Created: {new Date(order.createdAt).toLocaleString()}
                          </Text>
                          <Button
                            onClick={() => runDiagnostic("triggerWebhook", { orderId: order.id })}
                            size="slim"
                            disabled={loading}
                          >
                            Process
                          </Button>
                        </InlineStack>
                      </List.Item>
                    ))}
                  </List>
                )}
              </BlockStack>
            </Card>
          </Layout.Section>
        </Layout>

        {loading && (
          <Box padding="800" align="center">
            <Spinner size="large" />
          </Box>
        )}

        {renderDiagnosticResult()}
      </BlockStack>
    </Page>
  );
} 