import { INITIAL_REQUESTS, MOCK_USERS } from "../constants";
import { RequestStatus, ServiceRequest, User } from "../types";

const STORAGE_KEYS = {
  REQUESTS: 'esqm_requests',
  USER: 'esqm_current_user',
};

export const storageService = {
  init: () => {
    if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
      localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
    }
  },

  getRequests: (): ServiceRequest[] => {
    const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
    return data ? JSON.parse(data) : [];
  },

  getRequestsByStudent: (studentId: string): ServiceRequest[] => {
    const all = storageService.getRequests();
    return all.filter(r => r.studentId === studentId).sort((a, b) => b.updatedAt - a.updatedAt);
  },

  getAllRequests: (): ServiceRequest[] => {
    const all = storageService.getRequests();
    return all.sort((a, b) => b.createdAt - a.createdAt);
  },

  addRequest: (req: Omit<ServiceRequest, 'id' | 'createdAt' | 'updatedAt' | 'queueNumber'>): ServiceRequest => {
    const all = storageService.getRequests();
    const newId = `req_${Date.now()}`;
    // Simple queue number generator
    const prefix = req.category.charAt(0).toUpperCase();
    const count = all.filter(r => r.category === req.category).length + 1;
    const queueNumber = `${prefix}-${100 + count}`;

    const newRequest: ServiceRequest = {
      ...req,
      id: newId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      queueNumber,
      status: RequestStatus.PENDING,
    };

    all.unshift(newRequest);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(all));
    return newRequest;
  },

  updateRequestStatus: (id: string, status: RequestStatus, notes?: string): ServiceRequest | null => {
    const all = storageService.getRequests();
    const index = all.findIndex(r => r.id === id);
    if (index === -1) return null;

    const updated = {
      ...all[index],
      status,
      staffNotes: notes ?? all[index].staffNotes,
      updatedAt: Date.now(),
    };

    all[index] = updated;
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(all));
    return updated;
  },

  login: (userOrId: string | User): User | undefined => {
    let user: User | undefined;
    
    if (typeof userOrId === 'string') {
        user = MOCK_USERS.find(u => u.id === userOrId);
    } else {
        user = userOrId;
    }

    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
    return user;
  },

  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  }
};