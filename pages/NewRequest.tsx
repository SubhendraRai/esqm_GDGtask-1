import React, { useState } from 'react';
import { User, RequestCategory, RequestStatus } from '../types';
import { Button } from '../components/Button';
import { Input, TextArea } from '../components/Input';
import { storageService } from '../services/storageService';
import { COMMON_PROBLEMS } from '../constants';

interface NewRequestProps {
  user: User;
  onSuccess: () => void;
  onCancel: () => void;
}

export const NewRequest: React.FC<NewRequestProps> = ({ user, onSuccess, onCancel }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    category: RequestCategory.ATTENDANCE,
    subject: '',
    description: '',
  });
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay
    await new Promise(r => setTimeout(r, 800));
    
    storageService.addRequest({
      studentId: user.id,
      studentName: user.name,
      category: formData.category,
      subject: formData.subject,
      description: formData.description,
      status: RequestStatus.PENDING,
      attachmentName: attachment?.name,
    });
    
    setIsSubmitting(false);
    onSuccess();
  };

  const currentCommonProblems = COMMON_PROBLEMS[formData.category];

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">New Service Request</h3>
              <p className="text-xs text-gray-500">Step {step} of 2: {step === 1 ? 'Select Category & Check Guidelines' : 'Request Details'}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onCancel}>
                ✕
            </Button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-1">
          <div 
            className="bg-blue-600 h-1 transition-all duration-300 ease-in-out" 
            style={{ width: step === 1 ? '50%' : '100%' }}
          ></div>
        </div>
        
        <div className="p-6">
          {step === 1 ? (
            /* STEP 1: Category Selection & Common Problems */
            <div className="space-y-6">
               <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Select Service Category</label>
                    <select
                        className="w-full rounded-lg border border-gray-300 px-3 py-3 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white shadow-sm"
                        value={formData.category}
                        onChange={e => setFormData({...formData, category: e.target.value as RequestCategory})}
                    >
                        {Object.values(RequestCategory).map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-blue-50 border border-blue-100 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5 text-blue-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-2">Before you proceed, please check:</h4>
                      <ul className="space-y-2">
                        {currentCommonProblems.map((problem, idx) => (
                          <li key={idx} className="text-sm text-blue-800 flex items-start gap-2">
                            <span className="block mt-1.5 w-1 h-1 bg-blue-400 rounded-full"></span>
                            <span>{problem}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                   <Button onClick={() => setStep(2)}>
                     My issue is not listed, Continue &rarr;
                   </Button>
                </div>
            </div>
          ) : (
            /* STEP 2: Form Details */
            <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
                <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100 flex items-center justify-between">
                       <div>
                         <span className="text-xs text-gray-500 uppercase tracking-wide font-bold">Selected Category</span>
                         <p className="text-sm font-semibold text-gray-800">{formData.category}</p>
                       </div>
                       <button type="button" onClick={() => setStep(1)} className="text-xs text-blue-600 hover:underline">Change</button>
                    </div>

                    <Input 
                        label="Subject" 
                        placeholder="Brief title (e.g., Attendance for CS101)"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                        required
                        autoFocus
                    />

                    <TextArea 
                        label="Description" 
                        placeholder="Describe your issue in detail include dates, room numbers, or faculty names if applicable..."
                        rows={5}
                        value={formData.description}
                        onChange={e => setFormData({...formData, description: e.target.value})}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Attachments (Optional)</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group relative">
                      <div className="space-y-1 text-center">
                        <svg className={`mx-auto h-12 w-12 transition-colors ${attachment ? 'text-blue-500' : 'text-gray-400 group-hover:text-blue-500'}`} stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <div className="flex text-sm text-gray-600 justify-center">
                          <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                            <span>{attachment ? attachment.name : 'Upload a file'}</span>
                            <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                          </label>
                          {!attachment && <p className="pl-1">or drag and drop</p>}
                        </div>
                        <p className="text-xs text-gray-500">{attachment ? 'File selected' : 'PNG, JPG, PDF up to 10MB'}</p>
                      </div>
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <Button variant="ghost" onClick={() => setStep(1)} type="button">
                      &larr; Back
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onCancel} type="button">Cancel</Button>
                        <Button variant="primary" type="submit" isLoading={isSubmitting}>Submit Request</Button>
                    </div>
                </div>
            </form>
          )}
        </div>
    </div>
  );
};