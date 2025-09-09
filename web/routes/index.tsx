import React, { useState, useEffect, useCallback } from "react";
import {
  Page, Layout, Card, FormLayout, TextField, Button, Banner, Text, Box, Spinner, Frame, BlockStack, InlineStack,
  Select, EmptyState, ResourceList, ResourceItem, Badge, Checkbox, Toast, Tabs, Modal, Pagination
} from "@shopify/polaris";
import { RefreshIcon, LogoGoogleIcon } from "@shopify/polaris-icons";
import { api } from "../api";
import { useGadget } from "@gadgetinc/react-shopify-app-bridge";
import { useFindFirst } from "@gadgetinc/react";
import { CONFIRMATION_TAGS, MOROCCAN_CITIES, SPEEDAF_CITIES } from "../constants";
import { 
  getSenditTrackingUrl, 
  getSpeedafTrackingUrl, 
  isTangerCity, 
  getSenditDistrictId, 
  levenshteinDistance, 
  formatSpeedafCityForDisplay,
  formatShopifyOrderId, 
  getShopifyOrderAdminUrl,
  analyzeOrderShipping,
  analyzeOrderShippingAsync
} from "../utils";
import { createOrderFulfillment, getShopifyFulfillmentOrderId } from "../services";
import { ExchangeReferenceModal, CityEditModal, CityDisplay, OrderPagination } from "../components";

// Define proper return type interfaces
interface FulfillmentBaseResult {
  success: boolean;
  message?: string;
}

interface FulfillmentSuccessResult extends FulfillmentBaseResult {
  success: true;
  fulfillmentId: string;
  message: string;
  fulfillment: any;
  background?: false;
}

interface FulfillmentErrorResult extends FulfillmentBaseResult {
  success: false;
  error: string;
}

interface FulfillmentBackgroundResult extends FulfillmentBaseResult {
  success: true;
  message: string;
  background: true;
  fulfillmentId?: undefined;
}

type FulfillmentResult = FulfillmentSuccessResult | FulfillmentErrorResult | FulfillmentBackgroundResult;

