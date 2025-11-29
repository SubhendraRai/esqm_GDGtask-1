import React from 'react';
import { STATUS_COLORS } from '../constants';
import { RequestStatus } from '../types';

export const Badge: React.FC<{ status: RequestStatus }> = ({ status }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_COLORS[status] || 'bg-gray-100 text-gray-800'}`}>
      {status.replace('_', ' ')}
    </span>
  );
};