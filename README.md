# Shopify CRM App

## 🚀 Overview

**Shopify CRM App** is a full-featured CRM and automation platform for Shopify merchants, designed to streamline order management, automate shipping cost calculations, and simplify bulk returns and refunds. Built with modern technologies and deep Shopify API integration, this app demonstrates advanced backend logic, robust data models, and a beautiful React/Polaris-powered frontend. It features seamless courier integrations and robust API-driven automation for fulfillment and logistics.

---

## 🎯 Key Features

- **Automated Shipping Cost Calculation**
  - Accurately extracts shipping costs from Shopify orders using a custom formula.
  - Handles complex scenarios like free shipping, courier detection, and cost absorption.
  - Synchronizes backend and frontend logic for reliability.

- **Shipping Cost Absorption**
  - Automatically adjusts item prices for orders with zero shipping fees but courier delivery.
  - Ensures merchants can offer free shipping without losing revenue.
  - Integrates with Google Sheets for reporting and analytics.

- **Bulk Returns & Refunds**
  - Powerful bulk return interface for processing multiple orders at once.
  - Smart refund calculation, inventory-only returns, and error handling.
  - Detailed results and summary statistics for transparency.

- **Google Sheets Integration**
  - Securely connects to Google Sheets via service account.
  - Writes order, shipping, and return data for reporting and analysis.

- **Shopify API Integration**
  - Deep integration with Shopify Orders, Products, Fulfillments, Customers, and more.
  - Uses latest Shopify API scopes and best practices.

- **Courier Integrations**
  - Native integration with Sendit and Speedaf courier services for automated order fulfillment, tracking, and district/city mapping.
  - Real-time API communication for order creation, status updates, and delivery charge calculations.
  - Advanced logic for courier detection via tracking numbers and order tags.

- **API-Driven Automation**
  - Custom backend actions for shipping cost calculation, courier order creation, refund processing, and more.
  - Secure, scalable API architecture for seamless third-party integrations.

- **Modern Frontend**
  - Built with React, TypeScript, and Shopify Polaris for a beautiful, responsive UI.
  - Bulk order input, city standardization, error boundaries, and more.

---


## 🛠️ Technologies & APIs

- **Frontend:** React, TypeScript, Shopify Polaris, Vite
- **Backend:** Node.js, Gadget Framework
- **APIs:**
  - Shopify Admin API (GraphQL & REST)
  - Google Sheets API
  - Sendit Courier API
  - Speedaf Courier API
- **Data Models:** Orders, products, delivery charges, cities, customers, and more
- **Automation:** Scheduled jobs, webhook handlers, bulk actions

---

## 📦 Project Structure

- `api/` – Backend actions, jobs, models, services, and utilities
- `web/` – Frontend app, components, routes, services, and types
- `accessControl/` – Permissions and filters for secure access
- `settings.gadget.ts` – Shopify API scopes and app configuration
- `build.sh`, `vite.config.mts`, `tsconfig.json` – Build and config files

---


## 💡 Professional Value

- **Shopify Expertise:** Deep experience with Shopify API, app bridge, and merchant workflows
- **Courier Integrations:** End-to-end automation with Sendit and Speedaf for fulfillment, tracking, and delivery charge management
- **API Mastery:** Advanced backend actions for shipping, refunds, and logistics
- **Full-Stack Development:** From backend logic to beautiful frontend UIs
- **Automation & Integration:** Google Sheets, third-party APIs, and scalable architecture
- **Clean, Scalable Code:** TypeScript, strict linting, modular design

---


## 📞 Get In Touch

For custom Shopify apps, CRM solutions, courier integrations, or automation projects, reach out to discuss how this expertise can elevate your business.

---

## 🖼️ Screenshots & Demo

*Available on request. Ask for a live demo or code walkthrough!*

---

## 📚 Documentation

- [Shipping Cost Calculation Update](./SHIPPING_CALCULATION_UPDATE.md)
- [Shipping Cost Absorption Feature](./SHIPPING_COST_ABSORPTION.md)

---


## 🏷️ Contact

**Arbaaz Murtaza**  
Email: arbaaz.murtaza@gmail.com
