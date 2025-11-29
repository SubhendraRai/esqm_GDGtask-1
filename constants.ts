import { RequestCategory, RequestStatus, Role, ServiceRequest, User } from "./types";

export const MOCK_USERS: User[] = [
  {
    id: 'u_student_1',
    name: 'Rohan Sharma',
    email: 'rahul.s@galgotias.edu.in',
    role: Role.STUDENT,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan',
  },
  {
    id: 'u_staff_1',
    name: 'Dr. Anjali Gupta',
    email: 'anjali.g@galgotias.edu.in',
    role: Role.STAFF,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali',
  },
];

export const COMMON_PROBLEMS: Record<RequestCategory, string[]> = {
  [RequestCategory.ATTENDANCE]: [
    "Attendance is updated on iCloud ERP every 24 hours. Please wait 24h before raising a request.",
    "Medical certificates must be submitted to the Dean's office within 3 days of return.",
    "For 'On Duty' (OD) leave, ensure your faculty coordinator has signed the approval slip."
  ],
  [RequestCategory.AUDITORIUM]: [
    "Bookings must be made at least 7 days in advance.",
    "Audio/Visual equipment support requires a separate request to the IT Cell.",
    "Event approval letter from the Faculty Coordinator is mandatory for booking."
  ],
  [RequestCategory.EVENT]: [
    "Police permission copy is required for outdoor events with over 100 participants.",
    "Guest list (External) must be submitted 48 hours prior for main gate entry clearance.",
    "No loud music is allowed in academic blocks during class hours (9 AM - 5 PM)."
  ],
  [RequestCategory.DOUBTS]: [
    "Check the Student Handbook 2024 for standard academic regulations.",
    "Exam schedule queries should be directed to the Controller of Examination (COE) office.",
    "For scholarship queries, visit the Registrar Office, Block A, Ground Floor."
  ],
  [RequestCategory.MISC]: [
    "For ID card replacement, pay the fee at the accounts section first and attach the receipt.",
    "Wi-Fi credentials can be reset at the Server Room (B-Block, Room 202).",
    "Lost and Found items are collected at the Security Office, Main Gate."
  ]
};

export const INITIAL_REQUESTS: ServiceRequest[] = [
  {
    id: 'req_1',
    studentId: 'u_student_1',
    studentName: 'Rohan Sharma',
    category: RequestCategory.ATTENDANCE,
    subject: 'Attendance Correction for CSE-302',
    description: 'I was present for the Data Structures lecture on Oct 12th but marked absent in iCloud ERP. Please rectify.',
    status: RequestStatus.PENDING,
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000,
    queueNumber: 'A-101',
    priority: 'MEDIUM',
  },
  {
    id: 'req_2',
    studentId: 'u_student_1',
    studentName: 'Rohan Sharma',
    category: RequestCategory.AUDITORIUM,
    subject: 'C-Block Auditorium Booking',
    description: 'Requesting permission to use C-Block Auditorium for the Coding Club Hackathon orientation on Nov 5th.',
    status: RequestStatus.IN_PROGRESS,
    createdAt: Date.now() - 172800000, // 2 days ago
    updatedAt: Date.now() - 40000000,
    queueNumber: 'E-204',
    priority: 'HIGH',
  },
  {
    id: 'req_3',
    studentId: 'u_student_1',
    studentName: 'Rohan Sharma',
    category: RequestCategory.MISC,
    subject: 'Hostel Wi-Fi Issue',
    description: 'The Wi-Fi in Boys Hostel Block 2, Room 405 is not connecting since yesterday evening.',
    status: RequestStatus.APPROVED,
    createdAt: Date.now() - 432000000, // 5 days ago
    updatedAt: Date.now() - 300000000,
    queueNumber: 'M-098',
    priority: 'LOW',
    staffNotes: 'Reset the router configuration. Should be working now.',
  }
];

export const CATEGORY_COLORS: Record<RequestCategory, string> = {
  [RequestCategory.ATTENDANCE]: 'bg-blue-100 text-blue-800',
  [RequestCategory.AUDITORIUM]: 'bg-purple-100 text-purple-800',
  [RequestCategory.EVENT]: 'bg-green-100 text-green-800',
  [RequestCategory.DOUBTS]: 'bg-yellow-100 text-yellow-800',
  [RequestCategory.MISC]: 'bg-gray-100 text-gray-800',
};

export const STATUS_COLORS: Record<RequestStatus, string> = {
  [RequestStatus.PENDING]: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  [RequestStatus.IN_PROGRESS]: 'bg-blue-100 text-blue-700 border-blue-200',
  [RequestStatus.APPROVED]: 'bg-green-100 text-green-700 border-green-200',
  [RequestStatus.REJECTED]: 'bg-red-100 text-red-700 border-red-200',
  [RequestStatus.ACTION_REQUIRED]: 'bg-orange-100 text-orange-700 border-orange-200',
};