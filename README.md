# Bambe CRM App

A comprehensive Shopify CRM application that automates order management, Google Sheets synchronization, and Moroccan courier fulfillment using Sendit and Speedaf services.

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

### 📊 Google Sheets Integration
- **Automatic Sync**: Orders automatically sync to Google Sheets based on status
- **Smart Sheet Management**:
  - Pending orders → "Pending Orders" sheet
  - Confirmed orders → "Orders" sheet
  - Fulfilled orders → Updated with tracking information
- **Batch Operations**: Optimized batch writing for improved performance
- **Order Removal**: Remove specific orders from sheets by order number

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

## 🎯 Workflow

### Order Processing Flow
1. **Order Creation**: New orders appear in appropriate tab based on tags
2. **City Standardization**: AI automatically standardizes Moroccan city names
3. **Manual Review**: Edit cities if needed (required for Speedaf)
4. **Fulfillment**: Select courier and fulfill orders
5. **Tracking**: Tracking codes automatically added to Google Sheets
6. **Exchange Handling**: Exchange orders get special treatment with reference tracking

### Google Sheets Sync
- **Real-time Updates**: Orders sync immediately upon status changes
- **Smart Filtering**: Only relevant orders appear in each tab
- **Auto-Write Feature**: Optional automatic writing to sheets after fulfillment
- **Batch Processing**: Efficient bulk operations for large order volumes

## 📱 User Interface

### Dashboard Features
- **Order Selection**: Checkbox selection with "Select All" functionality
- **Pagination**: Navigate through large order lists efficiently
- **Search & Filter**: Find specific orders quickly
- **Status Indicators**: Visual badges showing order counts per tab
- **Refresh Controls**: Manual refresh buttons for real-time updates

### Order Information Display
- **Customer Details**: Name, phone, address with formatted display
- **Order Items**: SKUs, quantities, and product information
- **Status Tracking**: Fulfillment status and tracking numbers
- **City Management**: Visual city standardization with edit capabilities
- **Exchange Indicators**: Special badges for exchange orders

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

## 🛠️ Technical Features

### Performance Optimizations
- **Batch API Calls**: Multiple orders processed in single requests
- **Caching**: City standardization results cached for performance
- **Rate Limiting**: Proper handling of API rate limits
- **Error Handling**: Comprehensive error handling with user feedback

### Security
- **Encrypted Communication**: Speedaf API uses DES encryption
- **Secure Storage**: API credentials stored securely
- **Authentication**: Shopify app authentication required

### Data Management
- **Order Filtering**: Smart filtering based on tags and status
- **Duplicate Prevention**: Prevents duplicate entries in Google Sheets
- **Data Validation**: Ensures data integrity across all operations

## 📞 Support

For technical support or configuration changes:

**Scrptble Team:**
- **Arbaaz Murtaza**: [+92 320 1268955](https://wa.me/923201268955)
- **Safwan Adnan**: [+92 335 5191903](https://wa.me/923355191903)

---

*Designed by Scrptble in Pakistan*