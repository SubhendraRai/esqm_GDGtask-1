# ESQM – ERP Student Query Manager

**University Workflow Optimization System | GDG On-Campus Task 1**

---

## 📝 Project Overview

**ESQM (ERP Student Query Manager)** is a streamlined web application designed to alleviate congestion at university ERP Cells. By digitizing the administrative query process, ESQM eliminates physical queues and empowers students to submit structured requests online, enabling ERP staff to manage submissions efficiently. This functional prototype leverages a clean UI, modular components, and browser-based local storage for smooth operation.

---

## 🚀 Core Objectives

- **Reduce physical crowding at the ERP Cell**
- **Provide students with a structured digital channel for submitting queries**
- **Enable staff to view, filter, and update requests efficiently**
- **Ensure transparency, traceability, and visibility of request progress**
- **Improve operational throughput with minimal infrastructure**

---

## ✨ Key Features

### 👨‍🎓 Student-Side

- **Student Login**
  - Simple, lightweight login screen (no backend authentication as per GDG rules).
  - Redirects to Student Dashboard.
  - *File:* `pages/Login.tsx`

- **Student Dashboard**
  - Displays available student actions.
  - Create new requests and view request history.
  - Requests stored securely in local storage.
  - *File:* `pages/StudentDashboard.tsx`

- **Create New ERP Request**
  - Structured submission form: Title, Description, Category.
  - Auto-generated Request ID and Timestamp.
  - Default Status: *Pending*.
  - Data saved instantly to Local Storage.
  - *File:* `pages/NewRequest.tsx`

### 🧑‍💼 Staff-Side

- **Staff Dashboard**
  - Lists all student requests.
  - Filter by category/status (Approved, In Progress, Resolved).
  - Update request statuses for effective tracking.
  - *File:* `pages/StaffDashboard.tsx`

---

## 🏗️ System Architecture

### 1. Modular Component Library

Reusable UI components for consistent and scalable design.

| Component      | Purpose                         |
|----------------|--------------------------------|
| Badge.tsx      | Display request status badges   |
| Button.tsx     | Styled action buttons           |
| Input.tsx      | Controlled form fields          |
| Layout.tsx     | Page structure and wrappers     |

*Folder:* `components/`

### 2. Local Storage Database

A lightweight, in-browser pseudo-backend.

- Save new requests
- Retrieve, filter by category/status
- Update statuses
- Data persists across refreshes

*File:* `services/storageService.ts`

---

## 📁 Project Structure

```
ESQM/
├── App.tsx
├── index.tsx
├── index.html
├── constants.ts
├── types.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
├── package-lock.json
├── metadata.json

├── components/
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Layout.tsx

├── pages/
│   ├── Login.tsx
│   ├── StudentDashboard.tsx
│   ├── StaffDashboard.tsx
│   └── NewRequest.tsx

└── services/
    └── storageService.ts
```

---

## 🔄 Workflow Summary

1. **Student logs in** → navigates to Student Dashboard.
2. **Student submits request** → stored in Local Storage.
3. **Staff Dashboard loads all requests** → staff filters and updates status.
4. **Students see updated status** → reduced need for in-person visits.

---

## ⚙️ Tech Stack

- **React + TypeScript**
- **Vite**
- **Local Storage API**
- **Modular UI Architecture**

---

## 📣 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📄 License

This project is for educational purposes as part of GDG On-Campus Task 1.
