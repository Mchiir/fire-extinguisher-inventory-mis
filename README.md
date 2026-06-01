# Fire Extinguisher Inventory MIS

![Node.js](https://img.shields.io/badge/Node.js-22+-339933?logo=node.js\&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react\&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-7+-47A248?logo=mongodb\&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker\&logoColor=white)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-blue)

A Fire Extinguisher Inventory Management Information System (MIS) designed to manage extinguisher inventory, client assignments, stock availability, maintenance schedules, expiry tracking, automated notifications, and operational reporting.

---

## Core Features

* User Authentication & Authorization
* Role-Based Access Control (RBAC)
* Fire Extinguisher Product Catalog
* Inventory Management
* Client Management
* Extinguisher Assignment Tracking
* Stock Monitoring
* Expiry Date Monitoring
* Maintenance Tracking
* Automated Reminder Notifications
* Inventory & Assignment Reports
* Public Product Catalog
* Swagger API Documentation

---

## Main Modules

* Authentication
* Users
* Products
* Inventory
* Clients
* Assignments
* Notifications
* Reports

---

## User Roles

### ADMIN

* Full system access

### INVENTORY_MANAGER

* Inventory management
* Product management
* Assignment management
* Reports

### SALES_OFFICER

* Client management
* Product catalog
* Assignments

### CLIENT

* Assigned extinguishers
* Expiry notifications
* Maintenance reminders

---

## Documentation

Project documentation is available in:

```text
/docs
```

### Included Documentation

| File               | Description                           |
| ------------------ | ------------------------------------- |
| architecture.md    | System architecture diagrams          |
| system-flow.md     | Assignment and notification workflows |
| database.md        | Entity relationship diagrams          |
| inventory-mis.dbml | Database schema source                |

### Visual Designs

* Architecture Diagram
* Service Communication Flow
* Assignment Lifecycle Flow
* Notification Workflow
* Database ER Diagram

---

## Running the System

Start all backend services:

```bash
docker compose up --build
```

Run in detached mode:

```bash
docker compose up -d --build
```

Stop services:

```bash
docker compose down
```

View logs:

```bash
docker compose logs -f
```

---

## Running the Frontend

```bash
cd frontend

pnpm install

pnpm run dev
```

Frontend:

```text
http://localhost:5173
```

Gateway:

```text
http://localhost:8080
```

---

## Reports

The system generates:

* Inventory Report
* Stock Level Report
* Assigned Extinguishers Report
* Expiring Extinguishers Report
* Expired Extinguishers Report
* Client Assignment Report

---

## Automated Processes

Scheduled jobs automatically:

* Detect expiring extinguishers
* Detect expired extinguishers
* Generate reminder notifications
* Update extinguisher statuses
* Produce periodic operational summaries