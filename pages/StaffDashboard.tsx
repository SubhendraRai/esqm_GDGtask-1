import React, { useEffect, useState } from 'react';
import { RequestStatus, ServiceRequest } from '../types';
import { storageService } from '../services/storageService';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { CATEGORY_COLORS } from '../constants';

export const StaffDashboard: React.FC = () => {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [selectedReq, setSelectedReq] = useState<ServiceRequest | null>(null);
  const [filter, setFilter] = useState<'ALL' | RequestStatus>('ALL');
  
  // Action State
  const [actionNote, setActionNote] = useState('');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setRequests(storageService.getAllRequests());
  };

  const handleSelect = (req: ServiceRequest) => {
    setSelectedReq(req);
    setActionNote(req.staffNotes || ''); // Load existing notes if any
  };

  const handleUpdateStatus = (status: RequestStatus) => {
    if (!selectedReq) return;
    storageService.updateRequestStatus(selectedReq.id, status, actionNote);
    refreshData();
    setSelectedReq(null);
  };

  const filteredRequests = requests.filter(r => filter === 'ALL' || r.status === filter);

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Left: List View */}
        <div className={`${selectedReq ? 'hidden lg:flex' : 'flex'} flex-col w-full lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden`}>
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex gap-2 overflow-x-auto no-scrollbar">
                {['ALL', 'PENDING', 'IN_PROGRESS', 'ACTION_REQUIRED'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap transition-colors ${filter === f ? 'bg-blue-600 text-white shadow-sm' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
                    >
                        {f.replace('_', ' ')}
                    </button>
                ))}
            </div>
            
            <div className="overflow-y-auto flex-1 p-2 space-y-2">
                {filteredRequests.length === 0 ? (
                    <div className="p-8 text-center text-gray-400 text-sm">No requests found</div>
                ) : filteredRequests.map(req => (
                    <div 
                        key={req.id}
                        onClick={() => handleSelect(req)}
                        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${selectedReq?.id === req.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-100 bg-white hover:border-blue-300'}`}
                    >
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-mono text-xs text-gray-500 font-medium">#{req.queueNumber}</span>
                            <Badge status={req.status} />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm line-clamp-1">{req.subject}</h4>
                        <p className="text-xs text-gray-500 mt-1">{req.studentName}</p>
                        <div className="mt-2 flex gap-2 flex-wrap">
                             <span className={`text-[10px] px-1.5 py-0.5 rounded ${CATEGORY_COLORS[req.category]}`}>{req.category}</span>
                             {req.priority === 'HIGH' && <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-bold">HIGH PRIORITY</span>}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Right: Detail View */}
        <div className={`${selectedReq ? 'flex' : 'hidden lg:flex'} flex-col flex-1 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden`}>
            {selectedReq ? (
                <>
                    {/* Detail Header */}
                    <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                        <div>
                             <h3 className="text-lg font-bold text-gray-900">Request #{selectedReq.queueNumber}</h3>
                             <p className="text-xs text-gray-500">Submitted by <span className="font-medium text-gray-700">{selectedReq.studentName}</span> on {new Date(selectedReq.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="lg:hidden">
                            <Button variant="ghost" size="sm" onClick={() => setSelectedReq(null)}>Back</Button>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6">
                        {/* Request Content */}
                        <div className="grid grid-cols-1 gap-8">
                            {/* Student Data Section */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Subject</h4>
                                    <p className="text-gray-900 font-medium text-lg">{selectedReq.subject}</p>
                                </div>
                                
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-1">Description</h4>
                                    <div className="bg-gray-50 p-4 rounded-lg text-gray-800 text-sm leading-relaxed border border-gray-100">
                                        {selectedReq.description}
                                    </div>
                                </div>

                                {selectedReq.attachmentName && (
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Attachments</h4>
                                        <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg w-fit bg-gray-50">
                                            <div className="bg-red-100 text-red-600 p-2 rounded">
                                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium text-gray-700">{selectedReq.attachmentName}</span>
                                                <span className="text-xs text-gray-400">Attached Document</span>
                                            </div>
                                            <Button variant="ghost" size="sm" className="ml-2">Download</Button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <hr className="border-gray-100" />

                            {/* Staff Action Section */}
                            <div>
                                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-3">
                                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Response & Action
                                </h4>
                                <textarea
                                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px]"
                                    placeholder="Type your response to the student or internal notes here..."
                                    value={actionNote}
                                    onChange={e => setActionNote(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-gray-500 mt-2">This note will be visible to the student upon status update.</p>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex flex-wrap justify-end gap-3">
                        <Button variant="danger" onClick={() => handleUpdateStatus(RequestStatus.REJECTED)}>Reject Request</Button>
                        <Button variant="outline" onClick={() => handleUpdateStatus(RequestStatus.ACTION_REQUIRED)}>Request Info</Button>
                        <Button variant="secondary" onClick={() => handleUpdateStatus(RequestStatus.IN_PROGRESS)}>Mark In Progress</Button>
                        <Button variant="primary" onClick={() => handleUpdateStatus(RequestStatus.APPROVED)}>Resolve & Approve</Button>
                    </div>
                </>
            ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="font-medium">No request selected</p>
                    <p className="text-sm opacity-75">Select a request from the queue to view details.</p>
                </div>
            )}
        </div>
    </div>
  );
};