# Bambe CRM App

A comprehensive Shopify CRM application built on Gadget.dev that automates order management, Google Sheets synchronization, returns processing, and Moroccan courier fulfillment using Sendit and Speedaf courier services.

## 🚀 Key Features

### 📋 Order Management Dashboard
- **Three Main Tabs:**
  - **Confirmed Orders**: Orders ready for fulfillment with confirmation tags
  - **Sendit Exchange**: Exchange orders managed through Sendit courier
  - **Write to Sheets**: Orders pending Google Sheets synchronization

### 🚚 Multi-Courier Support
- **Sendit Integration**: Full API integration with authentication and order creation
- **Speedaf Integration**: Encrypted API communication with signature validation
- **Exchange Order Handling**: Automatic tracking code copying for exchange orders
- **Bulk Fulfillment**: Select multiple orders and fulfill with chosen courier
- **Order Tracking**: Automated tracking updates for Speedaf orders with status monitoring

### 📊 Google Sheets Integration
- **Automatic Sync**: Orders automatically sync to Google Sheets based on status
- **Smart Sheet Management**:
  - Pending orders → "Pending Orders" sheet
  - Confirmed orders → "Orders" sheet
  - Fulfilled orders → Updated with tracking information
- **Batch Operations**: Optimized batch writing for improved performance
- **Order Removal**: Remove specific orders from sheets by order number
- **Reference Tracking Updates**: Background updates for exchange order tracking codes

### 🔄 Returns & Refunds Management
- **Bulk Returns Processing**: Process multiple order returns simultaneously
- **Intelligent Refund Calculation**: Automated refund amount calculation based on line items
- **Line Item Selection**: Granular control over which items to return and quantities
- **Return Order Search**: Search and filter orders eligible for returns
- **Refund Reasons**: Customizable return reasons and documentation
- **Exchange Integration**: Special handling for exchange orders with reference tracking

### 🌍 Intelligent City Standardization
- **AI-Powered**: ChatGPT integration for Moroccan city name standardization
- **Multi-Language Support**: Handles Arabic, French, and English city names
- **Manual Override**: Edit city button for manual corrections when AI fails
- **Visual Indicators**: Color-coded city status (Original/Matched/Missing)
- **Fuzzy Matching**: Handles typos and spelling variations

### ⚙️ Configuration Management
- **Google Sheets Setup**: Easy spreadsheet ID and sheet name configuration
- **Sendit API**: Public/secret key management with connection testing
- **Speedaf API**: Secure configuration management (contact Scrptble team for changes)
- **Custom City Management**: Add and manage custom cities for courier services
- **Authentication Tracking**: Last authenticated timestamps for all service connections

## 🎯 Workflow

### Order Processing Flow
1. **Order Creation**: New orders appear in appropriate tab based on tags
2. **City Standardization**: AI automatically standardizes Moroccan city names
3. **Manual Review**: Edit cities if needed (required for Speedaf)
4. **Fulfillment**: Select courier and fulfill orders
5. **Tracking**: Tracking codes automatically added to Google Sheets
6. **Exchange Handling**: Exchange orders get special treatment with reference tracking

### Returns & Refunds Workflow
1. **Search Orders**: Use bulk order input or individual search to find returnable orders
2. **Select Items**: Choose specific line items and quantities for return
3. **Calculate Refunds**: System automatically calculates refund amounts including shipping
4. **Process Returns**: Bulk process multiple returns with comprehensive results
5. **Update Records**: Automatic updates to Shopify and Google Sheets

### Google Sheets Sync
- **Real-time Updates**: Orders sync immediately upon status changes
- **Smart Filtering**: Only relevant orders appear in each tab
- **Auto-Write Feature**: Optional automatic writing to sheets after fulfillment
- **Batch Processing**: Efficient bulk operations for large order volumes
- **Reference Updates**: Background tracking code updates for exchange orders

## 📱 User Interface

### Main Dashboard Features
- **Order Selection**: Checkbox selection with "Select All" functionality
- **Pagination**: Navigate through large order lists efficiently
- **Search & Filter**: Find specific orders quickly
- **Status Indicators**: Visual badges showing order counts per tab
- **Refresh Controls**: Manual refresh buttons for real-time updates

### Returns Processing Interface
- **Bulk Order Input**: Paste multiple order numbers for batch processing
- **Line Item Selector**: Visual interface for selecting return items and quantities
- **Return Confirmation**: Clear summary before processing returns
- **Results Dashboard**: Detailed results showing success/failure rates
- **Progress Tracking**: Real-time progress indicators during bulk operations

