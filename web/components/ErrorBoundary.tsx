import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Banner, Card, Text, Button, BlockStack } from '@shopify/polaris';
import { logger } from '../services/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('React Error Boundary caught an error', 'ErrorBoundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Card>
          <BlockStack gap="400">
            <Banner tone="critical">
              <Text variant="headingMd" as="h2">
                Something went wrong
              </Text>
            </Banner>
            
            <Text as="p">
              An unexpected error occurred. This has been logged and will be investigated.
            </Text>
            
            {this.state.error && (
              <details style={{ marginTop: '16px' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '8px' }}>
                  Error details (for debugging)
                </summary>
                <pre style={{ 
                  background: '#f6f6f7', 
                  padding: '12px', 
                  fontSize: '12px',
                  overflow: 'auto',
                  borderRadius: '4px'
                }}>
                  {this.state.error.message}
                  {this.state.error.stack && `\n\n${this.state.error.stack}`}
                </pre>
              </details>
            )}
            
            <Button onClick={this.handleReset}>
              Try again
            </Button>
          </BlockStack>
        </Card>
      );
    }

    return this.props.children;
  }
}
