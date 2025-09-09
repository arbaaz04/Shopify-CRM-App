/**
 * Centralized Logging Service
 * Provides consistent logging across the application with proper levels
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  context?: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV !== 'production';

  private formatMessage(level: LogLevel, message: string, context?: string, data?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = context ? `[${context}]` : '';
    const dataStr = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
    return `${timestamp} [${level.toUpperCase()}]${contextStr} ${message}${dataStr}`;
  }

  private shouldLog(level: LogLevel): boolean {
    // In production, only log warnings and errors
    if (!this.isDevelopment) {
      return level === 'warn' || level === 'error';
    }
    return true;
  }

  debug(message: string, context?: string, data?: any): void {
    if (this.shouldLog('debug')) {
      console.debug(this.formatMessage('debug', message, context, data));
    }
  }

  info(message: string, context?: string, data?: any): void {
    if (this.shouldLog('info')) {
      console.info(this.formatMessage('info', message, context, data));
    }
  }

  warn(message: string, context?: string, data?: any): void {
    if (this.shouldLog('warn')) {
      console.warn(this.formatMessage('warn', message, context, data));
    }
  }

  error(message: string, context?: string, error?: Error | any): void {
    if (this.shouldLog('error')) {
      const errorData = error instanceof Error ? {
        name: error.name,
        message: error.message,
        stack: error.stack
      } : error;
      
      console.error(this.formatMessage('error', message, context, errorData));
    }
  }

  // Specific methods for common use cases
  apiCall(method: string, endpoint: string, data?: any): void {
    this.debug(`API ${method} ${endpoint}`, 'API', data);
  }

  apiResponse(method: string, endpoint: string, success: boolean, data?: any): void {
    const level = success ? 'info' : 'error';
    const message = `API ${method} ${endpoint} ${success ? 'succeeded' : 'failed'}`;
    this[level](message, 'API', data);
  }

  fulfillment(message: string, orderNumber?: string, data?: any): void {
    this.info(message, `FULFILLMENT${orderNumber ? `:${orderNumber}` : ''}`, data);
  }

  tracking(message: string, trackingNumber?: string, data?: any): void {
    this.info(message, `TRACKING${trackingNumber ? `:${trackingNumber}` : ''}`, data);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export the Logger class for testing
export { Logger };
