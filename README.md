ESQM – ERP Student Query Manager
University Workflow Optimization System | GDG On-Campus Task 1
1. Project Overview
ESQM (ERP Student Query Manager) is a streamlined web application built to reduce the heavy congestion students face at the university ERP Cell.
Instead of standing in long queues for simple administrative tasks, students can now submit structured queries online, and ERP staff can process them digitally.
This functional prototype uses a clean UI, modular components, and browser-based local storage.
2. Core Objectives
Reduce physical crowding at the ERP Cell.
Provide students with a structured digital channel for submitting queries.
Enable staff to view, filter, and update requests efficiently.
Ensure transparency, traceability, and visibility of request progress.
Improve operational throughput with minimal infrastructure.
3. Key Features
A. Student-Side Features
1. Student Login
Simple, lightweight login screen.
No backend authentication (in compliance with GDG rules).
Directs the student to the Student Dashboard.
File: pages/Login.tsx
2. Student Dashboard
Displays actions available to the student.
Allows creation of new requests.
Shows a list of previously submitted requests stored in local storage.
File: pages/StudentDashboard.tsx
3. Create New ERP Request
The student submits a structured request with fields:
Title
Description
Category (Attendance, Stage Booking, Event Permission, General Doubt, Miscellaneous)
Auto-generated Request ID
Timestamp
Default Status: Pending
All requests are saved in the browser’s Local Storage.
File: pages/NewRequest.tsx
B. Staff-Side Features
4. Staff Dashboard
Displays all student requests.
Filter requests by category or by status (Approved / In Progress / Resolved).
Update status of any request.
Provides a consolidated operational view.
File: pages/StaffDashboard.tsx
4. System Architecture
5. Modular Component Library
Reusable UI components for consistent and scalable design.
Component	Purpose
Badge.tsx	Shows request status badge
Button.tsx	Styled action buttons
Input.tsx	Controlled form fields
Layout.tsx	Page structure and wrapper
Folder: /components/
6. Local Storage Database
A lightweight in-browser storage system acting as a pseudo-backend.
Features:
Save new requests
Retrieve all requests
Filter by category
Filter by status
Update request status
Persist data across refreshes
File: services/storageService.ts
5. Project Structure
ESQM/
│── App.tsx
│── index.tsx
│── index.html
│── constants.ts
│── types.ts
│── vite.config.ts
│── tsconfig.json
│── package.json
│── package-lock.json
│── metadata.json
│
├── components/
│   ├── Badge.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   └── Layout.tsx
│
├── pages/
│   ├── Login.tsx
│   ├── StudentDashboard.tsx
│   ├── StaffDashboard.tsx
│   └── NewRequest.tsx
│
└── services/
    └── storageService.ts
   
7. Workflow Summary
Step 1: Student logs in → navigates to Student Dashboard.
Step 2: Student submits request → stored in Local Storage.
Step 3: Staff Dashboard loads all requests → staff filters and updates status.
Step 4: Students see updated status → reduced need for in-person visits.

8. Tech Stack
React + TypeScript
Vite
Local Storage API
Modular UI Architecture
