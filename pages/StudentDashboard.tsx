import React, { useEffect, useState } from 'react';
import { User, ServiceRequest } from '../types';
import { storageService } from '../services/storageService';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CATEGORY_COLORS } from '../constants';

interface StudentDashboardProps {
  user: User;
  onNewRequest: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onNewRequest }) => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);

  useEffect(() => {
    setRequests(storageService.getRequestsByStudent(user.id));
  }, [user.id]);

  return (
    <div className="space-y-6 relative">
        {/* Actions Bar */}
        <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div>
                <h3 className="font-semibold text-gray-800">Quick Actions</h3>
                <p className="text-sm text-gray-500">Manage your ERP interactions</p>
            </div>
            <Button onClick={onNewRequest} className="shadow-lg shadow-blue-500/20">
                <span className="mr-2">+</span> Raise Request
            </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: 'Total Requests', val: requests.length, color: 'bg-blue-50 text-blue-600' },
                { label: 'Pending', val: requests.filter(r => r.status === 'PENDING').length, color: 'bg-yellow-50 text-yellow-600' },
                { label: 'Completed', val: requests.filter(r => r.status === 'APPROVED' || r.status === 'REJECTED').length, color: 'bg-green-50 text-green-600' },
                { label: 'Action Needed', val: requests.filter(r => r.status === 'ACTION_REQUIRED').length, color: 'bg-red-50 text-red-600' },
            ].map((stat, i) => (
                <div key={i} className={`p-4 rounded-xl border border-gray-100 ${stat.color}`}>
                    <div className="text-2xl font-bold">{stat.val}</div>
                    <div className="text-xs font-medium uppercase tracking-wide opacity-80">{stat.label}</div>
                </div>
            ))}
        </div>

        {/* Recent Requests List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
                <h3 className="font-semibold text-gray-800">Your History</h3>
            </div>
            
            {requests.length === 0 ? (
                <div className="p-12 text-center text-gray-400">
                    <p>No requests found. Start by raising a new one.</p>
                </div>
            ) : (
                <div className="divide-y divide-gray-50">
                    {requests.map(req => (
                        <div 
                            key={req.id} 
                            onClick={() => setSelectedReq(req)}
                            className="p-6 hover:bg-gray-50 transition-colors flex flex-col sm:flex-row gap-4 sm:items-center cursor-pointer group"
                        >
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-1">
                                    <span className={`text-xs px-2 py-0.5 rounded font-medium ${CATEGORY_COLORS[req.category]}`}>
                                        {req.category}
                                    </span>
                                    <span className="text-xs text-gray-400">#{req.queueNumber}</span>
                                    <span className="text-xs text-gray-400">• {new Date(req.createdAt).toLocaleDateString()}</span>
                                </div>
                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{req.subject}</h4>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-1">{req.description}</p>
                            </div>
                            
                            <div className="flex items-center gap-4 min-w-max">
                                {req.staffNotes && (
                                    <div className="hidden md:block text-right">
                                        <p className="text-xs text-gray-500 mb-0.5">Staff Note</p>
                                        <p className="text-xs text-gray-800 font-medium max-w-[150px] truncate">{req.staffNotes}</p>
                                    </div>
                                )}
                                <Badge status={req.status} />
                                <div className="text-gray-300 group-hover:text-blue-500">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>

        {/* Request Detail Modal */}
        {selectedReq && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedReq(null)}></div>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-lg text-gray-900">Request Details</h3>
                                <span className="text-xs font-mono text-gray-500 bg-gray-200 px-1.5 py-0.5 rounded">#{selectedReq.queueNumber}</span>
                            </div>
                            <span className="text-xs text-gray-500">Last updated: {new Date(selectedReq.updatedAt).toLocaleString()}</span>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedReq(null)}>✕</Button>
                    </div>
                    
                    <div className="p-6 overflow-y-auto space-y-6">
                        {/* Status Section */}
                        <div className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-100">
                            <span className="text-sm font-medium text-gray-600">Current Status</span>
                            <Badge status={selectedReq.status} />
                        </div>

                        {/* Staff Notes - Prominent if exists */}
                        {selectedReq.staffNotes && (
                            <div className={`p-4 rounded-lg border ${selectedReq.status === 'ACTION_REQUIRED' ? 'bg-orange-50 border-orange-100' : 'bg-blue-50 border-blue-100'}`}>
                                <h4 className={`text-xs font-bold uppercase tracking-wide mb-2 ${selectedReq.status === 'ACTION_REQUIRED' ? 'text-orange-800' : 'text-blue-800'}`}>
                                    Message from Staff
                                </h4>
                                <p className="text-sm text-gray-800 leading-relaxed">{selectedReq.staffNotes}</p>
                            </div>
                        )}

                        {/* Request Details */}
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subject</h4>
                            <p className="text-gray-900 font-medium">{selectedReq.subject}</p>
                        </div>

                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</h4>
                            <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                                {selectedReq.description}
                            </div>
                        </div>

                        {selectedReq.attachmentName && (
                            <div>
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Attachment</h4>
                                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 px-3 py-2 rounded-lg inline-block">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                                    </svg>
                                    <span className="truncate max-w-[200px]">{selectedReq.attachmentName}</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
                        <Button variant="outline" onClick={() => setSelectedReq(null)}>Close</Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};