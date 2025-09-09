// Core Order interface
export interface Order {
  id: string;
  orderNumber: string;
  name: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  city: string;
  rawCity?: string;
  originalCity?: string;
  address: string;
  trackingNumber?: string;
  trackingStatus?: string;
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  courier?: 'sendit' | 'speedaf';
  isLocalDelivery?: boolean;
  orderDate: string;
  lineItems: LineItem[];
  totalAmount: string;
  shippingAddress: ShippingAddress;
}

// Line item interface
export interface LineItem {
  id: string;
  productId: string;
  variantId: string;
  productTitle: string;
  variantTitle?: string;
  quantity: number;
  price: string;
  sku?: string;
}

// Shipping address interface
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  province?: string;
  country: string;
  zip?: string;
  phone?: string;
}

// Fulfillment interfaces
export interface FulfillmentRequest {
  orderId: string;
  trackingNumber: string;
  trackingCompany: string;
  notifyCustomer: boolean;
  lineItems?: FulfillmentLineItem[];
}

export interface FulfillmentLineItem {
  id: string;
  quantity: number;
}

// API Response interfaces
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Tracking interfaces
export interface TrackingInfo {
  trackingNumber: string;
  courier: 'sendit' | 'speedaf';
  status: string;
  url: string;
  lastUpdate?: string;
}

// City interfaces
export interface CityInfo {
  name: string;
  standardizedName: string;
  districtId?: string;
  courier: 'sendit' | 'speedaf';
  isCustom?: boolean;
}

// Exchange order interface
export interface ExchangeOrder extends Order {
  referenceOrderId?: string;
  exchangeType: 'return' | 'exchange';
  reason?: string;
}
