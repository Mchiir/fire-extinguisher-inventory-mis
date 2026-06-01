# FIRE EXTINGUISHER INVENTORY MIS MICROSERVICES - MASTER GENERATION PROMPT

You are a senior full-stack engineer.

Generate a Fire Extinguisher Inventory Management Information System (Inventory MIS) using a simple, academic-friendly microservices architecture.

## Goal

Build quickly while maintaining:

* Simplicity
* Consistency
* Readability
* Maintainability
* Predictable structure

Avoid:

* DDD
* CQRS
* Event Sourcing
* Kafka
* RabbitMQ
* Hexagonal Architecture
* Overengineering

Use straightforward:

Route → Controller → Service → Model

---

## Tech Stack

### Backend

* Node.js (ES Modules)
* Express.js
* MongoDB
* Mongoose
* Joi
* JWT
* Refresh Tokens
* Swagger
* Winston
* node-cron
* pnpm

### Frontend

* React (Vite)
* React Router
* Fetch API
* TailwindCSS
* Lucide Icons
* React Hot Toast
* SweetAlert2

### Infrastructure

* Docker
* Docker Compose
* Nginx API Gateway

---

## Architecture

inventory-mis/

services/

* auth-service
* user-service
* product-service
* inventory-service
* client-service
* assignment-service
* notification-service
* report-service

gateway/
frontend/
docs/
docker-compose.yml

Use synchronous REST communication only.

No message brokers.

---

## Core Business Purpose

The company supplies fire extinguishers to clients.

The system must:

* Manage extinguisher inventory
* Track issued extinguishers
* Track expiry dates
* Monitor stock levels
* Manage clients
* Generate reports
* Automatically notify clients before extinguisher expiration
* Allow public viewing of available extinguisher products

---

## Roles

ADMIN
INVENTORY_MANAGER
SALES_OFFICER
CLIENT

### Permissions

ADMIN

* Full access

INVENTORY_MANAGER

* Inventory
* Products
* Assignments
* Reports

SALES_OFFICER

* Clients
* Product catalog
* Assignments

CLIENT

* View assigned extinguishers
* View notifications
* View public products

---

## Main Modules

1. Authentication
2. Users
3. Products
4. Inventory
5. Clients
6. Extinguisher Assignments
7. Notifications
8. Reports

---

## Main Entities

### User

* firstName
* lastName
* email
* phone
* password
* role
* tokenVersion

### Product

* name
* extinguisherType
* capacity
* description
* price
* manufacturer
* maintenanceInterval

### InventoryItem

* serialNumber
* productId
* manufacturingDate
* expiryDate
* status
* quantity

Status:

* IN_STOCK
* ASSIGNED
* EXPIRED
* UNDER_MAINTENANCE

### Client

* companyName
* contactPerson
* email
* phone
* address

### Assignment

* clientId
* inventoryItemId
* assignedAt
* returnDate
* status

Status:

* ACTIVE
* RETURNED
* EXPIRED

### Notification

* clientId
* assignmentId
* message
* sentAt
* status

Status:

* PENDING
* SENT
* FAILED

---

## Service Communication

Assignment Service
→ Client Service
→ Inventory Service

Validate client and extinguisher availability.

Notification Service
→ Assignment Service
→ Client Service

Send expiration reminders.

Report Service
→ Inventory Service
→ Assignment Service
→ Client Service

Generate reports.

Use Fetch API for internal service requests.

---

## Scheduled Jobs

Use node-cron.

Run automated jobs to:

* Check extinguishers nearing expiration
* Check extinguishers already expired
* Generate reminder notifications
* Update extinguisher statuses

Example intervals:

* Daily at 08:00
* Weekly summary reports

---

## Public Product Catalog

Expose public endpoints:

* GET /products
* GET /products/:id

Accessible without authentication.

Clients can:

* View extinguisher information
* View specifications
* View maintenance recommendations

---

## Nginx Gateway

Routes:

* /api/auth/*
* /api/users/*
* /api/products/*
* /api/inventory/*
* /api/clients/*
* /api/assignments/*
* /api/notifications/*
* /api/reports/*

Responsibilities:

* Routing
* CORS
* Header forwarding
* Cookie forwarding
* Single API entry point

---

## API Standards

Every resource supports:

* Create
* List
* Get By Id
* Update
* Delete

Use:

* Joi validation
* Global error handling
* Async handlers
* Consistent responses
* RBAC middleware

---

## Reports

Generate:

* Inventory Report
* Stock Level Report
* Assigned Extinguishers Report
* Expiring Extinguishers Report
* Expired Extinguishers Report
* Client Assignment Report

Report Service aggregates data from other services.

---

## Swagger

Each service exposes:

/api-docs

Document:

* Schemas
* Parameters
* Responses
* Security
* Examples

---

## Frontend Principles

Use:

* React Router
* Fetch API
* TailwindCSS
* Reusable components

Components:

* Modal
* Table
* FormInput
* ConfirmDialog
* Badge
* Loader
* Card
* Pagination
* ProtectedRoute

Notifications:

* toast.success()
* toast.error()

Confirmations:

* SweetAlert2

Never use:

* window.alert
* window.confirm

---

## Dashboards

ADMIN

* Total Products
* Total Inventory
* Assigned Extinguishers
* Expiring Soon
* Expired Units
* Total Clients

INVENTORY_MANAGER

* Current Stock
* Low Stock Alerts
* Maintenance Due
* Expiring Soon

SALES_OFFICER

* Total Clients
* Active Assignments
* Product Views

CLIENT

* Assigned Extinguishers
* Expiry Alerts
* Maintenance Reminders

---

## Coding Rules

* Feature-based organization
* Controller → Service → Model pattern
* Small files
* Reusable middleware
* Reusable UI components
* Functional approach
* Consistent naming
* Minimal abstractions
* Exam-friendly implementation

Generate the system incrementally, one service/module at a time, while preserving architectural consistency across all services and the frontend.