### Order Information Display
- **Customer Details**: Name, phone, address with formatted display
- **Order Items**: SKUs, quantities, and product information
- **Status Tracking**: Fulfillment status and tracking numbers
- **City Management**: Visual city standardization with edit capabilities
- **Exchange Indicators**: Special badges for exchange orders
- **Return Eligibility**: Visual indicators for returnable orders and items

## 🔧 Configuration

### Google Sheets Setup
1. Navigate to **Configuration** page
2. Enter your Google Spreadsheet ID
3. Configure sheet names (default: "Orders", "Inventory", "Pending Orders")
4. Test connection to verify setup

### Sendit Configuration
1. Go to **Configuration** → **Sendit Courier Setup**
2. Enter Public Key and Secret Key from Sendit dashboard
3. Click "Test and Connect" to verify credentials
4. Configuration is saved automatically upon successful connection

### Speedaf Configuration
**Note**: Speedaf is pre-configured for Bambe.ma
- Current configuration is managed by Scrptble team
- Contact Scrptble team for any Speedaf API credential changes
- Configuration includes: App Code, Secret Key, Customer Code, Platform Source

### Custom Cities Management
1. Access **Configuration** → **Custom Cities**
2. Add new cities for Sendit courier coverage
3. Manage existing custom city entries
4. Updates are automatically synchronized with courier services

## 🛠️ Technical Features

### Advanced Returns Processing
- **Refund Calculation Engine**: Intelligent calculation of refund amounts based on line items, quantities, and shipping
- **Bulk Returns Interface**: Process multiple order returns with granular item selection
- **Return Validation**: Comprehensive validation of return eligibility and quantities
- **Results Tracking**: Detailed success/failure reporting for bulk operations

### Performance Optimizations
- **Batch API Calls**: Multiple orders processed in single requests
- **Caching**: City standardization results cached for performance
- **Rate Limiting**: Proper handling of API rate limits
- **Error Handling**: Comprehensive error handling with user feedback
- **Background Processing**: Non-blocking operations for tracking updates

### Security & Reliability
- **Encrypted Communication**: Speedaf API uses DES encryption with secure key management
- **Secure Storage**: API credentials stored securely with timestamp tracking
- **Authentication**: Shopify app authentication required
- **Data Validation**: Ensures data integrity across all operations
- **Error Recovery**: Graceful handling of API failures and retries

### Integration Features
- **Shopify Order Sync**: Automated synchronization with Shopify orders
- **Google Sheets Real-time Updates**: Live updates to spreadsheets with batching optimization
- **Courier API Integration**: Direct integration with Sendit and Speedaf APIs
- **Tracking Automation**: Automated tracking number updates and status monitoring

## � Application Structure

### Main Navigation
- **Dashboard**: Order management with three tabs (Confirmed, Sendit Exchange, Write to Sheets)
- **Process Returns**: Comprehensive returns and refunds management interface
- **Configuration**: Settings for Google Sheets, Sendit, and Speedaf integration

### API Actions & Models
- **Order Management**: Create, update, fulfill, and track orders
- **Returns Processing**: Calculate refunds, process bulk returns, update tracking
- **Courier Integration**: Sendit and Speedaf API communication
- **City Standardization**: AI-powered Moroccan city name standardization
- **Google Sheets**: Batch writing, order sync, and reference tracking updates

### Background Services
- **Scheduled Order Sync**: Automated order synchronization
- **Tracking Updates**: Background tracking code updates for exchange orders
- **City Management**: Custom city list management for courier services
- **Error Monitoring**: Comprehensive logging and error tracking

## 🔄 Recent Updates & New Features

### Returns & Refunds System
- ✅ **New**: Bulk returns processing with line item selection
- ✅ **New**: Intelligent refund calculation engine
- ✅ **New**: Returns search and filtering capabilities
- ✅ **New**: Detailed processing results and reporting

### Enhanced Tracking
- ✅ **New**: Speedaf order tracking automation
- ✅ **New**: Reference tracking updates for exchange orders
- ✅ **New**: Background processing for tracking updates
- ✅ **New**: Tracking status monitoring and alerts

### Configuration Improvements
- ✅ **Enhanced**: Custom city management interface
- ✅ **Enhanced**: Authentication timestamp tracking
- ✅ **Enhanced**: Improved error handling and validation
- ✅ **Enhanced**: Better configuration testing and validation

### Performance & Reliability
- ✅ **New**: Batch processing for returns operations
- ✅ **Enhanced**: Optimized Google Sheets integration
- ✅ **Enhanced**: Improved error recovery mechanisms
- ✅ **New**: Real-time progress tracking for bulk operations
