export enum Role {
  STUDENT = 'STUDENT',
  STAFF = 'STAFF',
}

export enum RequestStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  ACTION_REQUIRED = 'ACTION_REQUIRED',
}

export enum RequestCategory {
  ATTENDANCE = 'Attendance Correction',
  AUDITORIUM = 'Auditorium Booking',
  EVENT = 'Event Permission',
  DOUBTS = 'General Doubts',
  MISC = 'Miscellaneous',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string;
}

export interface ServiceRequest {
  id: string;
  studentId: string;
  studentName: string;
  category: RequestCategory;
  subject: string;
  description: string;
  status: RequestStatus;
  createdAt: number;
  updatedAt: number;
  queueNumber: string;
  staffNotes?: string;
  attachmentName?: string;
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
}