export const IndexPage = () => {
  const { isAuthenticated } = useGadget();
  
  // GROUP 1: All useState hooks grouped together first
  const [selectedCourier, setSelectedCourier] = useState<string>('sendit');
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [ordersFetching, setOrdersFetching] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [shippingAnalysisCache, setShippingAnalysisCache] = useState<Record<string, any>>({});
  const [fulfillLoading, setFulfillLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<Error | null>(null);
  const [loadingSKUOrders, setLoadingSKUOrders] = useState<string[]>([]);
  const [confirmedCurrentPage, setConfirmedCurrentPage] = useState(1);
  const [confirmedPageSize] = useState(10);
  const [preventRefresh, setPreventRefresh] = useState(false);
  const [toastActive, setToastActive] = useState(false);
  const [toastProps, setToastProps] = useState({
    content: '',
    error: false,
  });
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [showRawResponse, setShowRawResponse] = useState(false);
  const [showDecryptedResponse, setShowDecryptedResponse] = useState(false);
  const [updatedTrackingIds, setUpdatedTrackingIds] = useState<Record<string, string>>({});
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingCity, setEditingCity] = useState<string>("");
  const [modifiedCities, setModifiedCities] = useState<Record<string, string>>({});
  const [showFulfillDialog, setShowFulfillDialog] = useState(false);
  const [showExchangeFulfillDialog, setShowExchangeFulfillDialog] = useState(false);
  const [autoWriteToSheets, setAutoWriteToSheets] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [removeOrderName, setRemoveOrderName] = useState('');
  const [removeOrderLoading, setRemoveOrderLoading] = useState(false);
  const [exchangeOrders, setExchangeOrders] = useState<any[]>([]);
  const [exchangeOrdersFetching, setExchangeOrdersFetching] = useState(false);
  const [exchangeOrdersError, setExchangeOrdersError] = useState<Error | null>(null);
  const [exchangeCurrentPage, setExchangeCurrentPage] = useState(1);
  const [exchangePageSize] = useState(10);
  const [selectedConfirmedOrders, setSelectedConfirmedOrders] = useState<string[]>([]);
  const [selectedExchangeOrders, setSelectedExchangeOrders] = useState<string[]>([]);
  const [removedOrders, setRemovedOrders] = useState<string[]>([]);
  const [orderToRemove, setOrderToRemove] = useState<string | null>(null);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [exchangeReferences, setExchangeReferences] = useState<Record<string, any>>({});
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [currentExchangeOrderId, setCurrentExchangeOrderId] = useState<string | null>(null);
  const [referenceOrderNumber, setReferenceOrderNumber] = useState("");
  const [loadingReferenceOrder, setLoadingReferenceOrder] = useState(false);
  const [referenceOrderOptions, setReferenceOrderOptions] = useState<{ label: string; value: string }[]>([]);
  const [referenceOrdersLoading, setReferenceOrdersLoading] = useState(false);
  const [referenceOrderSearchValue, setReferenceOrderSearchValue] = useState('');
  const [selectedReferenceOrder, setSelectedReferenceOrder] = useState<string>('');
  const [referenceOrderError, setReferenceOrderError] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);
  const [cityInputValue, setCityInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Removed sync state variables - no longer needed
  
  // Add a new state for sheet orders
  const [sheetOrders, setSheetOrders] = useState<any[]>([]);
  const [sheetShippingAnalysisCache, setSheetShippingAnalysisCache] = useState<Record<string, any>>({});
  const [sheetOrdersFetching, setSheetOrdersFetching] = useState(false);
  const [sheetOrdersError, setSheetOrdersError] = useState<Error | null>(null);
  const [selectedSheetOrders, setSelectedSheetOrders] = useState<string[]>([]);
  const [sheetCurrentPage, setSheetCurrentPage] = useState(1);
  const [sheetPageSize] = useState(10);

  // Speedaf tracking states
  const [speedafTrackingMode, setSpeedafTrackingMode] = useState<'10' | 'custom'>('10');
  const [speedafCustomOrderName, setSpeedafCustomOrderName] = useState<string>('');
  const [speedafTracking, setSpeedafTracking] = useState(false);
  const [speedafTrackingResults, setSpeedafTrackingResults] = useState<any[]>([]);

  // Custom cities state
  const [customCities, setCustomCities] = useState<string[]>([]);
  const [customCitiesLoading, setCustomCitiesLoading] = useState(false);
  const [speedafTrackingError, setSpeedafTrackingError] = useState<string | null>(null);
  const [speedafWritingToSheets, setSpeedafWritingToSheets] = useState(false);
  
  // Local delivery state - tracks which orders should have TNG- prefix for Tanger deliveries
  const [localDeliveryOrders, setLocalDeliveryOrders] = useState<Record<string, boolean>>({});
  
  // GROUP 2: useFindFirst hooks
  const [{ data: shop, fetching: shopFetching, error: shopError }] = useFindFirst(api.shopifyShop);
  const [{ data: config, fetching: configFetching, error: configError }] = useFindFirst(api.googleSheetConfig, {
    filter: shop ? { shopId: { equals: shop.id } } : undefined
  });

  // Function to get combined cities (default + custom)
  const getCombinedCities = useCallback(() => {
    const defaultCities = selectedCourier === 'speedaf' ? SPEEDAF_CITIES : MOROCCAN_CITIES;
    return [...defaultCities, ...customCities];
  }, [selectedCourier, customCities]);

  // Function to load custom cities
  const loadCustomCities = useCallback(async () => {
    if (!shop?.id) return;

    try {
      setCustomCitiesLoading(true);
      // @ts-ignore - API type not available but works at runtime
      const result = await api.getCustomCities({ 
        shopId: shop.id,
        courierType: selectedCourier === 'speedaf' ? 'speedaf' : 'sendit'
      });

      if (result.success && result.cities) {
        const cityNames = result.cities.map((city: any) => city.name);
        setCustomCities(cityNames);
        console.log('Loaded custom cities:', cityNames);
      } else {
        console.error("Failed to load custom cities:", result.error);
        setCustomCities([]);
      }
    } catch (error: any) {
      console.error("Error loading custom cities:", error);
      setCustomCities([]);
    } finally {
      setCustomCitiesLoading(false);
    }
  }, [shop?.id, selectedCourier]);

  // GROUP 3: All useEffect hooks
  // Load saved city modifications and removed orders from localStorage on component mount
  useEffect(() => {
    try {
      const savedCities = localStorage.getItem('modifiedCities');
      if (savedCities) {
        setModifiedCities(JSON.parse(savedCities));
      }
      
      // Load removed orders
      const savedRemovedOrders = localStorage.getItem('removedOrders');
      if (savedRemovedOrders) {
        setRemovedOrders(JSON.parse(savedRemovedOrders));
      }
      
      // Load local delivery orders
      const savedLocalDeliveryOrders = localStorage.getItem('localDeliveryOrders');
      if (savedLocalDeliveryOrders) {
        setLocalDeliveryOrders(JSON.parse(savedLocalDeliveryOrders));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
  }, []);
  
  // Initialize filtered cities when combined cities are loaded
  useEffect(() => {
    const combinedCities = getCombinedCities();
    console.log('Combined cities updated:', combinedCities.length, 'cities for courier:', selectedCourier);
    console.log('First 5 cities:', combinedCities.slice(0, 5));
    if (combinedCities.length > 0) {
      setFilteredCities(combinedCities);
    }
  }, [getCombinedCities, selectedCourier]);
  
  // Clear highlighted tracking IDs after 30 seconds
  useEffect(() => {
    if (Object.keys(updatedTrackingIds).length > 0) {
      const timer = setTimeout(() => {
        setUpdatedTrackingIds({});
      }, 30000); // 30 seconds
      
      return () => clearTimeout(timer);
    }
  }, [updatedTrackingIds]);

  // Load orders when component mounts only if not loading orders already
  useEffect(() => {
    if (isAuthenticated && shop && !ordersFetching && !preventRefresh) {
      fetchOrders();
      // Also fetch exchange orders on initial load
      fetchExchangeOrders();
      fetchSheetOrders(); // Uncommented this line
      // Load custom cities
      loadCustomCities();
    }
  }, [isAuthenticated, shop]);

  // Load custom cities when courier type changes
  useEffect(() => {
    if (shop?.id) {
      loadCustomCities();
    }
  }, [selectedCourier, loadCustomCities, shop?.id]);
  
  // Reset pagination when tab changes
  useEffect(() => {
    setConfirmedCurrentPage(1);
    setExchangeCurrentPage(1);
    setSheetCurrentPage(1);
  }, [selectedTab]);

  // Fetch sheet orders when sheet tab is selected
  useEffect(() => {
    if (selectedTab === 2 && isAuthenticated && shop && !sheetOrdersFetching && !preventRefresh) {
      fetchSheetOrders();
    }
  }, [selectedTab, isAuthenticated, shop, preventRefresh]);

  // GROUP 4: All memoized functions with useCallback
  const fetchOrders = useCallback(async () => {
    // Skip if already fetching or if refresh is prevented
    if (!isAuthenticated || !shop || ordersFetching || preventRefresh) return;
    
    setOrdersFetching(true);
    setOrdersError(null);
    
    try {
      console.log("🔍 [fetchOrders] Starting to fetch orders...");
      
      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true, 
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any // Using lowercase "desc" for the sort order
        }]
      });
      
      console.log(`🔍 [fetchOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }
      
      // Create a list of all fulfillment statuses that indicate an order is fulfilled
      // This includes variations in case and formatting to ensure robust matching
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled', 
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];
      
      // Create a list of all financial statuses that indicate an order is refunded
      const REFUNDED_STATUSES = [
        'REFUNDED', 'refunded',
        'PARTIALLY_REFUNDED', 'partially_refunded',
        'VOIDED', 'voided'
      ];
      
      // Create a list of all order statuses that indicate an order is cancelled
      const CANCELLED_STATUSES = [
        'CANCELLED', 'cancelled',
        'CANCELED', 'canceled'
      ];
      
      // Get unique statuses for debugging
      const uniqueFulfillmentStatuses = [...new Set(response.map(order => order.fulfillmentStatus))];
      const uniqueFinancialStatuses = [...new Set(response.map(order => order.financialStatus))];
      
      console.log("🔍 [fetchOrders] Unique fulfillment statuses found:", uniqueFulfillmentStatuses);
      console.log("🔍 [fetchOrders] Unique financial statuses found:", uniqueFinancialStatuses);
      
      // First pass: Filter out orders that are fulfilled, refunded, cancelled, or missing address
      const filteredByStatus = response.filter(order => {
        // Check fulfillment status
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check financial status (for refunds and cancellations)
        const financialStatus = order.financialStatus || '';
        const isRefunded = REFUNDED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check if order is cancelled
        const isCancelled = CANCELLED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        // Check if order has a shipping address
        const hasAddress = order.shippingAddress && 
                         (typeof order.shippingAddress === 'object' && 
                          !Array.isArray(order.shippingAddress) &&
                          ('address1' in order.shippingAddress || 
                           'city' in order.shippingAddress ||
                           'address2' in order.shippingAddress));
        
        // Log orders being excluded with reasons for debugging
        if (isFulfilled || isRefunded || isCancelled || !hasAddress) {
          const reasons = [];
          if (isFulfilled) reasons.push(`fulfillment status: ${fulfillmentStatus}`);
          if (isRefunded) reasons.push(`financial status: ${financialStatus}`);
          if (isCancelled) reasons.push(`cancelled`);
          if (!hasAddress) reasons.push(`missing address`);
          
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - Reasons: ${reasons.join(', ')}`);
          return false;
        }
        
        // Keep only orders that are not fulfilled, not refunded, not cancelled, and have addresses
        return true;
      });
      
      console.log(`🔍 [fetchOrders] After status filtering: ${filteredByStatus.length} orders remain`);
      
      // Second pass: Filter by confirmation tags and exclude removed orders
      const filteredOrders = filteredByStatus.filter(order => {
        // Skip if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }
        
        // Check if order has the Echange tag - exclude these orders
        if (order.tags) {
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Output the tags for debugging
          console.log(`🔍 [fetchOrders] Order ${order.name || order.id} has tags: ${JSON.stringify(tagArray)}`);
          
          // Case-insensitive check for 'echange' in any tag
          const hasExchangeTag = tagArray.some(tag => 
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );
          
          if (hasExchangeTag) {
            console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - has Echange tag`);
            return false;
          }
        }
        
        // Check if order has any of the confirmation tags
        let hasConfirmationTag = false;
        
        if (order.tags) {
          // Handle both string and array formats for tags
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Check each confirmation tag in detail
          for (const confirmTag of CONFIRMATION_TAGS) {
            for (const orderTag of tagArray) {
              if (typeof orderTag === 'string' && orderTag.includes(confirmTag)) {
                hasConfirmationTag = true;
                console.log(`🔍 [fetchOrders] Order ${order.name || order.id} has confirmation tag: ${orderTag}`);
                break;
              }
            }
            if (hasConfirmationTag) break;
          }
        }
        
        if (!hasConfirmationTag) {
          console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} - no confirmation tag found`);
        }
        
        return hasConfirmationTag;
      });
      
      console.log(`🔍 [fetchOrders] After tag filtering: ${filteredOrders.length} orders remain`);
      
      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchOrders] No orders passed the tag filtering - nothing to load`);
        setOrders([]);
        setShippingAnalysisCache({}); // Clear shipping analysis cache
        setOrdersFetching(false);
        return;
      }
      
      // Load full order data for all filtered orders
      console.log(`🔍 [fetchOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });
            
            if (orderResponse?.success && orderResponse?.order) {
              // Double-check fulfillment status with the full order data
              const orderStatus = orderResponse.order.fulfillmentStatus || '';
              const isFulfilledNow = FULFILLED_STATUSES.some(
                status => orderStatus.toUpperCase() === status.toUpperCase()
              );

              // Double-check financial status with the full order data
              const financialStatus = orderResponse.order.financialStatus || '';
              const isRefundedNow = REFUNDED_STATUSES.some(
                status => financialStatus.toUpperCase() === status.toUpperCase()
              );

              // Check if order is cancelled using the new isCancelled flag
              const isCancelledNow = !!orderResponse.order.isCancelled;
              
              // Double-check address information with full order data
              const fullOrder = orderResponse.order;
              const hasValidAddress = (
                // Check for address field directly
                (fullOrder.address && fullOrder.address.trim() !== '') ||
                // Check for shippingAddress object
                (fullOrder.shippingAddress && (
                  fullOrder.shippingAddress.address1 || 
                  fullOrder.shippingAddress.city || 
                  fullOrder.shippingAddress.address2
                )) ||
                // Check for city field directly
                (fullOrder.city && fullOrder.city.trim() !== '')
              );
              
              if (isFulfilledNow || isRefundedNow || isCancelledNow || !hasValidAddress) {
                const reasons = [];
                if (isFulfilledNow) reasons.push(`fulfillment status: ${orderStatus}`);
                if (isRefundedNow) reasons.push(`financial status: ${financialStatus}`);
                if (isCancelledNow) reasons.push(`cancelled`);
                if (!hasValidAddress) reasons.push(`missing address`);
                
                console.log(`🔍 [fetchOrders] Excluding order ${order.name || order.id} after full data check - Reasons: ${reasons.join(', ')}`);
                return null; // Will be filtered out later
              }
              
              console.log(`🔍 [fetchOrders] Successfully loaded order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true
              };
            } else {
              console.log(`🔍 [fetchOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              // If extraction failed, return minimal data
              return {
                id: order.id,
                name: `Order #${String(order.id).replace(/\D/g, '')}`,
                orderSkus: ['Failed to load SKUs'],
                hasLoadedSKUs: false,
                error: orderResponse?.error || 'Failed to load order data'
              };
            }
          } catch (err) {
            console.log(`🔍 [fetchOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return {
              id: order.id,
              name: `Order #${String(order.id).replace(/\D/g, '')}`,
              orderSkus: ['Error loading SKUs'],
              hasLoadedSKUs: false,
              error: err instanceof Error ? err.message : String(err)
            };
          }
        })
      );
      
      // Filter out any null records (orders that were excluded during double-checking)
      const validOrdersData = fullOrdersData.filter(order => order !== null);
      
      console.log(`🔍 [fetchOrders] Final result: ${validOrdersData.length} orders ready for display`);
      if (validOrdersData.length > 0) {
        console.log(`🔍 [fetchOrders] First few orders:`, validOrdersData.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }
      
      setOrders(validOrdersData);
      
      // Calculate shipping analysis for all orders (async)
      calculateShippingAnalysisForOrders(validOrdersData);
      
      // Set default local delivery to true for new Tanger orders with Sendit courier
      if (selectedCourier === 'sendit' && validOrdersData.length > 0) {
        const newLocalDeliveryOrders = { ...localDeliveryOrders };
        let hasNewTangerOrders = false;
        
        validOrdersData.forEach(order => {
          const currentCity = modifiedCities[order.id] || order.city || '';
          
          // If this is a Tanger order and we don't have a setting for it yet, default to true
          if (isTangerCity(currentCity) && localDeliveryOrders[order.id] === undefined) {
            newLocalDeliveryOrders[order.id] = true;
            hasNewTangerOrders = true;
          }
        });
        
        if (hasNewTangerOrders) {
          setLocalDeliveryOrders(newLocalDeliveryOrders);
          try {
            localStorage.setItem('localDeliveryOrders', JSON.stringify(newLocalDeliveryOrders));
          } catch (error) {
            console.error("Error saving default local delivery orders to localStorage:", error);
          }
        }
      }
      
      setOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrdersError(error instanceof Error ? error : new Error(String(error)));
      setOrdersFetching(false);
    }
  }, [isAuthenticated, shop, preventRefresh, removedOrders, selectedCourier, localDeliveryOrders, modifiedCities]);

  const fetchSheetOrders = useCallback(async () => {
    if (!isAuthenticated || !shop || preventRefresh || sheetOrdersFetching) {
      return;
    }

    setSheetOrdersFetching(true);
    setSheetOrdersError(null);

    try {
      console.log("🔍 [fetchSheetOrders] Starting to fetch orders for Google Sheets...");

      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true,
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true,
          writeOrder: true,
          autoWrite: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any
        }]
      });

      console.log(`🔍 [fetchSheetOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchSheetOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }

      // Create a list of all fulfillment statuses that indicate an order is fulfilled
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled',
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];

      // Filter orders that are fulfilled and have writeOrder=true
      const filteredOrders = response.filter(order => {
        // Check if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }

        // Check fulfillment status - must be fulfilled
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );

        if (!isFulfilled) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - not fulfilled: ${fulfillmentStatus}`);
          return false;
        }

        // Check writeOrder field - must be true (treat null as false)
        const writeOrder = order.writeOrder;
        if (!writeOrder) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - writeOrder is ${writeOrder}`);
          return false;
        }

        // Check autoWrite field - must be false (exclude orders with autoWrite=true)
        const autoWrite = order.autoWrite;
        if (autoWrite === true) {
          console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} - autoWrite is true`);
          return false;
        }

        console.log(`🔍 [fetchSheetOrders] Order ${order.name || order.id} passed filtering - fulfilled, writeOrder=true, and autoWrite is not true`);
        return true;
      });

      console.log(`🔍 [fetchSheetOrders] After filtering: ${filteredOrders.length} orders remain`);

      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchSheetOrders] No orders passed the filtering - nothing to load`);
        setSheetOrders([]);
        setSheetShippingAnalysisCache({}); // Clear sheet shipping analysis cache
        setSheetOrdersFetching(false);
        return;
      }

      // Load detailed order data for all filtered orders
      console.log(`🔍 [fetchSheetOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchSheetOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });

            if (orderResponse?.success && orderResponse?.order) {
              // Double-check that the order is still fulfilled
              const orderDetails = orderResponse.order;

              // Check if order is cancelled using the isCancelled flag
              if (orderDetails.isCancelled) {
                console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} after full data check - cancelled`);
                return null;
              }

              // Verify fulfillment status
              const fulfillmentStatus = orderDetails.fulfillmentStatus || '';
              const isFulfilled = FULFILLED_STATUSES.some(
                status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
              );

              if (!isFulfilled) {
                console.log(`🔍 [fetchSheetOrders] Excluding order ${order.name || order.id} after full data check - no longer fulfilled`);
                return null;
              }

              console.log(`🔍 [fetchSheetOrders] Successfully loaded order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true,
                writeOrder: true
              };
            } else {
              console.log(`🔍 [fetchSheetOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              return null; // Will be filtered out later
            }
          } catch (err) {
            console.log(`🔍 [fetchSheetOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return null; // Will be filtered out later
          }
        })
      );

      // Remove null entries
      const validOrdersData = fullOrdersData.filter(order => order !== null);

      console.log(`🔍 [fetchSheetOrders] Final result: ${validOrdersData.length} orders ready for display`);
      if (validOrdersData.length > 0) {
        console.log(`🔍 [fetchSheetOrders] First few orders:`, validOrdersData.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }

      setSheetOrders(validOrdersData);
      
      // Calculate shipping analysis for sheet orders (async)
      calculateShippingAnalysisForSheetOrders(validOrdersData);
      
      setSheetOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching sheet orders:", error);
      setSheetOrdersError(error instanceof Error ? error : new Error(String(error)));
      setSheetOrdersFetching(false);
    }
  }, [isAuthenticated, shop, preventRefresh, removedOrders]);

  const fetchExchangeOrders = useCallback(async () => {
    // Skip if already fetching or if refresh is prevented
    if (!isAuthenticated || !shop || exchangeOrdersFetching) return;
    
    setExchangeOrdersFetching(true);
    setExchangeOrdersError(null);
    
    try {
      console.log("🔍 [fetchExchangeOrders] Starting to fetch exchange orders...");
      
      // Fetch orders using Gadget's standard API, sorting by most recent
      const response = await api.shopifyOrder.findMany({
        select: {
          id: true,
          tags: true,
          fulfillmentStatus: true, 
          name: true,
          shippingAddress: true,
          financialStatus: true,
          createdAt: true
        },
        first: 250, // Increase to fetch more orders
        sort: [{
          createdAt: "Descending" as any // Using lowercase "desc" for the sort order
        }]
      });
      
      console.log(`🔍 [fetchExchangeOrders] Initially fetched ${response.length} orders from Shopify`);
      if (response.length > 0) {
        console.log(`🔍 [fetchExchangeOrders] Newest order date: ${response[0]?.createdAt}, Oldest order date in result: ${response[response.length-1]?.createdAt}`);
      }
      
      // Create list of fulfilled statuses with different capitalizations for robust matching
      const FULFILLED_STATUSES = [
        'FULFILLED', 'fulfilled', 
        'PARTIAL', 'partial',
        'SHIPPED', 'shipped',
        'COMPLETE', 'complete',
        'DELIVERED', 'delivered'
      ];
      
      // Create a list of all order statuses that indicate an order is cancelled
      const CANCELLED_STATUSES = [
        'CANCELLED', 'cancelled',
        'CANCELED', 'canceled'
      ];
      
      // Get unique statuses for debugging
      const uniqueTags = new Set();
      response.forEach(order => {
        if (order.tags) {
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          tagArray.forEach(tag => {
            if (typeof tag === 'string') {
              uniqueTags.add(tag);
            }
          });
        }
      });
      
      console.log("🔍 [fetchExchangeOrders] Unique tags found:", [...uniqueTags]);
      
      // First filter - get only orders that have Echange tag and are UNFULFILLED, not CANCELLED, and have a confirmation tag
      const filteredOrders = response.filter(order => {
        // Skip if order has been manually removed
        if (removedOrders.includes(order.id)) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - manually removed`);
          return false;
        }
        
        // Check if order has the Echange tag
        let hasExchangeTag = false;
        
        if (order.tags) {
          // Handle both string and array formats for tags
          const tagValue = order.tags;
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Output tags for debugging
          console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} has tags: ${JSON.stringify(tagArray)}`);
          
          // Case-insensitive check for 'echange' in any tag
          hasExchangeTag = tagArray.some(tag => 
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );
          
          if (!hasExchangeTag) {
            console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no Echange tag`);
            return false;
          }
        } else {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no tags`);
          return false;
        }
        
        // Check for fulfilled status with better case handling
        const fulfillmentStatus = order.fulfillmentStatus || '';
        const isFulfilled = FULFILLED_STATUSES.some(
          status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
        );
        
        if (isFulfilled) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - already fulfilled: ${fulfillmentStatus}`);
          return false;
        }
        
        // Check if order is cancelled
        const financialStatus = order.financialStatus || '';
        const isCancelled = CANCELLED_STATUSES.some(
          status => financialStatus.toUpperCase() === status.toUpperCase()
        );
        
        if (isCancelled) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - cancelled: ${financialStatus}`);
          return false;
        }
        
        // Check if order has any of the confirmation tags
        let hasConfirmationTag = false;
        
        if (order.tags) {
          const tagValue = order.tags;
          
          // Handle both string and array formats for tags
          const tagArray = typeof tagValue === 'string' 
            ? tagValue.split(/,\s*/) 
            : Array.isArray(tagValue) ? tagValue : [];
          
          // Check each confirmation tag in detail
          for (const confirmTag of CONFIRMATION_TAGS) {
            for (const orderTag of tagArray) {
              if (typeof orderTag === 'string' && orderTag.includes(confirmTag)) {
                console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} has confirmation tag: ${orderTag}`);
                hasConfirmationTag = true;
                break;
              }
            }
            if (hasConfirmationTag) break;
          }
        }
        
        if (!hasConfirmationTag) {
          console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - no confirmation tag`);
          return false;
        }
        
        // Order has Echange tag, is not fulfilled, is not cancelled, and has confirmation tag
        console.log(`🔍 [fetchExchangeOrders] Order ${order.name || order.id} passed initial filtering`);
        return true;
      });
      
      console.log(`🔍 [fetchExchangeOrders] After initial filtering: ${filteredOrders.length} orders remain`);
      
      if (filteredOrders.length === 0) {
        console.log(`🔍 [fetchExchangeOrders] No orders passed the initial filtering - nothing to load`);
        setExchangeOrders([]);
        setExchangeOrdersFetching(false);
        return;
      }
      
      // Load detailed order data for all filtered orders
      console.log(`🔍 [fetchExchangeOrders] Loading full order data for ${filteredOrders.length} orders...`);
      const fullOrdersData = await Promise.all(
        filteredOrders.map(async (order: any) => {
          try {
            console.log(`🔍 [fetchExchangeOrders] Extracting SKUs for order ${order.name || order.id}`);
            // Use extractOrderSKUs action to get complete order data
            const orderResponse = await (api as any).extractOrderSKUs({
              orderId: String(order.id).replace(/\D/g, ''),
              shopId: shop?.id || ''
            });
            
            if (orderResponse?.success && orderResponse?.order) {
              // Double-check that the order isn't already fulfilled
              const orderDetails = orderResponse.order;
              
              // Check if order is cancelled using the new isCancelled flag
              if (orderDetails.isCancelled) {
                console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} after full data check - cancelled`);
                return null;
              }
              
              // If order has a tracking number, check if it's already fulfilled
              if (orderDetails.trackingNumber) {
                const fulfillmentStatus = orderDetails.fulfillmentStatus || '';
                const isFulfilled = FULFILLED_STATUSES.some(
                  status => fulfillmentStatus.toUpperCase() === status.toUpperCase()
                );
                
                // If order has tracking number and is marked fulfilled, filter it out
                if (isFulfilled) {
                  console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} after full data check - has tracking and is fulfilled`);
                  return null;
                }
                
                // If order has tracking number but isn't marked fulfilled yet in Shopify, check if it's a tracking number we just created
                if (updatedTrackingIds[order.id] === orderDetails.trackingNumber) {
                  console.log(`🔍 [fetchExchangeOrders] Excluding order ${order.name || order.id} - tracking number was just updated`);
                  return null;
                }
              }
              
              console.log(`🔍 [fetchExchangeOrders] Successfully loaded exchange order ${order.name || order.id}`);
              return {
                ...orderResponse.order,
                id: order.id, // Keep the original ID format
                hasLoadedSKUs: true
              };
            } else {
              console.log(`🔍 [fetchExchangeOrders] Failed to extract SKUs for order ${order.name || order.id}: ${orderResponse?.error || 'Unknown error'}`);
              return null; // Will be filtered out later
            }
          } catch (err) {
            console.log(`🔍 [fetchExchangeOrders] Error processing order ${order.name || order.id}: ${err instanceof Error ? err.message : String(err)}`);
            return null; // Will be filtered out later
          }
        })
      );
      
      // Remove null entries
      const validOrdersData = fullOrdersData.filter(order => order !== null);
      
      // No need to filter by DH tracking code for unfulfilled orders as they won't have tracking codes yet
      const exchangeOrders = validOrdersData;
      
      console.log(`🔍 [fetchExchangeOrders] Final result: ${exchangeOrders.length} exchange orders ready for display`);
      if (exchangeOrders.length > 0) {
        console.log(`🔍 [fetchExchangeOrders] First few exchange orders:`, exchangeOrders.slice(0, 3).map(o => ({ id: o.id, name: o.name })));
      }
      
      setExchangeOrders(exchangeOrders);
      setExchangeOrdersFetching(false);
    } catch (error) {
      console.error("Error fetching exchange orders:", error);
      setExchangeOrdersError(error instanceof Error ? error : new Error(String(error)));
      setExchangeOrdersFetching(false);
    }
  }, [isAuthenticated, shop]);

  const handleCourierChange = useCallback((value: string) => {
    setSelectedCourier(value);
  }, []);

  const handleSelectOrder = useCallback((id: string) => {
    if (selectedTab === 0) {
      // Confirmed orders tab
      setSelectedConfirmedOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (selectedTab === 1) {
      // Exchange orders tab
      setSelectedExchangeOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    } else if (selectedTab === 2) {
      // Sheet orders tab
      setSelectedSheetOrders(prev => {
        if (prev.includes(id)) {
          return prev.filter(orderId => orderId !== id);
        } else {
          return [...prev, id];
        }
      });
    }
    // Note: selectedTab === 3 (Speedaf Tracking) doesn't need order selection
  }, [selectedTab]);

  const handleSelectAllOrders = useCallback(() => {
    const startIndex = (confirmedCurrentPage - 1) * confirmedPageSize;
    const endIndex = Math.min(startIndex + confirmedPageSize, orders.length);
    const currentPageOrders = orders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);
    
    const allCurrentPageSelected = currentPageOrderIds.every(id => 
      selectedConfirmedOrders.includes(id)
    );
    
    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedConfirmedOrders(prev => 
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedConfirmedOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedConfirmedOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [confirmedCurrentPage, confirmedPageSize, orders, selectedConfirmedOrders]);

  const handleSelectAllExchangeOrders = useCallback(() => {
    const startIndex = (exchangeCurrentPage - 1) * exchangePageSize;
    const endIndex = Math.min(startIndex + exchangePageSize, exchangeOrders.length);
    const currentPageOrders = exchangeOrders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);
    
    const allCurrentPageSelected = currentPageOrderIds.every(id => 
      selectedExchangeOrders.includes(id)
    );
    
    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedExchangeOrders(prev => 
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedExchangeOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedExchangeOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [exchangeCurrentPage, exchangePageSize, exchangeOrders, selectedExchangeOrders]);

  const handleSelectAllSheetOrders = useCallback(() => {
    const startIndex = (sheetCurrentPage - 1) * sheetPageSize;
    const endIndex = Math.min(startIndex + sheetPageSize, sheetOrders.length);
    const currentPageOrders = sheetOrders.slice(startIndex, endIndex);
    const currentPageOrderIds = currentPageOrders.map(order => order.id);

    const allCurrentPageSelected = currentPageOrderIds.every(id =>
      selectedSheetOrders.includes(id)
    );

    if (allCurrentPageSelected) {
      // If all current page orders are selected, deselect them
      setSelectedSheetOrders(prev =>
        prev.filter(id => !currentPageOrderIds.includes(id))
      );
    } else {
      // Otherwise, select all current page orders while keeping previously selected orders from other pages
      const otherPageSelections = selectedSheetOrders.filter(
        id => !currentPageOrderIds.includes(id)
      );
      setSelectedSheetOrders([...otherPageSelections, ...currentPageOrderIds]);
    }
  }, [sheetCurrentPage, sheetPageSize, sheetOrders, selectedSheetOrders]);

  // Function to calculate shipping analysis for orders
  const calculateShippingAnalysisForOrders = async (orders: any[]) => {
    const newAnalysisCache: Record<string, any> = {};
    
    // Process orders in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < orders.length; i += batchSize) {
      const batch = orders.slice(i, i + batchSize);
      
      const analysisPromises = batch.map(async (order) => {
        try {
          const analysis = await analyzeOrderShippingAsync(order, api);
          return { orderId: order.id, analysis };
        } catch (error) {
          console.error(`Error analyzing shipping for order ${order.id}:`, error);
          // Fallback to synchronous analysis
          const analysis = analyzeOrderShipping(order);
          return { orderId: order.id, analysis };
        }
      });
      
      const batchResults = await Promise.all(analysisPromises);
      batchResults.forEach(({ orderId, analysis }) => {
        newAnalysisCache[orderId] = analysis;
      });
    }
    
    setShippingAnalysisCache(newAnalysisCache);
  };

  // Function to calculate shipping analysis for sheet orders
  const calculateShippingAnalysisForSheetOrders = async (orders: any[]) => {
    const newAnalysisCache: Record<string, any> = {};
    
    // Process orders in batches to avoid overwhelming the API
    const batchSize = 10;
    for (let i = 0; i < orders.length; i += batchSize) {
      const batch = orders.slice(i, i + batchSize);
      
      const analysisPromises = batch.map(async (order) => {
        try {
          const analysis = await analyzeOrderShippingAsync(order, api);
          return { orderId: order.id, analysis };
        } catch (error) {
          console.error(`Error analyzing shipping for sheet order ${order.id}:`, error);
          // Fallback to synchronous analysis
          const analysis = analyzeOrderShipping(order);
          return { orderId: order.id, analysis };
        }
      });
      
      const batchResults = await Promise.all(analysisPromises);
      batchResults.forEach(({ orderId, analysis }) => {
        newAnalysisCache[orderId] = analysis;
      });
    }
    
    setSheetShippingAnalysisCache(newAnalysisCache);
  };

  const handleWriteToSheets = async () => {
    if (selectedSheetOrders.length === 0) return;

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results: any[] = [];
    const failedOrders: any[] = [];

    try {
      console.log(`Starting to write ${selectedSheetOrders.length} orders to Google Sheets`);

      // Collect all order data first, then write in a single batch operation
      console.log(`Collecting data for ${selectedSheetOrders.length} orders for batch write`);

      const allOrdersData = [];

      // First pass: collect all order data
      for (let i = 0; i < selectedSheetOrders.length; i++) {
        const orderId = selectedSheetOrders[i];
        console.log(`Collecting data for order ${i + 1}/${selectedSheetOrders.length}: ${orderId}`);

        try {
          // Find the order in our loaded sheet orders array
          const orderItem = sheetOrders.find(o => o.id === orderId);
          if (!orderItem) {
            throw new Error(`Order ${orderId} not found in loaded sheet orders`);
          }

          // Get full order details if not already loaded
          let orderData = orderItem;
          if (!orderItem.hasLoadedSKUs) {
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');

            const orderExtractResult = await apiAny.extractOrderSKUs({
              orderId: cleanOrderId,
              shopId: shop?.id || ''
            });

            if (!orderExtractResult?.success || !orderExtractResult?.order) {
              throw new Error(orderExtractResult?.error || "Failed to extract order details");
            }

            orderData = orderExtractResult.order;
          }

          // Check if this is an exchange order by looking for "echange" tag
          const tagArray = Array.isArray(orderData.tags) ? orderData.tags :
                          (typeof orderData.tags === 'string' ? orderData.tags.split(/,\s*/) : []);
          const isExchangeOrder = tagArray.some((tag: any) =>
            typeof tag === 'string' && tag.toLowerCase().includes('echange')
          );

          // For exchange orders, try to get reference tracking number
          let referenceTrackingNumber = '';
          if (isExchangeOrder) {
            console.log(`Order ${orderData.name} is an exchange order, checking for reference tracking...`);

            // First check if we have the reference in our exchangeReferences state
            if (exchangeReferences[orderId] && exchangeReferences[orderId].trackingNumber) {
              referenceTrackingNumber = exchangeReferences[orderId].trackingNumber;
              console.log(`Found reference tracking number from exchangeReferences: ${referenceTrackingNumber}`);
            }
            // If not found in exchangeReferences, try to get it from the order's referenceOrderId
            else if (orderData.referenceOrderId) {
              try {
                const refOrderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: String(orderData.referenceOrderId).replace(/\D/g, ''),
                  shopId: shop?.id || ''
                });

                if (refOrderExtractResult?.success && refOrderExtractResult?.order) {
                  referenceTrackingNumber = refOrderExtractResult.order.trackingNumber || '';
                  console.log(`Found reference tracking number from referenceOrderId: ${referenceTrackingNumber}`);
                }
              } catch (refError) {
                console.error(`Error getting reference order tracking:`, refError);
              }
            }
            else {
              console.log(`No reference tracking found for exchange order ${orderData.name}`);
            }
          }

          // Transform order data
          const transformedOrderData = {
            id: orderData.id,
            name: orderData.name,
            customerName: orderData.customerName,
            phone: orderData.phone,
            originalCity: orderData.originalCity, // Include Original City from noteAttributes
            address: orderData.address,
            city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
            rawCity: orderData.rawCity,
            lineItems: orderData.lineItems.map((item: any) => ({
              name: item.name,
              quantity: item.quantity,
              sku: item.sku,
              price: item.price
            })),
            totalPrice: orderData.totalPrice,
            displayFulfillmentStatus: orderData.fulfillmentStatus || orderData.displayFulfillmentStatus,
            createdAt: orderData.createdAt,
            tags: orderData.tags,
            trackingNumber: formatTrackingNumberForSheets(orderData.id, orderData.trackingNumber || ''),
            referenceTrackingNumber: referenceTrackingNumber, // Reference order tracking for column Y
            isExchangeOrder: isExchangeOrder, // Flag to identify exchange orders for checkbox in column AA
            isCancelled: orderData.isCancelled,
            isDeleted: orderData.isDeleted,
            isFulfillmentCancelled: orderData.isFulfillmentCancelled
          };

          allOrdersData.push({
            orderId,
            orderName: orderItem.name,
            orderData: transformedOrderData
          });

        } catch (orderError) {
          console.error(`Error collecting data for order ${orderId}:`, orderError);
          failedOrders.push({
            orderId,
            orderName: sheetOrders.find(o => o.id === orderId)?.name || orderId,
            error: orderError instanceof Error ? orderError.message : String(orderError),
            success: false
          });
        }
      }

      // Second pass: write all orders in a single batch operation
      if (allOrdersData.length > 0) {
        console.log(`Writing ${allOrdersData.length} orders to Google Sheets in a single batch operation`);

        try {
          const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
            ordersData: JSON.stringify(allOrdersData.map(item => item.orderData)),
            shopId: shop?.id || ''
          });

          if (batchWriteResult?.success) {
            console.log(`Successfully wrote ${allOrdersData.length} orders to Google Sheets`, batchWriteResult);

            // Mark all orders as successful
            allOrdersData.forEach(item => {
              results.push({
                orderId: item.orderId,
                orderName: item.orderName,
                success: true
              });
            });
          } else {
            throw new Error(batchWriteResult?.error || "Batch write to sheets failed");
          }

        } catch (batchError) {
          console.error(`Error in batch write:`, batchError);
          // Mark all orders as failed
          allOrdersData.forEach(item => {
            failedOrders.push({
              orderId: item.orderId,
              orderName: item.orderName,
              error: batchError instanceof Error ? batchError.message : String(batchError),
              success: false
            });
          });
        }
      }

      // Show results to user
      if (results.length > 0) {
        const successMessage = `Successfully wrote ${results.length} orders to Google Sheets.`;
        console.log(successMessage, { successfulOrders: results });

        setToastProps({
          content: successMessage,
          error: false
        });
        setToastActive(true);
      }

      if (failedOrders.length > 0) {
        const errorMessages = failedOrders.map(order =>
          `${order.orderName}: ${order.error}`
        );
        const errorMessage = `Failed to write ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
        console.error("Failed sheet orders:", failedOrders);

        setToastProps({
          content: errorMessage,
          error: true
        });
        setToastActive(true);
      }

      // Clear selections and refresh the sheet orders
      setSelectedSheetOrders([]);

      // Refresh the sheet orders to reflect the changes
      setTimeout(() => {
        fetchSheetOrders();
      }, 2000); // Wait 2 seconds for the backend to process

    } catch (error) {
      console.error("Error in handleWriteToSheets:", error);
      setToastProps({
        content: `Error writing orders to sheets: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      setPreventRefresh(false);
    }
  };

  const normalizeForSearch = useCallback((text: string): string => {
    if (!text) return '';
    return text.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/[œ]/g, 'oe')
      .replace(/[æ]/g, 'ae')
      .replace(/[ç]/g, 'c');
  }, []);

  const handleCityInputChange = useCallback((value: string) => {
    setCityInputValue(value);
    setEditingCity(value);
    
    // Use combined cities instead of hardcoded arrays
    const citiesList = getCombinedCities();
    
    // Filter cities based on input
    if (value.trim() === '') {
      // When input is empty, show all cities
      setFilteredCities(citiesList);
    } else {
      setIsLoading(true);
      // Use normalized search to handle accents and special characters
      const normalizedInput = normalizeForSearch(value);
      const filtered = citiesList.filter((city: string) => 
        normalizeForSearch(city).includes(normalizedInput)
      );
      setFilteredCities(filtered);
      setIsLoading(false);
    }
  }, [getCombinedCities, normalizeForSearch]);

  const handleCitySelect = useCallback((selected: string) => {
    setEditingCity(selected);
    setCityInputValue(selected);
  }, []);

  const handleEditCity = useCallback((id: string, currentCity: string) => {
    setEditingOrderId(id);
    // Ensure we have a non-null city value
    const safeCurrentCity = modifiedCities[id] || currentCity || '';
    setEditingCity(safeCurrentCity);
    setCityInputValue(safeCurrentCity);
    
    // Use combined cities instead of hardcoded arrays
    const citiesList = getCombinedCities();
    
    // Show all cities initially
    setFilteredCities(citiesList);
    setShowCityModal(true);
  }, [modifiedCities, getCombinedCities]);

  const handleSaveCity = useCallback(() => {
    if (editingOrderId) {
      const updatedCities = {
        ...modifiedCities,
        [editingOrderId]: editingCity
      };
      
      setModifiedCities(updatedCities);
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('modifiedCities', JSON.stringify(updatedCities));
      } catch (error) {
        console.error("Error saving modified cities to localStorage:", error);
      }
      
      // Check if the new city is Tanger and we're using Sendit courier
      // If so, automatically set local delivery to true
      if (selectedCourier === 'sendit' && isTangerCity(editingCity)) {
        const updatedLocalDelivery = {
          ...localDeliveryOrders,
          [editingOrderId]: true
        };
        
        setLocalDeliveryOrders(updatedLocalDelivery);
        
        // Save local delivery setting to localStorage
        try {
          localStorage.setItem('localDeliveryOrders', JSON.stringify(updatedLocalDelivery));
        } catch (error) {
          console.error("Error saving local delivery orders to localStorage:", error);
        }
      }
      
      setShowCityModal(false);
      setEditingOrderId(null);
    }
  }, [editingOrderId, editingCity, modifiedCities, selectedCourier, localDeliveryOrders]);

  const handleCancelCity = useCallback(() => {
    setShowCityModal(false);
    setEditingOrderId(null);
  }, []);

  const handleLocalDeliveryChange = useCallback((orderId: string, checked: boolean) => {
    const updatedLocalDelivery = {
      ...localDeliveryOrders,
      [orderId]: checked
    };
    
    setLocalDeliveryOrders(updatedLocalDelivery);
    
    // Save to localStorage for persistence
    try {
      localStorage.setItem('localDeliveryOrders', JSON.stringify(updatedLocalDelivery));
    } catch (error) {
      console.error("Error saving local delivery orders to localStorage:", error);
    }
  }, [localDeliveryOrders]);

  // Helper function to format tracking number with TNG- prefix for local delivery
  const formatTrackingNumberForSheets = useCallback((orderId: string, trackingNumber: string) => {
    if (!trackingNumber) return '';
    
    // Check if local delivery is enabled for this order
    const isLocalDelivery = localDeliveryOrders[orderId];
    
    // Add TNG- prefix if local delivery is enabled and tracking number doesn't already have it
    if (isLocalDelivery && !trackingNumber.startsWith('TNG-')) {
      return `TNG-${trackingNumber}`;
    }
    
    return trackingNumber;
  }, [localDeliveryOrders]);

  const handleRemoveOrder = useCallback((id: string) => {
    setOrderToRemove(id);
    setShowRemoveModal(true);
  }, []);

  const handleConfirmRemove = useCallback(() => {
    if (orderToRemove) {
      // Add to removed orders list
      const updatedRemovedOrders = [...removedOrders, orderToRemove];
      setRemovedOrders(updatedRemovedOrders);
      
      if (selectedTab === 0) {
        // Confirmed Orders tab
        // Remove from selected orders if selected
        if (selectedConfirmedOrders.includes(orderToRemove)) {
          setSelectedConfirmedOrders(prev => prev.filter(id => id !== orderToRemove));
        }
        
        // Remove from orders list
        setOrders(prev => prev.filter(order => order.id !== orderToRemove));
      } else {
        // Exchange Orders tab
        // Remove from selected exchange orders if selected
        if (selectedExchangeOrders.includes(orderToRemove)) {
          setSelectedExchangeOrders(prev => prev.filter(id => id !== orderToRemove));
        }
        
        // Remove from exchange orders list
        setExchangeOrders(prev => prev.filter(order => order.id !== orderToRemove));
      }
      
      // Save to localStorage for persistence
      try {
        localStorage.setItem('removedOrders', JSON.stringify(updatedRemovedOrders));
      } catch (error) {
        console.error("Error saving removed orders to localStorage:", error);
      }
      
      // Show toast notification
      setToastProps({
        content: "Order removed from fulfillment list",
        error: false
      });
      setToastActive(true);
      
      setShowRemoveModal(false);
      setOrderToRemove(null);
    }
  }, [orderToRemove, removedOrders, selectedConfirmedOrders, selectedExchangeOrders, selectedTab]);

  const handleCancelRemove = useCallback(() => {
    setShowRemoveModal(false);
    setOrderToRemove(null);
  }, []);

  const getPaginatedOrders = useCallback(() => {
    const startIndex = (confirmedCurrentPage - 1) * confirmedPageSize;
    const endIndex = Math.min(startIndex + confirmedPageSize, orders.length);
    return orders.slice(startIndex, endIndex);
  }, [orders, confirmedCurrentPage, confirmedPageSize]);

  const getPaginatedExchangeOrders = useCallback(() => {
    const startIndex = (exchangeCurrentPage - 1) * exchangePageSize;
    const endIndex = Math.min(startIndex + exchangePageSize, exchangeOrders.length);
    return exchangeOrders.slice(startIndex, endIndex);
  }, [exchangeOrders, exchangeCurrentPage, exchangePageSize]);

  const handleConfirmedPageChange = useCallback((newPage: number) => {
    setConfirmedCurrentPage(newPage);
  }, []);

  const handleExchangePageChange = useCallback((newPage: number) => {
    setExchangeCurrentPage(newPage);
  }, []);

  // Function to open the exchange reference modal
  const handleExchangeWith = useCallback(async (id: string) => {
    setCurrentExchangeOrderId(id);
    setReferenceOrderNumber("");
    setReferenceOrderError(null);
    setSelectedReferenceOrder('');
    setReferenceOrderSearchValue('');
    setReferenceOrderOptions([]);
    setShowExchangeModal(true);
    setReferenceOrdersLoading(true);
    
    // Find the current order to get its phone number
    const currentOrder = exchangeOrders.find(o => o.id === id);
    
    // Only proceed if we can get the phone number
    if (currentOrder && shop) {
      try {
        // Get the phone number from the order using our safe extraction function
        const phoneNumber = extractPhoneNumber(currentOrder);
        
        // If no phone number, show error
        if (!phoneNumber) {
          setReferenceOrderError("No phone number found for this order");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // Create list of fulfilled statuses with different capitalizations for robust matching
        const FULFILLED_STATUSES = [
          'FULFILLED', 'fulfilled', 
          'PARTIAL', 'partial',
          'SHIPPED', 'shipped',
          'COMPLETE', 'complete',
          'DELIVERED', 'delivered'
        ];
        
        // Fetch orders using the same approach as fetchExchangeOrders - sorting by most recent
        const response = await api.shopifyOrder.findMany({
          select: {
            id: true,
            tags: true,
            fulfillmentStatus: true, 
            name: true,
            shippingAddress: true,
            financialStatus: true,
            createdAt: true
          },
          first: 100,
          sort: [{
            createdAt: "Descending" as any // Same sorting as in fetchExchangeOrders
          }]
        });
        
        console.log("Found", response.length, "total orders");
        
        if (!response || response.length === 0) {
          setReferenceOrderError("No orders found");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // First check for fulfilled status in the initial response
        const potentiallyFulfilledOrders = response.filter(order => {
          // Check if fulfillment status indicates this order is fulfilled
          const status = order.fulfillmentStatus || '';
          const isFulfilled = FULFILLED_STATUSES.some(
            fulfillmentStatus => status.toUpperCase() === fulfillmentStatus.toUpperCase()
          );
          
          // Extract phone number to check if it matches
          const orderPhone = extractPhoneNumber(order);
          const hasSamePhone = orderPhone === phoneNumber;
          
          // Check if this is not the current order
          const isNotCurrentOrder = order.id !== id;
          
          return isFulfilled && hasSamePhone && isNotCurrentOrder;
        });
        
        console.log("Found", potentiallyFulfilledOrders.length, "fulfilled orders with same phone number");
        
        if (potentiallyFulfilledOrders.length === 0) {
          setReferenceOrderError("No fulfilled orders found with the same phone number");
          setReferenceOrdersLoading(false);
          return;
        }
        
        // Sort by created date (newest first)
        const sortedOrders = potentiallyFulfilledOrders.sort((a, b) => {
          const dateA = new Date(a.createdAt || 0).getTime();
          const dateB = new Date(b.createdAt || 0).getTime();
          return dateB - dateA;
        });
        
        console.log("Checking these fulfilled orders for DH tracking numbers");
        
        // OPTIMIZATION: Only check a limited number of orders in parallel
        const MAX_ORDERS_TO_CHECK = 10; // Limit to 5 orders initially
        const validOrders = [];
        
        // First batch - check first 5 orders
        const firstBatch = sortedOrders.slice(0, MAX_ORDERS_TO_CHECK);
        setReferenceOrderError("Checking first 5 orders... This should be quick.");
        
        // Check first batch of orders in parallel
        const firstBatchResults = await Promise.all(
          firstBatch.map(async (order) => {
            try {
              const orderExtractResult = await api.extractOrderSKUs({
                orderId: String(order.id).replace(/\D/g, ''),
                shopId: shop?.id || ''
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                return null;
              }
              
              const extractedOrder = orderExtractResult.order;
              const orderName = extractedOrder.name || `#${String(order.id).replace(/\D/g, '')}`;
              
              // Check if tracking number exists and starts with DH
              if (extractedOrder.trackingNumber && 
                  String(extractedOrder.trackingNumber).startsWith("DH")) {
                return {
                  label: orderName,
                  value: String(order.id).replace(/\D/g, '')
                };
              }
              
              return null;
            } catch (error) {
              console.error(`Error checking order ${order.id}:`, error);
              return null;
            }
          })
        );
        
        // Filter out null results and add to valid orders
        const validFirstBatch = firstBatchResults.filter((result): result is {label: string; value: string} => 
          result !== null
        );
        validOrders.push(...validFirstBatch);
        
        // If we found at least one valid order, no need to check more
        if (validOrders.length === 0 && sortedOrders.length > MAX_ORDERS_TO_CHECK) {
          // If no valid orders in first batch, check more if available
          setReferenceOrderError("Checking more orders... This may take a moment.");
          
          // OPTIMIZATION: Process remaining orders in batches of 10
          const MAX_ORDERS_TOTAL = 150; // Check up to 50 orders total
          const remainingOrders = sortedOrders.slice(MAX_ORDERS_TO_CHECK, MAX_ORDERS_TOTAL); 
          
          // Process in batches of 10 to show progress
          const BATCH_SIZE = 10;
          for (let i = 0; i < remainingOrders.length; i += BATCH_SIZE) {
            const currentBatch = remainingOrders.slice(i, i + BATCH_SIZE);
            
            // Update progress message
            const processedCount = MAX_ORDERS_TO_CHECK + i;
            const totalToProcess = Math.min(sortedOrders.length, MAX_ORDERS_TOTAL);
            setReferenceOrderError(`Checking orders ${processedCount+1}-${processedCount+currentBatch.length} of ${totalToProcess}...`);
            
            // Process this batch in parallel
            const batchResults = await Promise.all(
              currentBatch.map(async (order) => {
                try {
                  const orderExtractResult = await api.extractOrderSKUs({
                    orderId: String(order.id).replace(/\D/g, ''),
                    shopId: shop?.id || ''
                  });
                  
                  if (!orderExtractResult?.success || !orderExtractResult?.order) {
                    return null;
                  }
                  
                  const extractedOrder = orderExtractResult.order;
                  const orderName = extractedOrder.name || `#${String(order.id).replace(/\D/g, '')}`;
                  
                  // Check if tracking number exists and starts with DH
                  if (extractedOrder.trackingNumber && 
                      String(extractedOrder.trackingNumber).startsWith("DH")) {
                    return {
                      label: orderName,
                      value: String(order.id).replace(/\D/g, '')
                    };
                  }
                  
                  return null;
                } catch (error) {
                  console.error(`Error checking order ${order.id}:`, error);
                  return null;
                }
              })
            );
            
            // Add valid orders from this batch
            const validBatch = batchResults.filter((result): result is {label: string; value: string} => 
              result !== null
            );
            validOrders.push(...validBatch);
            
            // If we found enough valid orders, stop processing
            if (validOrders.length >= 5) {
              break;
            }
          }
        }
        
        console.log("Found", validOrders.length, "valid orders with DH tracking");
        
        if (validOrders.length === 0) {
          setReferenceOrderError("No fulfilled orders with DH tracking numbers found");
        } else {
          // Set the options for the dropdown
          setReferenceOrderOptions(validOrders);
          setReferenceOrderError(null);
        }
      } catch (error) {
        console.error("Error fetching reference orders:", error);
        setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setReferenceOrdersLoading(false);
      }
    }
  }, [exchangeOrders, shop]);

  // Helper function to extract phone number from an order
  const extractPhoneNumber = (order: any): string | null => {
    if (order.shippingAddress && order.shippingAddress.phone) {
          return order.shippingAddress.phone;
    } else if (order.phone) {
      return order.phone;
    } else {
      return null;
    }
  };

  // The rest of your component (render logic) remains the same

  // Show loading state while fetching initial data
  if (shopFetching || configFetching) {
    return (
      <Frame>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spinner size="large" />
        </div>
      </Frame>
    );
  }

  // Show error state if there are any errors
  if (shopError || configError) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Banner tone="critical">
                <p>Error loading shop configuration: {shopError?.message || configError?.message}</p>
              </Banner>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  if (!isAuthenticated) {
    return (
      <Page>
        <Layout>
          <Layout.Section>
            <Card>
              <Text variant="bodyMd" as="p">
                Please authenticate to access this feature.
              </Text>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    );
  }

  const courierOptions = [
    { label: 'Sendit', value: 'sendit' },
    { label: 'Speedaf', value: 'speedaf' },
  ];

  // Helper function to render each order item
  const renderItem = (item: any) => {
    // Safely extract properties with fallbacks
    const {
      id,
      name = '',
      customerName = '',
      city = '',
      rawCity = '',
      originalCity = '', // Extract Original City from noteAttributes
      skus = [],
      totalPrice = '',
      financialStatus = '',
      statusTone = 'info',
      address = '',
      phone = '',
      trackingNumber = '',
      confirmationTag = ''
    } = item || {};
    
    const displayCity = city || (rawCity ? `Unknown (${rawCity})` : 'Unknown');
    const isSelected = selectedTab === 0
      ? selectedConfirmedOrders.includes(id)
      : selectedTab === 1
        ? selectedExchangeOrders.includes(id)
        : selectedTab === 2
          ? selectedSheetOrders.includes(id)
          : false; // Speedaf Tracking tab doesn't have selectable orders
    
    // Determine if tracking number was recently updated for highlighting
    const isTracked = trackingNumber && trackingNumber.trim() !== '';
    const isUpdatedTracking = updatedTrackingIds[id] === trackingNumber;
    
    // Check if this order has a reference order (for exchange tab)
    const hasReferenceOrder = selectedTab === 1 && exchangeReferences[id];
    const referenceOrder = hasReferenceOrder ? exchangeReferences[id] : null;
    
    // Handle checkbox click without propagating to row
    const handleCheckboxClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    };
    
    // Handle order name click to select order
    const handleOrderNameClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      handleSelectOrder(id);
    };
    
    // Handle ResourceItem click - do nothing to prevent accidental selection
    const handleResourceItemClick = () => {
      // Do nothing - only checkbox and order name should trigger selection
    };
    
    // Safely access array methods
    const safeJoin = (arr?: any[]) => {
      return Array.isArray(arr) ? arr.join(', ') : '';
    };
    
    // Analyze shipping status for this order (only for confirmed orders and write to sheets tabs)
    const shouldShowShippingInfo = selectedTab === 0 || selectedTab === 2; // Confirmed Orders or Write to Sheets
    const shippingAnalysis = shouldShowShippingInfo ? 
      (selectedTab === 0 
        ? shippingAnalysisCache[item.id] || analyzeOrderShipping(item)
        : selectedTab === 2 
        ? sheetShippingAnalysisCache[item.id] || analyzeOrderShipping(item)
        : null
      ) : null;
    
    return (
      <ResourceItem 
        id={id}
        onClick={handleResourceItemClick}
      >
        <BlockStack gap="400">
          <InlineStack gap="200" align="space-between">
            <InlineStack gap="200">
              <div onClick={handleCheckboxClick}>
                <Checkbox
                  label=""
                  labelHidden={true}
                  checked={isSelected}
                  onChange={() => handleSelectOrder(id)}
                />
              </div>
              <div 
                onClick={handleOrderNameClick}
                style={{ cursor: 'pointer' }}
              >
                <Text as="h3" variant="headingMd">
                  {name}
                </Text>
              </div>
              
              <Badge tone={statusTone}>
                {financialStatus}
              </Badge>
              
              {confirmationTag && (
                <Badge tone="info">{confirmationTag}</Badge>
              )}
              
              {shippingAnalysis && (
                <Badge tone={shippingAnalysis.tone}>
                  {shippingAnalysis.label}
                </Badge>
              )}
            </InlineStack>
            
            <InlineStack gap="200">
              <Text as="span" variant="bodyMd">
                <strong>Amount:</strong> {totalPrice}
              </Text>
              
              {selectedTab === 1 && (
                <Button
                  size="micro"
                  onClick={() => {
                    handleExchangeWith(id);
                  }}
                >
                  Exchange With
                </Button>
              )}
            </InlineStack>
          </InlineStack>
          
          <InlineStack gap="200">
            <Text as="span" variant="bodyMd">
              <strong>Customer:</strong> {customerName}
            </Text>
            <Text as="span" variant="bodyMd">
              <strong>Phone:</strong> {phone}
            </Text>
            {originalCity && (
              <Text as="span" variant="bodyMd">
                <strong>City - Additional Info:</strong> {originalCity}
              </Text>
            )}
          </InlineStack>
          
          <InlineStack align="space-between">
            <Text as="p" variant="bodyMd">
              <strong>Address:</strong> {address}
              {displayCity ? `, ` : ''}
              {modifiedCities[id] ? (
                <span style={{ color: '#bf0711' }}>
                  {modifiedCities[id]} <em>(modified)</em>
                </span>
              ) : (
                <CityDisplay city={displayCity} rawCity={rawCity} />
              )}
            </Text>
            <InlineStack gap="200">
              <Button
                size="micro"
                onClick={() => {
                  window.open(getShopifyOrderAdminUrl(shop, id), '_blank');
                }}
              >
                View in Shopify
              </Button>
              {selectedTab !== 2 && (
                <Button
                  size="micro"
                  onClick={() => {
                    handleEditCity(id, city);
                  }}
                >
                  Edit City
                </Button>
              )}
              <Button
                size="micro"
                tone="critical"
                onClick={() => {
                  handleRemoveOrder(id);
                }}
              >
                Remove
              </Button>
            </InlineStack>
          </InlineStack>
          
          {/* Local Delivery Checkbox - only show for confirmed orders tab, Sendit courier, and when city is Tanger */}
          {selectedTab === 0 && selectedCourier === 'sendit' && (() => {
            const currentCity = modifiedCities[id] || city || '';
            return isTangerCity(currentCity);
          })() && (
            <InlineStack gap="100" align="start">
              <Checkbox
                label="Local delivery"
                checked={localDeliveryOrders[id] !== undefined ? localDeliveryOrders[id] : true}
                onChange={(checked) => handleLocalDeliveryChange(id, checked)}
              />
            </InlineStack>
          )}
          
          <Text as="p" variant="bodyMd">
            <strong>Products:</strong> {safeJoin(skus)}
          </Text>
          
          {isTracked && (
            <div style={isUpdatedTracking ? { backgroundColor: '#E4F1F9', padding: '4px' } : {}}>
              <Text as="p" variant="bodyMd">
                <strong>Tracking:</strong> {trackingNumber}
              </Text>
            </div>
          )}
          
          {hasReferenceOrder && referenceOrder && (
            <div 
              style={{
                backgroundColor: '#F6F6F7',
                padding: '12px',
                borderRadius: '4px',
                marginTop: '8px'
              }}
            >
              <BlockStack gap="200">
                <Text as="h4" variant="headingSm">
                  Reference Order: {referenceOrder.name || ''}
                </Text>
                
                <InlineStack gap="200">
                  <Text as="span" variant="bodyMd">
                    <strong>Customer:</strong> {referenceOrder.customerName || 'Unknown'}
                  </Text>
                  <Text as="span" variant="bodyMd">
                    <strong>Status:</strong> {referenceOrder.financialStatus || ''}
                  </Text>
                  <Text as="span" variant="bodyMd">
                    <strong>Amount:</strong> {referenceOrder.totalPrice || ''}
                  </Text>
                </InlineStack>
                
                {referenceOrder.trackingNumber && (
                  <Text as="p" variant="bodyMd">
                    <strong>Tracking:</strong> {referenceOrder.trackingNumber}
                  </Text>
                )}
                
                <Text as="p" variant="bodyMd">
                  <strong>Products:</strong> {safeJoin(referenceOrder.skus) || 'No products'}
                </Text>
              </BlockStack>
            </div>
          )}
        </BlockStack>
      </ResourceItem>
    );
  };

  const tabs = [
    {
      id: 'confirmed-orders',
      content: 'Confirmed Orders',
      accessibilityLabel: 'Confirmed Orders',
      panelID: 'confirmed-orders-panel',
      badge: orders.length > 0 ? orders.length.toString() : undefined,
    },
    {
      id: 'exchange-orders',
      content: 'Sendit Exchange',
      accessibilityLabel: 'Exchange Orders',
      panelID: 'exchange-orders-panel',
      badge: exchangeOrders.length > 0 ? exchangeOrders.length.toString() : undefined,
    },
    {
      id: 'sheet-orders',
      content: 'Write to Sheets',
      accessibilityLabel: 'Sheet Orders',
      panelID: 'sheet-orders-panel',
      badge: sheetOrders.length > 0 ? sheetOrders.length.toString() : undefined,
    },
    {
      id: 'speedaf-tracking',
      content: 'Speedaf Tracking',
      accessibilityLabel: 'Speedaf Tracking',
      panelID: 'speedaf-tracking-panel',
      badge: speedafTrackingResults.length > 0 ? speedafTrackingResults.length.toString() : undefined,
    },
  ];

  const handleTabChange = (selectedTabIndex: number) => {
    setSelectedTab(selectedTabIndex);
  };

  // First, add the handleExchangeOrders function
  // Handle exchange orders function
  const handleExchangeOrders = async (writeToSheets: boolean = false) => {
    if (selectedExchangeOrders.length === 0) return;

    // Close the dialog
    setShowExchangeFulfillDialog(false);

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results = [];
    const failedOrders = [];
    
    try {
      // Process each order one by one using the direct API approach
      // Only Sendit is supported for exchanges
      // Step 1: Get shop and config directly - only need to do this once
      console.log("Getting shop and Sendit configuration");
      const shopResponse = await api.shopifyShop.findFirst();
      if (!shopResponse) {
        throw new Error("Shop not found");
      }
      
      const configResponse = await api.senditConfig.findFirst();
      
      if (!configResponse) {
        throw new Error("Sendit configuration not found");
      }
      
      // Step 2: Get auth token directly - only need to do this once
      console.log("Getting auth token for order exchange");
      const authResponse = await fetch('https://app.sendit.ma/api/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          public_key: configResponse.publicKey,
          secret_key: configResponse.secretKey
        })
      });
      
      const authData = await authResponse.json();
      if (!authData.success || !authData.data?.token) {
        throw new Error("Failed to authenticate with Sendit API");
      }
      
      const token = authData.data.token;
      
      // Initialize Google Sheets client for updating tracking numbers
      console.log("Initializing Google Sheets client for tracking updates");
      let sheets;
      let sheetConfig: any = null;
      
      try {
        // Get Google Sheet configuration
        sheetConfig = await api.googleSheetConfig.findFirst({
          filter: { shopId: { equals: shopResponse.id } }
        });
        
        if (!sheetConfig || !sheetConfig.spreadsheetId) {
          console.warn("Google Sheet configuration not found or invalid, skipping sheet updates");
        }
      } catch (configError) {
        console.error("Error loading Google Sheet configuration:", configError);
      }
      
      // Track results
      const results: { orderId: string; orderName: string; newTrackingCode: string }[] = [];
      
      // Process each order sequentially
      for (const orderId of selectedExchangeOrders) {
        try {
          console.log(`Processing exchange for order ${orderId}`);
          
          // Helper function to format address
          const formatAddress = (address: any) => {
            if (!address) return "";
            return [
              address.address1,
              address.address2,
              address.city,
              address.province,
              address.zip,
              address.country
            ]
              .filter(Boolean)
              .join(", ");
          };
          
          // Find the order in our already loaded orders array
          const orderItem = exchangeOrders.find(o => o.id === orderId);
          if (!orderItem) {
            throw new Error(`Order ${orderId} not found in loaded exchange orders`);
          }
          
          // Get full order details
          console.log(`Getting details for exchange order ${orderId}`);
          const apiAny = api as any;
          const cleanOrderId = String(orderId).replace(/\D/g, '');
          
          // If we don't have full order data yet, fetch it
          let orderData = orderItem;
          if (!orderItem.hasLoadedSKUs) {
            const orderExtractResult = await apiAny.extractOrderSKUs({
              orderId: cleanOrderId,
              shopId: shopResponse.id
            });
            
            if (!orderExtractResult?.success || !orderExtractResult?.order) {
              throw new Error(orderExtractResult?.error || "Failed to extract order details");
            }
            
            orderData = orderExtractResult.order;
          }
          
          // Check if we have a modified city for this order and use it instead
          let cityName;
          if (modifiedCities[orderId]) {
            cityName = modifiedCities[orderId];
            console.log(`Using modified city name for exchange order ${orderId}: ${cityName}`);
          } else {
            cityName = orderData.city || 
                      (orderData.shippingAddress ? orderData.shippingAddress.city : null);
          }
          
          if (!cityName) {
            throw new Error(`City name not found for exchange order ${orderId}`);
          }
          
          // Format the address
          const address = orderData.address || 
                         (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
          
          if (!address) {
            throw new Error(`Address not found for exchange order ${orderId}`);
          }
          
          // Format products - join SKUs into a comma-separated string
          const productsText = orderData.skus ? orderData.skus.join(", ") : 
                             (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
          
          // Customer name
          const customerName = orderData.customerName || 
                             (orderData.shippingAddress ? 
                              `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                              "Unknown");
          
          // Phone number
          const phoneNumber = orderData.phone || 
                             (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
          
          // Order reference
          const orderReference = orderData.name || orderData.id?.toString() || "";
          
          // Check for reference order with tracking code
          let referenceTrackingCode = "";
          
          // Check if there's a reference order linked to this order
          if (exchangeReferences[orderId] && exchangeReferences[orderId].trackingNumber) {
            referenceTrackingCode = exchangeReferences[orderId].trackingNumber;
            console.log(`Using reference order tracking code for exchange: ${referenceTrackingCode}`);
          } else {
            throw new Error(`No reference order with tracking number found for exchange order ${orderId}. Please use the "Exchange With" button to link a reference order first.`);
          }
          
          // Get district ID for city
          const districtId = await getSenditDistrictId(cityName, token);
          
          // Count the total quantity of all items (not just unique products)
          const totalQuantity = orderData.lineItems?.reduce((total: number, item: any) => {
            return total + (Number(item.quantity) || 0);
          }, 0) || 0;
          //Formatted Products Text                      
          const formattedProductsText = `${orderReference} | ${totalQuantity} | ${productsText}`;
          
          // Prepare the request data for exchange - use Sendit in the same way as confirmed orders
          const requestData = {
            pickup_district_id: "52", // Fixed value as specified in docs
            district_id: districtId, // Use dynamic district ID from API
            name: customerName,
            amount: orderData.totalPrice?.toString() || "0",
            address: address,
            phone: phoneNumber,
            comment: "",
            reference: orderReference,
            allow_open: 1, // Default values for bulk fulfillment
            allow_try: 0, // Changed from 1 to 0 as requested
            products_from_stock: 0,
            products: formattedProductsText,
            packaging_id: 1,
            option_exchange: 1, // Set to 1 for exchange
            delivery_exchange_id: referenceTrackingCode // Use reference order tracking code
          };
          
          // Send order creation request directly
          console.log(`Sending exchange request for order ${orderId}`, requestData);
          const SENDIT_API_URL = "https://app.sendit.ma/api/v1/deliveries";
          
          const response = await fetch(SENDIT_API_URL, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json",
              "Authorization": `Bearer ${token}`,
              "X-CSRF-TOKEN": ""
            },
            body: JSON.stringify(requestData)
          });
          
          const responseData = await response.json();
          console.log(`Exchange response for order ${orderId}:`, responseData);
          
          // Check if the request was successful
          if (responseData.success) {
            // Helper function to extract tracking code from different response formats
            const extractTrackingCode = (data: any): string => {
              if (!data) return "";
              
              // Check direct code field (primary for exchange orders)
              if (data.code) return data.code;
              
              // Check in delivery object
              if (data.delivery?.tracking_number) return data.delivery.tracking_number;
              if (data.delivery?.code) return data.delivery.code;
              
              // Check for tracking_number directly
              if (data.tracking_number) return data.tracking_number;
              
              // Recursive search in data object
              const searchForCode = (obj: any): string => {
                if (!obj || typeof obj !== 'object') return "";
                
                // Check for common tracking code field names
                const possibleFields = ['code', 'tracking_number', 'trackingNumber', 'tracking_code', 'trackingCode'];
                for (const field of possibleFields) {
                  if (obj[field] && typeof obj[field] === 'string') return obj[field];
                }
                
                // Search in nested objects
                for (const key in obj) {
                  if (typeof obj[key] === 'object') {
                    const found = searchForCode(obj[key]);
                    if (found) return found;
                  }
                }
                
                return "";
              };
              
              return searchForCode(data);
            };
            
            // Extract the new tracking number from the response
            const newTrackingCode = extractTrackingCode(responseData.data);
            
            // Log the tracking code extraction for debugging
            console.log(`Extracted tracking code for exchange order ${orderId}: ${newTrackingCode}`);
            
            if (!newTrackingCode) {
              console.warn(`No tracking number found in response for exchange order ${orderId}`);
              console.warn(`Response data:`, responseData.data);
            }
            
            // Add the result to our results array
            results.push({
              orderId,
              orderName: orderItem.name,
              newTrackingCode
            });
            
            // Update tracking number in Google Sheets
            if (newTrackingCode) {
              try {
                // Skip the update to Google Sheets to keep the reference tracking ID in column Y intact
                console.log(`Skipping Google Sheets update for order ${orderId} to preserve reference tracking in column Y`);
                
                // Create a Shopify fulfillment with the new tracking code
                try {
                  console.log(`Creating Shopify fulfillment for exchange order ${cleanOrderId} with tracking code ${newTrackingCode}`);
                  
                  // Use our existing function for fulfillment
                  const fulfillmentResult = await createOrderFulfillment({
                    shopId: shopResponse.id,
                    orderId: cleanOrderId,
                    trackingNumber: newTrackingCode,
                    trackingCompany: "Sendit",
                    notifyCustomer: false
                  });
                  
                  if (fulfillmentResult.success) {
                    console.log(`Successfully created Shopify fulfillment for exchange order ${orderId}`);
                  } else {
                    console.warn(`Failed to create Shopify fulfillment for exchange order ${orderId}: ${
                      'error' in fulfillmentResult ? fulfillmentResult.error : 'Unknown error'
                    }`);
                  }
                } catch (fulfillmentError) {
                  console.error(`Error creating Shopify fulfillment for exchange order ${orderId}:`, fulfillmentError);
                }
              } catch (sheetError) {
                console.error(`Error handling tracking for order ${orderId}:`, sheetError);
              }
            }
            
            // Store updated tracking ID for highlighting
            setUpdatedTrackingIds(prev => ({
        ...prev,
              [orderId]: newTrackingCode
            }));
            
            // Show toast message for successful exchange
            setToastProps({
              content: `Order ${orderItem.name} exchanged. New tracking ID: ${newTrackingCode}`,
              error: false
            });
            setToastActive(true);
            
            console.log(`Successfully created exchange for order ${orderId} with tracking code: ${newTrackingCode}`);
        } else {
            failedOrders.push({
              orderId,
              orderName: orderItem.name,
              error: responseData.message || "Unknown error from Sendit API"
            });
            
            console.error(`Failed to create exchange for order ${orderId}: ${responseData.message || "Unknown error"}`, 
              { apiResponse: responseData });
          }
        } catch (orderError) {
          console.error(`Error exchanging order ${orderId}:`, orderError);
          
          // Find the order item to get the name
          const orderItem = exchangeOrders.find(o => o.id === orderId);
          const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
          
          failedOrders.push({
            orderId,
            orderName,
            error: orderError instanceof Error ? orderError.message : String(orderError)
          });
        }
        
        // Add a short delay between orders to prevent API rate limiting
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      // Show results to the user
      if (results.length > 0) {
        const successMessage = `Successfully created exchanges for ${results.length} orders with Sendit.`;
        console.log(successMessage, { successfulOrders: results });
      }
      
      if (failedOrders.length > 0) {
        const errorMessages = failedOrders.map(order => 
          `${order.orderName}: ${order.error}`
        );
        const errorMessage = `Failed to create exchanges for ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
        console.error("Failed exchange orders:", failedOrders);
        
      setToastProps({
          content: errorMessage,
          error: true
      });
      setToastActive(true);
      }
      
      // If we got updated tracking numbers, add them to the locally cached orders
      if (results.length > 0 && exchangeOrders.length > 0) {
        setExchangeOrders(prev => 
          prev.map(order => {
            // Find if this order was updated
            const updatedResult = results.find(r => r.orderId === order.id);
            if (updatedResult) {
              // Update the tracking number in our local cache
              return {
                ...order,
                trackingNumber: updatedResult.newTrackingCode
              };
            }
            return order;
          })
        );
      }
      
      // Update writeOrder and autoWrite fields for successfully processed exchange orders
      if (results.length > 0) {
        console.log(`Updating writeOrder and autoWrite fields for ${results.length} successfully processed exchange orders`);

        const updatePromises = results.map(async (result) => {
          try {
            const cleanOrderId = String(result.orderId).replace(/\D/g, '');

            // Set writeOrder=true for all processed exchange orders
            // Set autoWrite=true only if user chose to write to sheets automatically
            const updateData = {
              writeOrder: true,
              autoWrite: writeToSheets
            };

            console.log(`Updating exchange order ${cleanOrderId} with:`, updateData);

            await api.shopifyOrder.update(cleanOrderId, updateData);

            console.log(`Successfully updated fields for exchange order ${cleanOrderId}`);
          } catch (updateError) {
            console.error(`Failed to update fields for exchange order ${result.orderId}:`, updateError);
            // Don't fail the whole process if field update fails
          }
        });

        // Wait for all field updates to complete
        await Promise.all(updatePromises);
        console.log(`Completed field updates for ${results.length} exchange orders`);

        // If user chose to write to sheets automatically, do it now
        if (writeToSheets && results.length > 0) {
          console.log(`User chose to write exchange orders to sheets automatically. Writing ${results.length} orders to Google Sheets now.`);

          try {
            // Collect the successfully processed exchange order IDs
            const processedOrderIds = results.map(result => result.orderId);
            console.log(`Processed exchange order IDs to write to sheets:`, processedOrderIds);

            // Wait for fulfillment webhooks to process and update tracking numbers
            console.log("Waiting 2.5 seconds for fulfillment webhooks to process and update tracking numbers...");

            // Show a temporary message to the user about the wait
            setToastProps({
              content: `Exchange orders processed successfully! Waiting for tracking numbers to update before writing to sheets...`,
              error: false
            });
            setToastActive(true);

            await new Promise(resolve => setTimeout(resolve, 2500));

            // Get the order data for these specific exchange orders (fresh data after fulfillment)
            const ordersToWrite = [];

            for (const orderId of processedOrderIds) {
              try {
                const cleanOrderId = String(orderId).replace(/\D/g, '');

                // Always fetch fresh order data after fulfillment to get updated tracking numbers
                console.log(`Fetching fresh data for exchange order ${cleanOrderId} after processing...`);
                const orderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: cleanOrderId,
                  shopId: shop?.id || ''
                });

                if (!orderExtractResult?.success || !orderExtractResult?.order) {
                  console.warn(`Failed to extract fresh data for exchange order ${orderId}:`, orderExtractResult?.error);
                  continue;
                }

                const orderData = orderExtractResult.order;
                console.log(`Fresh exchange order data for ${orderData.name}:`, {
                  fulfillmentStatus: orderData.fulfillmentStatus,
                  trackingNumber: orderData.trackingNumber,
                  hasTracking: !!orderData.trackingNumber
                });

                // For exchange orders, we need to get the reference order's tracking number
                let referenceTrackingNumber = '';

                // Find the exchange order in our loaded exchange orders to get reference order info
                const exchangeOrderItem = exchangeOrders.find(o => o.id === orderId);
                if (exchangeOrderItem && exchangeOrderItem.referenceOrderId) {
                  try {
                    console.log(`Getting reference order tracking for exchange order ${orderId}, reference: ${exchangeOrderItem.referenceOrderId}`);

                    // Extract reference order data to get its tracking number
                    const refOrderExtractResult = await (api as any).extractOrderSKUs({
                      orderId: String(exchangeOrderItem.referenceOrderId).replace(/\D/g, ''),
                      shopId: shop?.id || ''
                    });

                    if (refOrderExtractResult?.success && refOrderExtractResult?.order) {
                      referenceTrackingNumber = refOrderExtractResult.order.trackingNumber || '';
                      console.log(`Reference order tracking number: ${referenceTrackingNumber}`);
                    } else {
                      console.warn(`Failed to get reference order tracking for ${exchangeOrderItem.referenceOrderId}`);
                    }
                  } catch (refError) {
                    console.error(`Error getting reference order tracking:`, refError);
                  }
                }

                // Transform order data for batch write (including reference tracking)
                const transformedOrderData = {
                  id: orderData.id,
                  name: orderData.name,
                  customerName: orderData.customerName,
                  phone: orderData.phone,
                  originalCity: orderData.originalCity, // Include Original City from noteAttributes
                  address: orderData.address,
                  city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
                  rawCity: orderData.rawCity,
                  lineItems: orderData.lineItems?.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    sku: item.sku,
                    price: item.price
                  })) || [],
                  totalPrice: orderData.totalPrice,
                  displayFulfillmentStatus: orderData.fulfillmentStatus || "FULFILLED", // Use fresh status or fallback to FULFILLED
                  createdAt: orderData.createdAt,
                  tags: orderData.tags || [],
                  trackingNumber: formatTrackingNumberForSheets(orderData.id, orderData.trackingNumber || ''), // Fresh tracking number from fulfillment
                  referenceTrackingNumber: referenceTrackingNumber, // Reference order tracking for column Y
                  isExchangeOrder: true, // Flag to identify exchange orders for checkbox in column AA
                  isCancelled: orderData.isCancelled || false,
                  isDeleted: orderData.isDeleted || false,
                  isFulfillmentCancelled: orderData.isFulfillmentCancelled || false
                };

                ordersToWrite.push(transformedOrderData);
                console.log(`Added exchange order ${orderData.name} to batch write queue with reference tracking: ${referenceTrackingNumber}`);

              } catch (orderError) {
                console.error(`Error processing exchange order ${orderId} for batch write:`, orderError);
              }
            }

            // Write all exchange orders to Google Sheets in one batch
            if (ordersToWrite.length > 0) {
              console.log(`Writing ${ordersToWrite.length} exchange orders to Google Sheets via batch write`);

              const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
                ordersData: JSON.stringify(ordersToWrite),
                shopId: shop?.id || ''
              });

              if (batchWriteResult?.success) {
                console.log(`Successfully wrote ${ordersToWrite.length} exchange orders to Google Sheets automatically`, batchWriteResult);

                setToastProps({
                  content: `Successfully processed ${results.length} exchange orders and wrote them to Google Sheets automatically!`,
                  error: false
                });
                setToastActive(true);
              } else {
                console.error("Failed to write exchange orders to Google Sheets:", batchWriteResult?.error);

                setToastProps({
                  content: `Exchange orders processed successfully, but failed to write to Google Sheets: ${batchWriteResult?.error}`,
                  error: true
                });
                setToastActive(true);
              }
            } else {
              console.warn("No exchange orders could be processed for automatic writing to sheets");
            }

          } catch (autoWriteError) {
            console.error("Error during automatic write of exchange orders to sheets:", autoWriteError);

            setToastProps({
              content: `Exchange orders processed successfully, but automatic write to sheets failed: ${autoWriteError instanceof Error ? autoWriteError.message : String(autoWriteError)}`,
              error: true
            });
            setToastActive(true);
          }
        }
      }

      // Clear selections after processing
      setSelectedExchangeOrders([]);
    } catch (error) {
      console.error("Error processing exchanges:", error);
      setToastProps({
        content: `Error processing exchanges: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      setPreventRefresh(false); // Reset immediately to allow manual refresh
      
      // Refresh exchange orders once after all processing is complete, with a 2 second delay
      // This prevents multiple refreshes and ensures UI is updated after processing
      console.log("All exchange orders processed, scheduling refresh in 2 seconds");
      setTimeout(() => {
        console.log("Refreshing exchange orders list");
        fetchExchangeOrders();
        
        // Schedule another refresh after 10 seconds to make sure Shopify has updated the order status
        setTimeout(() => {
          console.log("Performing follow-up refresh of exchange orders");
          fetchExchangeOrders();
        }, 10000);
      }, 2000);
    }
  };

  // Function to show the fulfill confirmation dialog
  const showFulfillConfirmationDialog = () => {
    if (selectedConfirmedOrders.length === 0) return;
    setShowFulfillDialog(true);
  };

  // Function to show the exchange fulfill confirmation dialog
  const showExchangeFulfillConfirmationDialog = () => {
    if (selectedExchangeOrders.length === 0) return;
    setShowExchangeFulfillDialog(true);
  };

  // Function to handle removing order entries from Google Sheets
  const handleRemoveOrderFromSheets = async () => {
    if (!removeOrderName.trim()) {
      setToastProps({
        content: "Please enter one or more order names to remove",
        error: true
      });
      setToastActive(true);
      return;
    }

    if (!shop?.id) {
      setToastProps({
        content: "Shop information not available",
        error: true
      });
      setToastActive(true);
      return;
    }

    setRemoveOrderLoading(true);

    try {
      console.log(`Removing order ${removeOrderName} from Google Sheets...`);

      const result = await (api as any).removeOrderFromSheets({
        orderName: removeOrderName.trim(),
        shopId: shop.id
      });

      if (result?.success) {
        if (result.foundEntries) {
          setToastProps({
            content: result.message || `Successfully removed entries for order ${removeOrderName}`,
            error: false
          });
          setToastActive(true);

          // Clear the input field on success
          setRemoveOrderName('');

          console.log(`Successfully removed order ${removeOrderName} from sheets:`, result);
        } else {
          setToastProps({
            content: result.message || `No entries found for order ${removeOrderName}`,
            error: false
          });
          setToastActive(true);

          console.log(`No entries found for order ${removeOrderName}`);
        }
      } else {
        throw new Error(result?.error || "Failed to remove order from sheets");
      }

    } catch (error) {
      console.error("Error removing order from sheets:", error);

      setToastProps({
        content: `Failed to remove order ${removeOrderName}: ${error instanceof Error ? error.message : String(error)}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setRemoveOrderLoading(false);
    }
  };

  // Function to clear Speedaf tracking results
  const handleClearSpeedafResults = () => {
    setSpeedafTrackingResults([]);
    setSpeedafTrackingError(null);
  };

  // Function to handle writing Speedaf data to sheets
  const handleWriteSpeedafDataToSheets = async () => {
    if (!shop?.id) {
      setSpeedafTrackingError("Shop information not available");
      return;
    }

    if (!speedafTrackingResults || speedafTrackingResults.length === 0) {
      setToastProps({
        content: "No Speedaf tracking data available to write to sheets",
        error: true
      });
      setToastActive(true);
      return;
    }

    setSpeedafWritingToSheets(true);
    setSpeedafTrackingError(null);

    try {
      // Prepare tracking data for the sheets
      const trackingData = speedafTrackingResults.map(order => {
        // Extract the latest status from tracking data
        let latestStatus = '';

        if (order.trackingStatus && order.trackingStatus.tracks && order.trackingStatus.tracks.length > 0) {
          // Get the most recent track (first one, as they're usually sorted by time)
          const latestTrack = order.trackingStatus.tracks[0];
          latestStatus = latestTrack.action || latestTrack.actionDescription || '';
        }

        return {
          trackingNumber: order.trackingNumber,
          latestStatus: latestStatus
        };
      });

      console.log(`Writing ${trackingData.length} Speedaf tracking records to Google Sheets...`);

      const result = await (api as any).writeSpeedafDataToSheets({
        shopId: shop.id,
        trackingData: trackingData
      });

      if (result?.success) {
        setToastProps({
          content: result.message || `Successfully wrote Speedaf data to Google Sheets`,
          error: false
        });
        setToastActive(true);
      } else {
        throw new Error(result?.error || "Failed to write Speedaf data to sheets");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error writing Speedaf data to sheets:", errorMessage);
      setSpeedafTrackingError(errorMessage);

      setToastProps({
        content: `Failed to write Speedaf data to sheets: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setSpeedafWritingToSheets(false);
    }
  };

  // Function to handle Speedaf tracking
  const handleSpeedafTracking = async () => {
    if (!shop?.id) {
      setSpeedafTrackingError("Shop information not available");
      return;
    }

    setSpeedafTracking(true);
    setSpeedafTrackingError(null);
    setSpeedafTrackingResults([]);

    try {
      let startingOrderName: string;
      const orderCount = 10; // Fixed to 10 orders as per API limit

      if (speedafTrackingMode === '10') {
        // Get the latest order name to calculate the starting point for last 10 orders
        const latestOrderResult = await api.shopifyOrder.findFirst({
          select: { name: true },
          sort: [{ createdAt: "Descending" }]
        });

        if (!latestOrderResult?.name) {
          throw new Error("Could not find latest order to start tracking from");
        }

        // Extract the latest order number and calculate starting point for last 10 orders
        const latestOrderNumber = parseInt(latestOrderResult.name.replace(/\D/g, ''));
        const startingOrderNumber = Math.max(1, latestOrderNumber - 9); // Ensure we don't go below order #1
        startingOrderName = `#${startingOrderNumber}`;

        console.log(`Latest order: ${latestOrderResult.name} (${latestOrderNumber})`);
        console.log(`Tracking last 10 orders from: ${startingOrderName} to #${latestOrderNumber}`);
      } else {
        // Custom order name mode
        if (!speedafCustomOrderName.trim()) {
          throw new Error("Please enter an order name to start tracking from");
        }

        // Clean and format the order name
        let cleanOrderName = speedafCustomOrderName.trim();

        // Add # prefix if not present
        if (!cleanOrderName.startsWith('#')) {
          cleanOrderName = `#${cleanOrderName}`;
        }

        startingOrderName = cleanOrderName;
        console.log(`Tracking 10 orders starting from custom order: ${startingOrderName}`);
      }

      const result = await (api as any).trackSpeedafOrders({
        latestOrderName: startingOrderName,
        orderCount: orderCount
      });

      if (result?.success) {
        setSpeedafTrackingResults(result.orders || []);

        if (result.orders && result.orders.length > 0) {
          setToastProps({
            content: `Successfully tracked ${result.orders.length} Speedaf orders out of ${result.totalOrders} checked orders`,
            error: false
          });
        } else {
          // Calculate the ending order number for better user feedback
          const startingNumber = parseInt(startingOrderName.replace(/\D/g, ''));
          const endingNumber = startingNumber + orderCount - 1;

          setToastProps({
            content: `No Speedaf orders found in the range ${startingOrderName} - #${endingNumber} (${result.totalOrders} orders checked)`,
            error: false
          });
        }
        setToastActive(true);
      } else {
        throw new Error(result?.error || "Failed to track Speedaf orders");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("Error tracking Speedaf orders:", errorMessage);
      setSpeedafTrackingError(errorMessage);

      setToastProps({
        content: `Failed to track Speedaf orders: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setSpeedafTracking(false);
    }
  };



  // Function to handle the actual fulfillment after user confirms
  const handleFulfillOrders = async (writeToSheets: boolean = false) => {
    if (selectedConfirmedOrders.length === 0) return;

    // Close the dialog
    setShowFulfillDialog(false);

    // Set prevent refresh flag to avoid auto-refreshes
    setPreventRefresh(true);
    setFulfillLoading(true);
    const results = [];
    const failedOrders = [];
    
    try {
      // Process each order one by one using the direct API approach
      if (selectedCourier === 'sendit') {
        // Step 1: Get shop and config directly - only need to do this once
        console.log("Getting shop and Sendit configuration");
        const shopResponse = await api.shopifyShop.findFirst();
        if (!shopResponse) {
          throw new Error("Shop not found");
        }
        
        const configResponse = await api.senditConfig.findFirst();
        
        if (!configResponse) {
          throw new Error("Sendit configuration not found");
        }
        
        // Step 2: Get auth token directly - only need to do this once
        console.log("Getting auth token for order fulfillment");
        const authResponse = await fetch('https://app.sendit.ma/api/v1/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            public_key: configResponse.publicKey,
            secret_key: configResponse.secretKey
          })
        });
        
        const authData = await authResponse.json();
        if (!authData.success || !authData.data?.token) {
          throw new Error("Failed to authenticate with Sendit API");
        }
        
        const token = authData.data.token;
        
        // Process each order sequentially
        for (const orderId of selectedConfirmedOrders) {
          try {
            console.log(`Processing order ${orderId}`);
            
            // Helper function to format address
            const formatAddress = (address: any) => {
              if (!address) return "";
              return [
                address.address1,
                address.address2,
                address.city,
                address.province,
                address.zip,
                address.country
              ]
                .filter(Boolean)
                .join(", ");
            };
            
            // Find the order in our already loaded orders array
            const orderItem = orders.find(o => o.id === orderId);
            if (!orderItem) {
              throw new Error(`Order ${orderId} not found in loaded orders`);
            }
            
            // Get full order details
            console.log(`Getting details for order ${orderId}`);
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');
            
            // If we don't have full order data yet, fetch it
            let orderData = orderItem;
            if (!orderItem.hasLoadedSKUs) {
              const orderExtractResult = await apiAny.extractOrderSKUs({
                orderId: cleanOrderId,
                shopId: shopResponse.id
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                throw new Error(orderExtractResult?.error || "Failed to extract order details");
              }
              
              orderData = orderExtractResult.order;
            }
            
            // Check if we have a modified city for this order and use it instead
            let cityName;
            if (modifiedCities[orderId]) {
              cityName = modifiedCities[orderId];
              console.log(`Using modified city name for order ${orderId}: ${cityName}`);
            } else {
              cityName = orderData.city || 
                        (orderData.shippingAddress ? orderData.shippingAddress.city : null);
            }
            
            if (!cityName) {
              throw new Error(`City name not found for order ${orderId}`);
            }
            
            // Log to confirm city name is being used
            console.log(`City name for Speedaf order ${orderId}: ${cityName}`);
            
            // Format the address
            const address = orderData.address || 
                           (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
            
            if (!address) {
              throw new Error(`Address not found for order ${orderId}`);
            }
            
            // Format products - join SKUs into a comma-separated string
            const productsText = orderData.skus ? orderData.skus.join(", ") : 
                               (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
            
            // Customer name
            const customerName = orderData.customerName || 
                               (orderData.shippingAddress ? 
                                `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                                "Unknown");
            
            // Phone number
            const phoneNumber = orderData.phone || 
                               (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
            
            // Order reference
            const orderReference = orderData.name || orderData.id?.toString() || "";
            
            // Get district ID for the city
            console.log(`Getting district ID for city: ${cityName}`);
            const districtId = await getSenditDistrictId(cityName, token);
            
            // Count the total quantity of all items (not just unique products)
            const totalQuantity = orderData.lineItems?.reduce((total: number, item: any) => {
              return total + (Number(item.quantity) || 0);
            }, 0) || 0;
          //Formatted Products Text                      
          const formattedProductsText = `${orderReference} | ${totalQuantity} | ${productsText}`;
          
            // Prepare the request data
            const requestData = {
              pickup_district_id: "52", // Keep fixed value for pickup district
              district_id: districtId, // Now using dynamic district ID from API
              name: customerName,
              amount: orderData.totalPrice?.toString() || "0",
              address: address,
              phone: phoneNumber,
              comment: "",
              reference: orderReference,
              allow_open: 1, // Default values for bulk fulfillment
              allow_try: 0, // Changed from 1 to 0 as requested
              products_from_stock: 0,
              products: formattedProductsText,
              packaging_id: 1,
              option_exchange: 0,
              delivery_exchange_id: ""
            };
            
            // Send order creation request directly
            console.log(`Sending fulfillment request for order ${orderId}`, requestData);
            const SENDIT_API_URL = "https://app.sendit.ma/api/v1/deliveries";
            
            const response = await fetch(SENDIT_API_URL, {
              method: 'POST',
              headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "X-CSRF-TOKEN": ""
              },
              body: JSON.stringify(requestData)
            });
            
            const responseData = await response.json();
            console.log(`Fulfillment response for order ${orderId}:`, responseData);
            
            if (responseData.success && responseData.data) {
              // Extract tracking code from the response
              const trackingCode = responseData.data?.code;
              
              if (!trackingCode) {
                throw new Error(`Tracking code not found in response for order ${orderId}`);
              }
              
              // Now create a Shopify fulfillment with the tracking code using our new function
              try {
                console.log(`Creating Shopify fulfillment for order ${cleanOrderId} with tracking code ${trackingCode}`);
                
                // Use our new function for fulfillment
                const fulfillmentResult = await createOrderFulfillment({
                  shopId: shopResponse.id,
                  orderId: cleanOrderId,
                  trackingNumber: trackingCode,
                  trackingCompany: "Sendit",
                  notifyCustomer: false
                });
                
                // Check for success first
                if (!fulfillmentResult.success) {
                  // Check if this is an "already fulfilled" error, which we can treat as success
                  const errorMsg = 'error' in fulfillmentResult ? fulfillmentResult.error : 'Fulfillment creation failed';
                  
                  // Common errors that indicate the order is actually fulfilled
                  const falseErrorPatterns = [
                    /already been fulfilled/i,
                    /has already been marked as fulfilled/i,
                    /fulfillment service is not found/i,
                    /no fulfillment for given order id exists/i,
                    /no id was returned/i
                  ];
                  
                  // Check if this is a false error (already fulfilled)
                  const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                  
                  if (isFalseError) {
                    // This is a false error - the order is already fulfilled or similar
                    console.log(`Detected false error for order ${cleanOrderId}: ${errorMsg}`);
                    
                    // Add to results as success
                    results.push({
                      orderId,
                      orderName: orderItem.name,
                      trackingCode,
                      success: true,
                      note: "Order may have been fulfilled already"
                    });
                    
                    // Show toast message for successful fulfillment
                    setToastProps({
                      content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                      error: false
                    });
                    setToastActive(true);
                    
                    console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode} (despite error: ${errorMsg})`);
                  } else {
                    // This is a real error
                    throw new Error(errorMsg);
                  }
                } else {
                  // Normal success case
                  const fulfillmentId = (fulfillmentResult as FulfillmentSuccessResult).fulfillmentId;
                  
                  // Add success to results
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    fulfillmentId,
                    success: true
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                  
                  console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode}`);
                }
              } catch (fulfillmentError) {
                console.error(`Error creating Shopify fulfillment for order ${cleanOrderId}:`, fulfillmentError);
                
                // Check if we should treat this as a false error
                const errorMsg = fulfillmentError instanceof Error ? fulfillmentError.message : String(fulfillmentError);
                const falseErrorPatterns = [
                  /already been fulfilled/i,
                  /has already been marked as fulfilled/i,
                  /fulfillment service is not found/i,
                  /no fulfillment for given order id exists/i,
                  /no id was returned/i,
                  /fulfillment was created but no id was returned/i
                ];
                
                const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                
                if (isFalseError) {
                  // Treat this as success since the order is already fulfilled or similar
                  console.log(`Treating error as success for order ${cleanOrderId}: ${errorMsg}`);
                  
                  // Add to results as success
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    success: true,
                    note: "Order may have been fulfilled already"
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                } else {
                  // It's a genuine error
                  throw new Error(errorMsg);
                }
              }
            } else {
              failedOrders.push({
                orderId,
                orderName: orderItem.name,
                error: responseData.message || "Unknown error from Sendit API"
              });
              
              console.error(`Failed to fulfill order ${orderId}: ${responseData.message || "Unknown error"}`, 
                { apiResponse: responseData });
            }
          } catch (orderError) {
            console.error(`Error fulfilling order ${orderId}:`, orderError);
            
            // Find the order item to get the name
            const orderItem = orders.find(o => o.id === orderId);
            const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
            
            failedOrders.push({
              orderId,
              orderName,
              error: orderError instanceof Error ? orderError.message : String(orderError)
            });
          }
          
          // Add a short delay between orders to prevent API rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Show results to the user
        if (results.length > 0) {
          const successMessage = `Successfully fulfilled ${results.length} orders with Sendit.`;
          console.log(successMessage, { successfulOrders: results });
        }
        
        if (failedOrders.length > 0) {
          const errorMessages = failedOrders.map(order => 
            `${order.orderName}: ${order.error}`
          );
          const errorMessage = `Failed to fulfill ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
          console.error("Failed orders:", failedOrders);
          
          setToastProps({
            content: errorMessage,
            error: true
          });
          setToastActive(true);
        }
        console.log(`Successfully processed ${results.length} orders with Sendit`);
        // After fulfillment, clear selection
        setSelectedConfirmedOrders([]);
      } else if (selectedCourier === 'speedaf') {
        // Step 1: Get shop for Speedaf configuration
        console.log("Getting shop for Speedaf configuration");
        const shopResponse = await api.shopifyShop.findFirst();
        if (!shopResponse) {
          throw new Error("Shop not found");
        }
        
        const shopId = String(shopResponse.id).replace(/\D/g, '');
        
        // Get all Speedaf configs (following pattern from processSpeedafAPI.ts)
        console.log("Getting all Speedaf configs");
        const allConfigs = await api.speedafConfig.findMany();
        
        // Find matching config manually
        const speedafConfig = allConfigs.find((config: any) => 
          String(config.shopId) === String(shopResponse.id) || 
          (config.shop && String(config.shop.id) === String(shopResponse.id))
        );
        
        if (!speedafConfig) {
          throw new Error(`Speedaf configuration for shop ${shopResponse.id} not found`);
        }
        
        console.log("Found Speedaf config:", speedafConfig.id);
      
        // Process each order sequentially
        for (const orderId of selectedConfirmedOrders) {
          try {
            console.log(`Processing order ${orderId} with Speedaf`);
            
            // Helper function to format address (same as in Sendit flow)
            const formatAddress = (address: any) => {
              if (!address) return "";
              return [
                address.address1,
                address.address2,
                address.city,
                address.province,
                address.zip,
                address.country
              ]
                .filter(Boolean)
                .join(", ");
            };
            
            // Find the order in our already loaded orders array
            const orderItem = orders.find(o => o.id === orderId);
            if (!orderItem) {
              throw new Error(`Order ${orderId} not found in loaded orders`);
            }
            
            // Get full order details
            console.log(`Getting details for order ${orderId}`);
            const apiAny = api as any;
            const cleanOrderId = String(orderId).replace(/\D/g, '');
            
            // If we don't have full order data yet, fetch it
            let orderData = orderItem;
            if (!orderItem.hasLoadedSKUs) {
              const orderExtractResult = await apiAny.extractOrderSKUs({
                orderId: cleanOrderId,
                shopId: shopResponse.id
              });
              
              if (!orderExtractResult?.success || !orderExtractResult?.order) {
                throw new Error(orderExtractResult?.error || "Failed to extract order details");
              }
              
              orderData = orderExtractResult.order;
            }
            
            // Check if we have a modified city for this order and use it instead
            let cityName;
            if (modifiedCities[orderId]) {
              cityName = modifiedCities[orderId];
              console.log(`Using modified city name for order ${orderId}: ${cityName}`);
            } else {
              cityName = orderData.city || 
                       (orderData.shippingAddress ? orderData.shippingAddress.city : null);
            }
            
            if (!cityName) {
              throw new Error(`City name not found for order ${orderId}`);
            }
            
            // Log to confirm city name is being used
            console.log(`City name for Speedaf order ${orderId}: ${cityName}`);
            
            // Format the address
            const address = orderData.address || 
                          (orderData.shippingAddress ? formatAddress(orderData.shippingAddress) : "");
      
            if (!address) {
              throw new Error(`Address not found for order ${orderId}`);
            }
            
            // Format products - join SKUs into a comma-separated string
            const productsText = orderData.skus ? orderData.skus.join(", ") : 
                               (orderData.orderSkus ? orderData.orderSkus.join(", ") : "No products");
            
            // Customer name
            const customerName = orderData.customerName || 
                               (orderData.shippingAddress ? 
                                `${orderData.shippingAddress.firstName || ""} ${orderData.shippingAddress.lastName || ""}`.trim() : 
                                "Unknown");
            
            // Phone number
            const phoneNumber = orderData.phone || 
                               (orderData.shippingAddress ? orderData.shippingAddress.phone : "");
      
            // Order reference
            const orderReference = orderData.name || orderData.id?.toString() || "";
            
            // Calculate total quantity for Speedaf
            const totalQuantity = orderData.lineItems?.reduce((total: number, item: any) => {
              return total + (Number(item.quantity) || 0);
            }, 0) || 1; // Default to 1 if no items found
            
            // Parse city entry to get area, city and region
            const parsedCity = cityName ? parseSpeedafCityEntry(cityName) : { area: "", city: "", areaCode: "", cityCode: "" };
            
            // Prepare request data with explicit city name handling
      const requestData = {
              acceptAddress: address,
              acceptCityCode: parsedCity.cityCode, // Use the city code component
              acceptCityName: parsedCity.city, // Use the city component
        acceptCountryCode: "MA",
        acceptCountryName: "Morocco",
              acceptDistrictCode: parsedCity.areaCode, // Use the area code component
              acceptDistrictName: parsedCity.area, // Use the area component
              acceptMobile: phoneNumber,
              acceptName: customerName,
              acceptStreetName: "",
              codFee: orderData.totalPrice - 30|| 0,
        currencyType: "MAD",
              customOrderNo: orderReference,
              customerCode: speedafConfig.customerCode,
        changeLable: 0,
        deliveryType: "DE01",
        goodsQTY: 1,
              goodsWeight: 1, // 1 kg default
        insurePrice: 0,
        isAllowOpen: 1,
        itemList: [
          {
            battery: 0,
            blInsure: 0,
            currencyType: "MAD",
                  goodsName: productsText.substring(0, 100), // Limit to 100 chars
                  goodsNameDialect: "",
            goodsQTY: 1,
            goodsType: "IT01",
                  goodsValue: orderData.totalPrice || 0,
                  sku: productsText.substring(0, 50) // Limit to 50 chars
          }
        ],
        parcelCurrencyType: "MAD",
              //parcelHigh: 10,
        parcelLength: 30,
        parcelType: "PT01",
              //parcelVolume: 0.9,
              //parcelWeight: 500, // 0.5 kg default
              //parcelWidth: 20,
              parcelValue: orderData.totalPrice || 0,
              payMethod: "PA03",
              pickupCity: "Luxus", // Updated sender city
              pickupCountry: "Morocco",
              pickupDetailAddress: "Luxus", // Updated sender address
              pickupName: "Bambe.ma", // Updated sender name
              pickupPhone: "0664754433",
        pickupProvince: "Tanger-Tetouan-Al Hoceima",
        pickupType: 0,
        piece: 1,
        platformSource: "Bambe",
              //prePickUpTime: new Date().toISOString().split('T')[0] + " 10:00:00",
              remark: `Order ${orderReference}`,
              sendAddress: "Luxus", // Updated sender address
        sendCityCode: "MAC00036",      
        sendCityName: "Luxus", // Updated sender city
              sendCompanyName: "Bambe.ma", // Updated company name
        sendCountryCode: "MA",
        sendCountryName: "Morocco",
        sendDistrictCode: "MAA00369",
        sendDistrictName: "Luxus",
              //sendMail: "sender@example.ma",
              sendMobile: "0664754433", // Uncommented and updated
              sendName: "Bambe.ma", // Updated sender name
              sendPhone: "0664754433",
              //sendPostCode: "90000",
        sendProvinceCode: "MAR00012",
        sendProvinceName: "Tanger-Tetouan-Al Hoceima",
        shipType: "ST01",
              shippingFee: 30,
        transportType: "TT01",
              //warehouseCode: "TNG01"
      };
      
            // Log the final request data city fields for debugging
            console.log(`Speedaf API request city fields for order ${orderId}:`, {
              acceptCityName: requestData.acceptCityName,
              acceptDistrictName: requestData.acceptDistrictName
            });
            
            // Call the Speedaf API
            console.log(`Calling Speedaf API for order ${orderId}`);
            const speedafResult = await api.processSpeedafAPI({
              shopId: shopId,
              requestData: requestData,
              testMode: false // This is a real order
            });
            
            console.log(`Speedaf API result for order ${orderId}:`, speedafResult);
            
            // Fix the billCode extraction - check all possible paths in the response
            let trackingCode = null;
            
            if (speedafResult.success) {
              // Log more details about the response to help debug
              console.log("Speedaf success response structure:", {
                hasTrackingCode: !!speedafResult.trackingCode,
                hasDecryptedResponse: !!speedafResult.decryptedResponse,
                decryptedResponseType: speedafResult.decryptedResponse ? typeof speedafResult.decryptedResponse : 'undefined',
                decryptedResponseKeys: speedafResult.decryptedResponse ? Object.keys(speedafResult.decryptedResponse) : []
              });
              
              // Try all possible paths to find the tracking code
              if (speedafResult.trackingCode) {
                trackingCode = speedafResult.trackingCode;
                console.log(`Found trackingCode directly: ${trackingCode}`);
              } else if (speedafResult.decryptedResponse) {
                if (speedafResult.decryptedResponse.waybillCode) {
                  trackingCode = speedafResult.decryptedResponse.waybillCode;
                  console.log(`Found waybillCode in decryptedResponse: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.billCode) {
                  trackingCode = speedafResult.decryptedResponse.billCode;
                  console.log(`Found billCode in decryptedResponse: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.data && speedafResult.decryptedResponse.data.waybillCode) {
                  trackingCode = speedafResult.decryptedResponse.data.waybillCode;
                  console.log(`Found waybillCode in decryptedResponse.data: ${trackingCode}`);
                } else if (speedafResult.decryptedResponse.data && speedafResult.decryptedResponse.data.billCode) {
                  trackingCode = speedafResult.decryptedResponse.data.billCode;
                  console.log(`Found billCode in decryptedResponse.data: ${trackingCode}`);
                } else {
                  // If we can't find it in the known locations, search the entire object recursively
                  console.log("Searching entire response object for waybillCode or billCode");
                  const findCodeInObject = (obj: any): string | null => {
                    if (!obj || typeof obj !== 'object') return null;
                    
                    if (obj.waybillCode) return obj.waybillCode;
                    if (obj.billCode) return obj.billCode;
                    
                    for (const key in obj) {
                      if (typeof obj[key] === 'object') {
                        const found = findCodeInObject(obj[key]);
                        if (found) return found;
                      }
                    }
                    
                    return null;
                  };
                  
                  trackingCode = findCodeInObject(speedafResult.decryptedResponse);
                  if (trackingCode) {
                    console.log(`Found tracking code by searching object recursively: ${trackingCode}`);
                  }
                }
              }
              
              if (!trackingCode && speedafResult.rawResponse) {
                // Last resort - try to parse the raw response
                console.log("Checking rawResponse for tracking code");
                
                const findCodeInObject = (obj: any): string | null => {
                  if (!obj || typeof obj !== 'object') return null;
        
                  if (obj.waybillCode) return obj.waybillCode;
                  if (obj.billCode) return obj.billCode;
                  
                  for (const key in obj) {
                    if (typeof obj[key] === 'object') {
                      const found = findCodeInObject(obj[key]);
                      if (found) return found;
                    }
                  }
                  
                  return null;
                };
                
                trackingCode = findCodeInObject(speedafResult.rawResponse);
                if (trackingCode) {
                  console.log(`Found tracking code in rawResponse: ${trackingCode}`);
                }
              }
            }
            
            if (speedafResult.success && trackingCode) {
              // Now create a Shopify fulfillment with the tracking code
              try {
                console.log(`Creating Shopify fulfillment for order ${cleanOrderId} with tracking code ${trackingCode}`);
                
                // Use our existing function for fulfillment
                const fulfillmentResult = await createOrderFulfillment({
                  shopId: shopResponse.id,
                  orderId: cleanOrderId,
                  trackingNumber: trackingCode,
                  trackingCompany: "Speedaf",
                  notifyCustomer: false
                });
                
                // Check for success first
                if (!fulfillmentResult.success) {
                  // Check if this is an "already fulfilled" error, which we can treat as success
                  const errorMsg = 'error' in fulfillmentResult ? fulfillmentResult.error : 'Fulfillment creation failed';
                  
                  // Common errors that indicate the order is actually fulfilled
                  const falseErrorPatterns = [
                    /already been fulfilled/i,
                    /has already been marked as fulfilled/i,
                    /fulfillment service is not found/i,
                    /no fulfillment for given order id exists/i,
                    /no id was returned/i
                  ];
                  
                  // Check if this is a false error (already fulfilled)
                  const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                  
                  if (isFalseError) {
                    // This is a false error - the order is already fulfilled or similar
                    console.log(`Detected false error for order ${cleanOrderId}: ${errorMsg}`);
                    
                    // Add to results as success
                    results.push({
                      orderId,
                      orderName: orderItem.name,
                      trackingCode,
                      success: true,
                      note: "Order may have been fulfilled already"
                    });
                    
                    // Show toast message for successful fulfillment
          setToastProps({
                      content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
            error: false
          });
                    setToastActive(true);
                    
                    console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode} (despite error: ${errorMsg})`);
        } else {
                    // This is a real error
                    throw new Error(errorMsg);
                  }
                } else {
                  // Normal success case
                  const fulfillmentId = (fulfillmentResult as FulfillmentSuccessResult).fulfillmentId;
                  
                  // Add success to results
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    fulfillmentId,
                    success: true
                  });
                  
                  // Show toast message for successful fulfillment
          setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
                  setToastActive(true);
                  
                  console.log(`Successfully fulfilled order ${orderId} with tracking code: ${trackingCode}`);
                }
              } catch (fulfillmentError) {
                console.error(`Error creating Shopify fulfillment for order ${cleanOrderId}:`, fulfillmentError);
                
                // Check if we should treat this as a false error
                const errorMsg = fulfillmentError instanceof Error ? fulfillmentError.message : String(fulfillmentError);
                const falseErrorPatterns = [
                  /already been fulfilled/i,
                  /has already been marked as fulfilled/i,
                  /fulfillment service is not found/i,
                  /no fulfillment for given order id exists/i,
                  /no id was returned/i,
                  /fulfillment was created but no id was returned/i
                ];
                
                const isFalseError = falseErrorPatterns.some(pattern => pattern.test(errorMsg));
                
                if (isFalseError) {
                  // Treat this as success since the order is already fulfilled or similar
                  console.log(`Treating error as success for order ${cleanOrderId}: ${errorMsg}`);
                  
                  // Add to results as success
                  results.push({
                    orderId,
                    orderName: orderItem.name,
                    trackingCode,
                    success: true,
                    note: "Order may have been fulfilled already"
                  });
                  
                  // Show toast message for successful fulfillment
                  setToastProps({
                    content: `Order ${orderItem.name} fulfilled. Tracking ID: ${trackingCode}`,
                    error: false
                  });
        setToastActive(true);
                } else {
                  // It's a genuine error
                  throw new Error(errorMsg);
                }
              }
            } else {
              failedOrders.push({
                orderId,
                orderName: orderItem.name,
                error: speedafResult.error || "Unknown error from Speedaf API"
              });
              
              console.error(`Failed to fulfill order ${orderId} with Speedaf: ${speedafResult.error || "Unknown error"}`, 
                { apiResponse: speedafResult });
            }
          } catch (orderError) {
            console.error(`Error fulfilling order ${orderId} with Speedaf:`, orderError);
            
            // Find the order item to get the name
            const orderItem = orders.find(o => o.id === orderId);
            const orderName = orderItem ? orderItem.name : `Order ${orderId}`;
            
            failedOrders.push({
              orderId,
              orderName,
              error: orderError instanceof Error ? orderError.message : String(orderError)
            });
          }
          
          // Add a short delay between orders to prevent API rate limiting
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        
        // Show results to the user
        if (results.length > 0) {
          const successMessage = `Successfully fulfilled ${results.length} orders with Speedaf.`;
          console.log(successMessage, { successfulOrders: results });
        }
        
        if (failedOrders.length > 0) {
          const errorMessages = failedOrders.map(order => 
            `${order.orderName}: ${order.error}`
          );
          const errorMessage = `Failed to fulfill ${failedOrders.length} orders: ${errorMessages.join(', ')}`;
          console.error("Failed orders:", failedOrders);
          
        setToastProps({
            content: errorMessage,
          error: true
        });
        setToastActive(true);
        }
        console.log(`Successfully processed ${results.length} orders with Speedaf`);
        // After fulfillment, clear selection
        setSelectedConfirmedOrders([]);
      } else {
        // Handle other couriers or show message that the selected courier is not implemented
        setToastProps({
          content: `Fulfillment with ${selectedCourier} is not yet implemented.`,
          error: true
        });
        setToastActive(true);
      }
      
      // After fulfillment, clear selection
      setSelectedOrders([]);

      // Update writeOrder and autoWrite fields for successfully fulfilled orders
      if (results.length > 0) {
        console.log(`Updating writeOrder and autoWrite fields for ${results.length} successfully fulfilled orders`);

        const updatePromises = results.map(async (result) => {
          try {
            const cleanOrderId = String(result.orderId).replace(/\D/g, '');

            // Set writeOrder=true for all fulfilled orders
            // Set autoWrite=true only if user chose to write to sheets automatically
            const updateData = {
              writeOrder: true,
              autoWrite: writeToSheets
            };

            console.log(`Updating order ${cleanOrderId} with:`, updateData);

            await api.shopifyOrder.update(cleanOrderId, updateData);

            console.log(`Successfully updated fields for order ${cleanOrderId}`);
          } catch (updateError) {
            console.error(`Failed to update fields for order ${result.orderId}:`, updateError);
            // Don't fail the whole process if field update fails
          }
        });

        // Wait for all field updates to complete
        await Promise.all(updatePromises);
        console.log(`Completed field updates for ${results.length} orders`);

        // If user chose to write to sheets automatically, do it now
        if (writeToSheets && results.length > 0) {
          console.log(`User chose to write to sheets automatically. Writing ${results.length} orders to Google Sheets now.`);

          try {
            // Collect the successfully fulfilled order IDs
            const fulfilledOrderIds = results.map(result => result.orderId);
            console.log(`Fulfilled order IDs to write to sheets:`, fulfilledOrderIds);

            // Wait for fulfillment webhooks to process and update tracking numbers
            console.log("Waiting 2.5 seconds for fulfillment webhooks to process and update tracking numbers...");

            // Show a temporary message to the user about the wait
            setToastProps({
              content: `Waiting for tracking ID to update`,
              error: false
            });
            setToastActive(true);

            await new Promise(resolve => setTimeout(resolve, 2500));

            // Get the order data for these specific orders (fresh data after fulfillment)
            const ordersToWrite = [];

            for (const orderId of fulfilledOrderIds) {
              try {
                const cleanOrderId = String(orderId).replace(/\D/g, '');

                // Always fetch fresh order data after fulfillment to get updated tracking numbers
                console.log(`Fetching fresh data for order ${cleanOrderId} after fulfillment...`);
                const orderExtractResult = await (api as any).extractOrderSKUs({
                  orderId: cleanOrderId,
                  shopId: shop?.id || ''
                });

                if (!orderExtractResult?.success || !orderExtractResult?.order) {
                  console.warn(`Failed to extract fresh data for order ${orderId}:`, orderExtractResult?.error);
                  continue;
                }

                const orderData = orderExtractResult.order;
                console.log(`Fresh order data for ${orderData.name}:`, {
                  fulfillmentStatus: orderData.fulfillmentStatus,
                  trackingNumber: orderData.trackingNumber,
                  hasTracking: !!orderData.trackingNumber
                });

                // Transform order data for batch write
                const transformedOrderData = {
                  id: orderData.id,
                  name: orderData.name,
                  customerName: orderData.customerName,
                  phone: orderData.phone,
                  originalCity: orderData.originalCity, // Include Original City from noteAttributes
                  address: orderData.address,
                  city: formatCityForSheets(modifiedCities[orderData.id] || orderData.city || orderData.rawCity || '', selectedCourier), // Use modified city first, then recognized city, then raw city, standardized and formatted for sheets
                  rawCity: orderData.rawCity,
                  lineItems: orderData.lineItems?.map((item: any) => ({
                    name: item.name,
                    quantity: item.quantity,
                    sku: item.sku,
                    price: item.price
                  })) || [],
                  totalPrice: orderData.totalPrice,
                  displayFulfillmentStatus: orderData.fulfillmentStatus || "FULFILLED", // Use fresh status or fallback to FULFILLED
                  createdAt: orderData.createdAt,
                  tags: orderData.tags || [],
                  trackingNumber: formatTrackingNumberForSheets(orderData.id, orderData.trackingNumber || ''), // Fresh tracking number from fulfillment
                  isCancelled: orderData.isCancelled || false,
                  isDeleted: orderData.isDeleted || false,
                  isFulfillmentCancelled: orderData.isFulfillmentCancelled || false
                };

                ordersToWrite.push(transformedOrderData);
                console.log(`Added order ${orderData.name} to batch write queue`);

              } catch (orderError) {
                console.error(`Error processing order ${orderId} for batch write:`, orderError);
              }
            }

            // Write all orders to Google Sheets in one batch
            if (ordersToWrite.length > 0) {
              console.log(`Writing ${ordersToWrite.length} orders to Google Sheets via batch write`);

              const batchWriteResult = await (api as any).writeBatchOrdersToSheets({
                ordersData: JSON.stringify(ordersToWrite),
                shopId: shop?.id || ''
              });

              if (batchWriteResult?.success) {
                console.log(`Successfully wrote ${ordersToWrite.length} orders to Google Sheets`, batchWriteResult);

                setToastProps({
                  content: `Successfully wrote ${results.length} orders to Google Sheets`,
                  error: false
                });
                setToastActive(true);
              } else {
                console.error("Failed to write orders to Google Sheets:", batchWriteResult?.error);

                setToastProps({
                  content: `Orders fulfilled successfully, but failed to write to Google Sheets: ${batchWriteResult?.error}`,
                  error: true
                });
                setToastActive(true);
              }
            } else {
              console.warn("No orders could be processed for automatic writing to sheets");
            }

          } catch (autoWriteError) {
            console.error("Error during automatic write to sheets:", autoWriteError);

            setToastProps({
              content: `Orders fulfilled successfully, but automatic write to sheets failed: ${autoWriteError instanceof Error ? autoWriteError.message : String(autoWriteError)}`,
              error: true
            });
            setToastActive(true);
          }
        }
      }

    } catch (error) {
      console.error("Error fulfilling orders:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);

      setToastProps({
        content: `Error fulfilling orders: ${errorMessage}`,
        error: true
      });
      setToastActive(true);
    } finally {
      setFulfillLoading(false);
      setPreventRefresh(false); // Reset immediately to allow manual refresh
      
      // Refresh orders once after all processing is complete, with a 2 second delay
      console.log("All orders processed, scheduling refresh in 2 seconds");
      setTimeout(() => {
        console.log("Refreshing orders list");
        fetchOrders();
      }, 2000);
    }
  };

  // Fetch full order details when an order is selected
  const handleOrderSelect = async (id: string) => {
    // Simply select the order - all data is already loaded
    handleSelectOrder(id);
    
    // Debug: Log the order details
    const orderIndex = orders.findIndex(order => order.id === id);
    if (orderIndex !== -1) {
      console.log(`Order ${id} selected:`, orders[orderIndex]);
    }
  };

  // Handle reference order selection
  const handleReferenceOrderSelect = (value: string) => {
    setSelectedReferenceOrder(value);
    setReferenceOrderNumber(value);
  };

  // Filter reference orders based on search input
  const handleReferenceOrderSearch = (value: string) => {
    setReferenceOrderSearchValue(value);
    
    // If it looks like an order number, set it to be validated on submission
    if (value.match(/^#?\d+$/)) {
      setReferenceOrderNumber(value);
    }
  };

  // Handle manually entered order
  const handleFetchReferenceOrder = async () => {
    setReferenceOrderError(null);
    
    if (!currentExchangeOrderId || !shop) {
      setReferenceOrderError("Current exchange order not found");
      return;
    }
    
    // If a reference order is selected from dropdown, use that
    if (selectedReferenceOrder) {
      try {
        setLoadingReferenceOrder(true);
        
        // Get the order details
        const orderResponse = await api.extractOrderSKUs({
          orderId: selectedReferenceOrder,
          shopId: shop?.id || ''
        });
        
        if (!orderResponse?.success || !orderResponse?.order) {
          throw new Error(orderResponse?.error || "Failed to extract order details");
        }
        
        // Verify it has DH tracking
        if (!orderResponse.order.trackingNumber || !String(orderResponse.order.trackingNumber).startsWith("DH")) {
          throw new Error("Reference order must have a tracking code starting with DH");
        }
        
        // Store the reference order info
        setExchangeReferences(prev => ({
          ...prev,
          [currentExchangeOrderId]: orderResponse.order
        }));
        
        // Update in Google Sheets
        try {
          const targetOrderId = String(currentExchangeOrderId).replace(/\D/g, '');
          
          const sheetUpdateResponse = await api.updateReferenceTracking({
            orderId: targetOrderId,
            shopId: shop?.id || '',
            referenceTrackingCode: orderResponse.order.trackingNumber
          });
          
          if (sheetUpdateResponse?.success) {
            console.log(`Successfully updated tracking code in Google Sheets: ${sheetUpdateResponse.message}`);
          } else {
            console.warn(`Warning: Failed to update tracking in sheet: ${sheetUpdateResponse?.error || 'Unknown error'}`);
          }
        } catch (sheetError) {
          console.error(`Error updating tracking in sheet: ${sheetError instanceof Error ? sheetError.message : String(sheetError)}`);
        }
        
        // Close the modal
        setShowExchangeModal(false);
        setReferenceOrderNumber("");
        setSelectedReferenceOrder('');
        
        // Show success message
        setToastProps({
          content: `Successfully linked to reference order ${orderResponse.order.name}`,
          error: false
        });
        setToastActive(true);
      } catch (error) {
        console.error("Error processing selected reference order:", error);
        setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
      } finally {
        setLoadingReferenceOrder(false);
      }
      return;
    }
    
    // For manually entered order, need more validation
    if (!referenceOrderNumber) {
      setReferenceOrderError("Please enter or select a reference order");
      return;
    }
    
    try {
      setLoadingReferenceOrder(true);
      
      // Clean up the order number
      let orderName = referenceOrderNumber.trim();
      if (orderName.startsWith('#')) {
        orderName = orderName.substring(1);
      }
      
      if (!orderName) {
        throw new Error("Please enter a valid order name/number");
      }
      
      // First, find the current exchange order to get its phone
      const currentOrder = exchangeOrders.find(o => o.id === currentExchangeOrderId);
      if (!currentOrder) {
        throw new Error("Current exchange order not found");
      }
      
      const currentPhone = extractPhoneNumber(currentOrder);
      
      if (!currentPhone) {
        throw new Error("Current order doesn't have a phone number");
      }
      
      // Step 1: Search for the order by name
      const response = await api.shopifyOrder.findMany({
        filter: {
          name: { equals: `#${orderName}` }
        },
        first: 1
      });
      
      if (!response || response.length === 0) {
        throw new Error(`Order #${orderName} not found`);
      }
      
      // Step 2: Verify phone number matches
      const foundOrder = response[0];
      const foundPhone = extractPhoneNumber(foundOrder);
      
      if (!foundPhone || foundPhone !== currentPhone) {
        throw new Error(`Order #${orderName} has a different phone number`);
      }
      
      const orderId = String(foundOrder.id).replace(/\D/g, '');
      
      // Step 3: Get order details and verify tracking code
      const orderResponse = await api.extractOrderSKUs({
        orderId: orderId,
        shopId: shop?.id || ''
      });
      
      if (!orderResponse?.success || !orderResponse?.order) {
        throw new Error(orderResponse?.error || "Failed to extract order details");
      }
      
      // Verify it has DH tracking
      if (!orderResponse.order.trackingNumber || !String(orderResponse.order.trackingNumber).startsWith("DH")) {
        throw new Error("Reference order must have a tracking code starting with DH");
      }
      
      // Store the reference order info
      setExchangeReferences(prev => ({
              ...prev,
        [currentExchangeOrderId]: orderResponse.order
      }));
      
      // Update in Google Sheets
      try {
        const targetOrderId = String(currentExchangeOrderId).replace(/\D/g, '');
        
        const sheetUpdateResponse = await api.updateReferenceTracking({
          orderId: targetOrderId,
          shopId: shop?.id || '',
          referenceTrackingCode: orderResponse.order.trackingNumber
        });
        
        if (sheetUpdateResponse?.success) {
          console.log(`Successfully updated tracking code in Google Sheets: ${sheetUpdateResponse.message}`);
        } else {
          console.warn(`Warning: Failed to update tracking in sheet: ${sheetUpdateResponse?.error || 'Unknown error'}`);
        }
      } catch (sheetError) {
        console.error(`Error updating tracking in sheet: ${sheetError instanceof Error ? sheetError.message : String(sheetError)}`);
      }
      
      // Close the modal
      setShowExchangeModal(false);
      setReferenceOrderNumber("");
      setSelectedReferenceOrder('');
      
      // Show success message
        setToastProps({
        content: `Successfully linked to reference order ${orderResponse.order.name}`,
        error: false
        });
        setToastActive(true);
    } catch (error) {
      console.error("Error fetching reference order:", error);
      setReferenceOrderError(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoadingReferenceOrder(false);
    }
  };
  
  // Handle canceling the exchange modal
  const handleCancelExchange = () => {
    setShowExchangeModal(false);
    setReferenceOrderNumber("");
    setCurrentExchangeOrderId(null);
  };

  // Removed handleSyncOrders function - no longer needed

  // Function to parse a Speedaf city entry into area, city and region components
  const parseSpeedafCityEntry = (cityEntry: string): { area: string, city: string, areaCode: string, cityCode: string } => {
    const parts = cityEntry.split(', ');
    return {
      area: parts[0] || '',
      city: parts[1] || '',
      areaCode: parts[2] || '',
      cityCode: parts[3] || ''
    };
  };

  // Function to format city for Google Sheets based on selected courier
  const formatCityForSheets = (cityValue: string, courier: string): string => {
    if (!cityValue) return '';

    // For Speedaf, extract only the city name (second part after first comma)
    if (courier === 'speedaf') {
      const parsed = parseSpeedafCityEntry(cityValue);
      return parsed.city || cityValue; // Fallback to original if parsing fails
    }

    // For Sendit and others, use the city value as-is
    return cityValue;
  };

  return (
    <Frame>
      <Page>
        {/* Toast message */}
        {toastActive && (
          <Toast
            content={toastProps.content}
            error={toastProps.error}
            onDismiss={() => setToastActive(false)}
          />
        )}
        
        {/* Exchange reference order modal */}
        <ExchangeReferenceModal
          open={showExchangeModal}
          onClose={handleCancelExchange}
          onConfirm={handleFetchReferenceOrder}
          loading={loadingReferenceOrder}
          referenceOrdersLoading={referenceOrdersLoading}
          referenceOrderError={referenceOrderError}
          referenceOrderOptions={referenceOrderOptions}
          selectedReferenceOrder={selectedReferenceOrder}
          onReferenceOrderSelect={handleReferenceOrderSelect}
          referenceOrderSearchValue={referenceOrderSearchValue}
          onReferenceOrderSearch={handleReferenceOrderSearch}
        />
        
        {/* City editing modal */}
        <CityEditModal
          open={showCityModal}
          onClose={handleCancelCity}
          onSave={handleSaveCity}
          editingOrderId={editingOrderId}
          orders={orders}
          exchangeOrders={exchangeOrders}
          cityInputValue={cityInputValue}
          onCityInputChange={handleCityInputChange}
          selectedCourier={selectedCourier}
          filteredCities={filteredCities}
          isLoading={isLoading}
          onCitySelect={handleCitySelect}
          onClearSearch={() => setCityInputValue('')}
        />
        
        {/* Order removal confirmation modal */}
        <Modal
          open={showRemoveModal}
          onClose={handleCancelRemove}
          title="Remove Order"
          size="small"
          primaryAction={{
            content: 'Remove',
            onAction: handleConfirmRemove,
            destructive: true,
          }}
          secondaryActions={[
            {
              content: 'Cancel',
              onAction: handleCancelRemove,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Are you sure you want to remove this order from the list?
            </Text>
          </Modal.Section>
        </Modal>

        {/* Fulfill orders confirmation dialog */}
        <Modal
          open={showFulfillDialog}
          onClose={() => setShowFulfillDialog(false)}
          title="Fulfill Orders"
          size="small"
          primaryAction={{
            content: 'Yes, Write to Sheets',
            onAction: () => handleFulfillOrders(true),
            loading: fulfillLoading,
          }}
          secondaryActions={[
            {
              content: 'No, Just Fulfill',
              onAction: () => handleFulfillOrders(false),
              loading: fulfillLoading,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Do you want to automatically write fulfilled orders to your Google Sheets right now?
            </Text>
          </Modal.Section>
        </Modal>

        {/* Exchange fulfill orders confirmation dialog */}
        <Modal
          open={showExchangeFulfillDialog}
          onClose={() => setShowExchangeFulfillDialog(false)}
          title="Process Exchange Orders"
          size="small"
          primaryAction={{
            content: 'Yes, Write to Sheets',
            onAction: () => handleExchangeOrders(true),
            loading: fulfillLoading,
          }}
          secondaryActions={[
            {
              content: 'No, Just Fulfill',
              onAction: () => handleExchangeOrders(false),
              loading: fulfillLoading,
            },
          ]}
        >
          <Modal.Section>
            <Text as="p" variant="bodyMd" alignment="center">
              Do you want to automatically write fulfilled exchange orders to your Google Sheets right now?
            </Text>
          </Modal.Section>
        </Modal>
        
        <BlockStack gap="300">
          {/* Tabs */}
          <Tabs tabs={tabs} selected={selectedTab} onSelect={handleTabChange} />
          {selectedTab === 0 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Confirmed Orders Ready for Fulfillment
                      </Text>
                      <Button 
                        onClick={fetchOrders}
                        disabled={ordersFetching}
                        icon={ordersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {ordersFetching ? "Refreshing..." : "Refresh Orders"}
                      </Button>
                    </InlineStack>
                    
                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedConfirmedOrders.length ? `${selectedConfirmedOrders.length} orders selected` : 'Select orders to fulfill'}
                      </Text>
                      <InlineStack gap="200">
                        <Button 
                          onClick={handleSelectAllOrders}
                          disabled={orders.length === 0}
                        >
                          {getPaginatedOrders().every(order => selectedConfirmedOrders.includes(order.id)) ? 'Deselect All' : 'Select All'}
                        </Button>
                        <Select
                          label="Courier"
                          options={courierOptions}
                          value={selectedCourier}
                          onChange={handleCourierChange}
                          labelHidden
                        />
                        <Button 
                          disabled={
                            selectedConfirmedOrders.length === 0 || 
                            (selectedCourier === 'speedaf' && 
                             selectedConfirmedOrders.some(orderId => !modifiedCities[orderId]))
                          }
                          onClick={showFulfillConfirmationDialog}
                          loading={fulfillLoading}
                          variant="primary"
                        >
                          Fulfill Orders {selectedConfirmedOrders.length > 0 ? `(${selectedConfirmedOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>

                    {/* Add warning message below buttons, center-aligned */}
                    {selectedCourier === 'speedaf' && selectedConfirmedOrders.some(orderId => !modifiedCities[orderId]) && (
                      <div style={{ textAlign: 'center', marginTop: '5px' }}>
                        <Text as="strong" tone="critical" variant="bodySm">
                          Edit cities for all selected orders before fulfilling with Speedaf
                        </Text>
                      </div>
                    )}

                    {/* Order count display */}
                    {orders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(confirmedCurrentPage - 1) * confirmedPageSize + 1} - {Math.min(confirmedCurrentPage * confirmedPageSize, orders.length)} of {orders.length}
                      </Text>
                    )}
                    
                    {ordersError && (
                      <Banner tone="critical">
                        <p>Error loading orders: {ordersError.message}</p>
                      </Banner>
                    )}
                    
                    {ordersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading orders...</Text>
                        </div>
                      </div>
                    ) : orders && orders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                          items={getPaginatedOrders()}
                        renderItem={renderItem}
                      />
                        
                        {/* Pagination component */}
                        <OrderPagination
                          totalItems={orders.length}
                          pageSize={confirmedPageSize}
                          currentPage={confirmedCurrentPage}
                          onPageChange={handleConfirmedPageChange}
                        />
                      </>
                    ) : (
                      <EmptyState
                        heading="No orders to fulfill"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            No confirmed orders that need fulfillment were found.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            We're looking for orders with these tags:
                          </Text>
                          <ul style={{ listStylePosition: 'inside', textAlign: 'left', margin: 0, padding: 0 }}>
                            {CONFIRMATION_TAGS.map(tag => (
                              <li key={tag}>{tag}</li>
                            ))}
                          </ul>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : selectedTab === 1 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Sendit Exchange - Unfulfilled
                      </Text>
                      <Button
                        onClick={fetchExchangeOrders}
                        disabled={exchangeOrdersFetching}
                        icon={exchangeOrdersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {exchangeOrdersFetching ? "Refreshing..." : "Refresh Exchange Orders"}
                      </Button>
                    </InlineStack>
                    
                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedExchangeOrders.length ? `${selectedExchangeOrders.length} orders selected` : 'Select orders to exchange'}
                      </Text>
                      <InlineStack gap="200">
                        <Button 
                          onClick={handleSelectAllExchangeOrders}
                          disabled={exchangeOrders.length === 0}
                        >
                          {getPaginatedExchangeOrders().every(order => selectedExchangeOrders.includes(order.id)) ? 'Deselect All' : 'Select All'}
                        </Button>
                        <Button
                          disabled={selectedExchangeOrders.length === 0}
                          onClick={showExchangeFulfillConfirmationDialog}
                          loading={fulfillLoading}
                          variant="primary"
                        >
                          Process Exchanges {selectedExchangeOrders.length > 0 ? `(${selectedExchangeOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>
                    
                    {/* Order count display */}
                    {exchangeOrders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(exchangeCurrentPage - 1) * exchangePageSize + 1} - {Math.min(exchangeCurrentPage * exchangePageSize, exchangeOrders.length)} of {exchangeOrders.length}
                      </Text>
                    )}
                    
                    {exchangeOrdersError && (
                      <Banner tone="critical">
                        <p>Error loading exchange orders: {exchangeOrdersError.message}</p>
                      </Banner>
                    )}
                    
                    {exchangeOrdersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading exchange orders...</Text>
                        </div>
                      </div>
                    ) : exchangeOrders && exchangeOrders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                          items={getPaginatedExchangeOrders()}
                        renderItem={renderItem}
                      />
                        
                        {/* Pagination component */}
                        <OrderPagination
                          totalItems={exchangeOrders.length}
                          pageSize={exchangePageSize}
                          currentPage={exchangeCurrentPage}
                          onPageChange={handleExchangePageChange}
                        />
                      </>
                    ) : (
                      <EmptyState
                        heading="No Sendit exchange orders found"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            No Sendit exchange orders were found.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            Orders must have the "Echange" tag, be fulfilled, and have a tracking number starting with "DH".
                          </Text>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : selectedTab === 2 ? (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <InlineStack align="space-between">
                      <Text variant="headingLg" as="h2">
                        Orders to Write to Google Sheets
                      </Text>
                      <Button
                        onClick={fetchSheetOrders}
                        disabled={sheetOrdersFetching}
                        icon={sheetOrdersFetching ? undefined : RefreshIcon}
                        variant="primary"
                        tone="success"
                      >
                        {sheetOrdersFetching ? "Refreshing..." : "Refresh Sheet Orders"}
                      </Button>
                    </InlineStack>

                    <InlineStack align="space-between">
                      <Text variant="bodyMd" as="p">
                        {selectedSheetOrders.length ? `${selectedSheetOrders.length} orders selected` : 'Select orders to write to sheets'}
                      </Text>
                      <InlineStack gap="200">
                        <Button
                          onClick={handleSelectAllSheetOrders}
                          disabled={sheetOrders.length === 0}
                        >
                          {(() => {
                            const paginatedOrders = sheetOrders.slice(
                              (sheetCurrentPage - 1) * sheetPageSize,
                              sheetCurrentPage * sheetPageSize
                            );
                            return paginatedOrders.every(order => selectedSheetOrders.includes(order.id)) ? 'Deselect All' : 'Select All';
                          })()}
                        </Button>
                        <Button
                          disabled={selectedSheetOrders.length === 0}
                          onClick={handleWriteToSheets}
                          loading={fulfillLoading}
                          variant="primary"
                          icon={LogoGoogleIcon}
                        >
                          Write to Sheets {selectedSheetOrders.length > 0 ? `(${selectedSheetOrders.length})` : ''}
                        </Button>
                      </InlineStack>
                    </InlineStack>

                    {/* Order count display */}
                    {sheetOrders.length > 0 && (
                      <Text variant="bodyMd" as="p" alignment="center">
                        Showing orders {(sheetCurrentPage - 1) * sheetPageSize + 1} - {Math.min(sheetCurrentPage * sheetPageSize, sheetOrders.length)} of {sheetOrders.length}
                      </Text>
                    )}

                    {sheetOrdersError && (
                      <Banner tone="critical">
                        <p>Error loading sheet orders: {sheetOrdersError.message}</p>
                      </Banner>
                    )}

                    {sheetOrdersFetching ? (
                      <div style={{ padding: '40px', textAlign: 'center' }}>
                        <Spinner />
                        <div style={{ marginTop: '10px' }}>
                          <Text as="p" variant="bodyMd">Loading sheet orders...</Text>
                        </div>
                      </div>
                    ) : sheetOrders && sheetOrders.length > 0 ? (
                      <>
                      <ResourceList
                        resourceName={{ singular: 'order', plural: 'orders' }}
                        items={sheetOrders.slice(
                          (sheetCurrentPage - 1) * sheetPageSize,
                          sheetCurrentPage * sheetPageSize
                        )}
                        renderItem={renderItem}
                      />

                        {/* Pagination component */}
                        <OrderPagination
                          totalItems={sheetOrders.length}
                          pageSize={sheetPageSize}
                          currentPage={sheetCurrentPage}
                          onPageChange={setSheetCurrentPage}
                        />
                      </>
                    ) : (
                      <EmptyState
                        heading="No orders to write to sheets"
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                      >
                        <BlockStack gap="200">
                          <Text variant="bodyMd" as="p">
                            Only fulfilled orders which are not yet written to Google Sheets are displayed here.
                          </Text>
                          <Text variant="bodyMd" as="p">
                            .
                          </Text>
                        </BlockStack>
                      </EmptyState>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>

              {/* Remove Order Entries Section */}
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="300">
                    <Text variant="headingMd" as="h3">
                      Remove Orders from Sheets
                    </Text>

                    <Text variant="bodyMd" as="p">
                      Remove one or more orders from your Google Sheets.
                    </Text>

                    <TextField
                      label="Order Names"
                      value={removeOrderName}
                      onChange={setRemoveOrderName}
                      placeholder="#1234, #5678, 9999"
                      helpText="Enter order names separated by commas"
                      disabled={removeOrderLoading}
                      autoComplete="off"
                    />

                    <Button
                      onClick={handleRemoveOrderFromSheets}
                      loading={removeOrderLoading}
                      disabled={!removeOrderName.trim() || removeOrderLoading}
                      variant="primary"
                      tone="critical"
                    >
                      {removeOrderLoading ? "Removing..." : "Remove Orders"}
                    </Button>
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          ) : (
            <Layout>
              <Layout.Section>
                <Card padding="400">
                  <BlockStack gap="400">
                    <Text variant="headingLg" as="h2">
                      Speedaf Order Tracking
                    </Text>

                    <Text variant="bodyMd" as="p">
                      Track batch Speedaf orders and write them to Sheets
                    </Text>

                    <BlockStack gap="400">
                      <div>
                        <Text variant="headingMd" as="h4">
                          Select Tracking Mode
                        </Text>
                        <div style={{ marginTop: '12px', maxWidth: '300px' }}>
                          <Select
                            label="Tracking mode"
                            options={[
                              { label: 'Last 10 orders (ending at latest)', value: '10' },
                              { label: 'Custom starting order', value: 'custom' }
                            ]}
                            value={speedafTrackingMode}
                            onChange={(value) => {
                              setSpeedafTrackingMode(value as '10' | 'custom');
                            }}
                            disabled={speedafTracking}
                          />
                        </div>
                      </div>

                      {speedafTrackingMode === 'custom' && (
                        <div>
                          <Text variant="headingMd" as="h4">
                            Starting Order
                          </Text>
                          <div style={{ marginTop: '12px', maxWidth: '300px' }}>
                            <TextField
                              label="Order name or number"
                              value={speedafCustomOrderName}
                              onChange={setSpeedafCustomOrderName}
                              placeholder="e.g., 1234 or #1234"
                              helpText="10 orders starting from this order will be checked (e.g., 1234, 1235, 1236...)"
                              disabled={speedafTracking}
                              autoComplete="off"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <InlineStack gap="200" align="space-between">
                          <InlineStack gap="200">
                            <Button
                              onClick={handleSpeedafTracking}
                              loading={speedafTracking}
                              disabled={speedafTracking || speedafWritingToSheets}
                              variant="primary"
                              tone="success"
                            >
                              {speedafTracking ? "Tracking..." : "Track Speedaf Orders"}
                            </Button>

                            {speedafTrackingResults.length > 0 && (
                              <Button
                                onClick={handleClearSpeedafResults}
                                disabled={speedafTracking || speedafWritingToSheets}
                                variant="secondary"
                              >
                                Clear Results
                              </Button>
                            )}
                          </InlineStack>

                          {speedafTrackingResults.length > 0 && (
                            <Button
                              onClick={handleWriteSpeedafDataToSheets}
                              loading={speedafWritingToSheets}
                              disabled={speedafTracking || speedafWritingToSheets}
                              variant="primary"
                              icon={LogoGoogleIcon}
                            >
                              {speedafWritingToSheets ? "Writing..." : "Write Data to Sheets"}
                            </Button>
                          )}
                        </InlineStack>
                      </div>


                    </BlockStack>

                    {speedafTrackingError && (
                      <Banner tone="critical">
                        <p>Error: {speedafTrackingError}</p>
                      </Banner>
                    )}

                    {speedafTrackingResults.length > 0 && (
                      <div>
                        <Text variant="headingMd" as="h4" alignment="start">
                          Tracking Results ({speedafTrackingResults.length} orders)
                        </Text>

                        <div style={{ marginTop: '16px' }}>
                          <ResourceList
                            resourceName={{ singular: 'order', plural: 'orders' }}
                            items={speedafTrackingResults}
                            renderItem={(order: any) => (
                              <ResourceItem
                                id={order.id}
                                accessibilityLabel={`Order ${order.name}`}
                                onClick={() => {}}
                              >
                                <BlockStack gap="200">
                                  <InlineStack align="space-between">
                                    <Text variant="bodyMd" as="h5" fontWeight="semibold">
                                      {order.name}
                                    </Text>
                                    <Text variant="bodyMd" as="p" tone="subdued">
                                      {order.trackingNumber}
                                    </Text>
                                  </InlineStack>

                                  {order.error ? (
                                    <Text variant="bodyMd" as="p" tone="critical">
                                      {order.error}
                                    </Text>
                                  ) : order.trackingStatus ? (
                                    <BlockStack gap="100">
                                      {order.trackingStatus.tracks && order.trackingStatus.tracks.length > 0 ? (
                                        order.trackingStatus.tracks.slice(0, 3).map((track: any, index: number) => (
                                          <div key={index} style={{
                                            padding: '8px',
                                            backgroundColor: '#f6f6f7',
                                            borderRadius: '4px',
                                            fontSize: '12px'
                                          }}>
                                            <InlineStack align="space-between">
                                              <Text variant="bodyMd" as="p" fontWeight="medium">
                                                {track.actionDescription || track.actionName} {track.action && `(${track.action})`}
                                              </Text>
                                              <Text variant="bodyMd" as="p" tone="subdued">
                                                {track.time}
                                              </Text>
                                            </InlineStack>
                                            <Text variant="bodyMd" as="p" tone={track.action === '-2' ? 'critical' : 'subdued'}>
                                              {track.msgEng || track.message}
                                            </Text>
                                            {track.action === '-2' && (
                                              <Text variant="bodyMd" as="p" tone="critical" fontWeight="medium">
                                                ⚠️ Delivery Exception - Contact customer service
                                              </Text>
                                            )}
                                          </div>
                                        ))
                                      ) : (
                                        <Text variant="bodyMd" as="p" tone="subdued">
                                          No tracking events found
                                        </Text>
                                      )}
                                    </BlockStack>
                                  ) : (
                                    <Text variant="bodyMd" as="p" tone="subdued">
                                      No tracking data available
                                    </Text>
                                  )}
                                </BlockStack>
                              </ResourceItem>
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </BlockStack>
                </Card>
              </Layout.Section>
            </Layout>
          )}
        </BlockStack>

        {/* City color legend - only show in Confirmed Orders tab */}
        {selectedTab === 0 && (
          <div style={{ textAlign: 'center', margin: '15px 0', fontSize: '12px', color: '#637381' }}>
            <strong>City Colors:</strong>
            <span style={{ color: '#108043', marginLeft: '6px' }}>■ Original</span>
            <span style={{ color: '#c05717', marginLeft: '6px' }}>■ Matched</span>
            <span style={{ color: '#d82c0d', marginLeft: '6px' }}>■ Missing</span>
          </div>
        )}

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '10px 0', color: '#637381', fontSize: '14px' }}>
          Designed by Scrptble in Pakistan
        </div>
      </Page>
    </Frame>
  );
};

export default IndexPage;
