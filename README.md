A University Workflow Optimization System | GDG On-Campus Task 1
1. Project Overview
ESQM (ERP Student Query Manager) is a streamlined web application engineered to resolve a major operational challenge in universities: student crowding in front of the ERP Cell for routine administrative tasks.
The application enables students to route their queries directly to the correct ERP staff category, reducing queue congestion, improving throughput, and ensuring structured communication.
This system is built as a functional prototype using a clean UI architecture, modular components, and local storage–based workflows.
2. Core Objectives
Minimize physical rush at the ERP Cell.
Provide structured digital communication channels.
Route queries to the correct category-specific ERP staff member.
Improve operational efficiency for both students and staff.
Ensure transparency and traceability of submitted requests.
3. Key Features
A. Student-Side Functionalities
1. Student Login
Simple login screen for student identification.
No complex backend authentication to keep the prototype lightweight.
Navigation routing to the Student Dashboard.
File: pages/Login.tsx
2. Student Dashboard
Displays core actions available to students.
Primary function: raising new ERP-related requests.
Shows a list of student’s previously submitted requests (optional extended feature).
File: pages/StudentDashboard.tsx
3. New Request Creation
Students can create structured ERP requests by selecting a predefined category:
Attendance Management
Stage / Auditorium Booking
Event Permissions
General Student Doubts
Miscellaneous Queries
Each request includes:
Title / Summary
Detailed Description
Category Selection
Auto-generated Request ID
Timestamp
Status (default: Pending)
Once submitted, the request is stored in the browser’s local storage.
File: pages/NewRequest.tsx
B. Staff-Side Functionalities
1. Staff Dashboard
ERP staff members can:
View all incoming requests
Filter requests by category
Review request details
Mark requests as Approved, In Progress, or Resolved
The dashboard provides a consolidated operational view, helping staff process queries efficiently.
File: pages/StaffDashboard.tsx
C. System Architecture Features
1. Modular Component Framework
Reusable UI components ensure consistency and scalability.
Badge.tsx – Dynamic status/category badges
Button.tsx – Styled action buttons
Input.tsx – Controlled input fields
Layout.tsx – Layout wrapper for page structure
Files in: components/
2. Local Storage–Based Mini-Database
A lightweight storage service mimics backend functionality.
Capabilities include:
Saving new requests
Retrieving all requests
Filtering by category
Updating request status
Persisting state across sessions
File: services/storageService.ts
3. Gemini Service Stub
A placeholder service for future AI integration (not used due to Task-1 restrictions).
Included to demonstrate scalable structure.
Not active in final prototype.
File: services/geminiService.ts
4. Dynamic Routing & UX
index.tsx handles React rendering.
App.tsx manages route-level navigation across all screens.
4. Project Structure
ESQM/
│
├── App.tsx
├── index.tsx
├── index.html
├── constants.ts
├── types.ts
├── vite.config.ts
├── tsconfig.json
├── package.json
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
├── services/
│   ├── storageService.ts
│   └── geminiService.ts
│
└── metadata.json
5. Workflow Overview
Step 1: Student Logs In
Student enters basic credentials → routed to dashboard.
Step 2: Student Creates a Request
Fills in form
Selects category
Submits
Request stored in localStorage
Step 3: Staff Reviews Requests
Views requests on dashboard
Uses category filters
Updates statuses
Step 4: Students & Staff Enjoy Reduced ERP Congestion
The system eliminates physical queues and manual request handling.
6. Logic & Functionality
Local Storage Structure
{
  requestId: string,
  studentName: string,
  category: string,
  description: string,
  status: "Pending" | "In Progress" | "Resolved",
  createdAt: string
}
State Management
Pure React state
Local storage syncing
Stateless UI components for modularity
7. Tech Stack
Layer	Technology
Frontend	React + TypeScript
Build Tool	Vite
Styling	Inline + Component Styles
Routing	Lightweight custom routing inside App.tsx
Storage	Browser Local Storage
Architecture	Component-based, modular
