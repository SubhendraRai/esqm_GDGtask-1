import React, { useState } from 'react';
import { MOCK_USERS } from '../constants';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Role, User } from '../types';

interface LoginProps {
  onLogin: (userOrId: string | User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<Role>(Role.STUDENT);

  const handleCustomLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newUser: User = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email: `${name.toLowerCase().replace(/\s/g, '.')}@galgotias.edu.in`,
      role: role,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-blue-200 rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-red-200 rounded-full blur-[100px] opacity-20"></div>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden relative z-10 border border-gray-100">
        <div className="bg-white px-8 py-8 text-center border-b border-gray-100">
            <div className="mx-auto w-20 h-20 mb-4 flex items-center justify-center">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/2/2d/Galgotias_University_logo.png" 
                  alt="Galgotias University" 
                  className="w-full h-full object-contain"
                />
            </div>
            <h1 className="text-xl font-bold text-gray-900 uppercase font-serif tracking-wide">Galgotias University</h1>
            <p className="text-red-600 font-bold text-xs tracking-widest mt-1">ERP LOGIN PORTAL</p>
        </div>
        
        <div className="p-8 bg-gray-50/50">
          
          {/* Custom Login Form */}
          <form onSubmit={handleCustomLogin} className="mb-8 space-y-4">
            <Input 
              label="Full Name" 
              placeholder="Enter your name (e.g. John Doe)" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole(Role.STUDENT)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-all ${role === Role.STUDENT ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole(Role.STAFF)}
                  className={`flex items-center justify-center px-4 py-2 border rounded-lg text-sm font-medium transition-all ${role === Role.STAFF ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500' : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'}`}
                >
                  Staff Faculty
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={!name.trim()}>
              Login
            </Button>
          </form>

          {/* Divider */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-2 bg-gray-50 text-xs text-gray-500 uppercase tracking-wider">Or Quick Login</span>
            </div>
          </div>

          {/* Quick Select Users */}
          <div className="space-y-3">
            {MOCK_USERS.map((user) => (
              <div 
                key={user.id} 
                className="group relative bg-white border border-gray-200 rounded-lg p-3 hover:border-red-500 hover:shadow-md transition-all cursor-pointer flex items-center gap-3"
                onClick={() => onLogin(user.id)}
              >
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 group-hover:ring-2 ring-red-500 transition-all" />
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm group-hover:text-red-600 transition-colors">{user.name}</h3>
                  <p className="text-[10px] text-gray-500 capitalize">{user.role.toLowerCase()} Demo</p>
                </div>
                <div className="ml-auto">
                    <svg className="w-4 h-4 text-gray-300 group-hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-[10px] text-gray-400">
              © 2024 Galgotias University. All Rights Reserved.<br/>
              Developed by University ERP Cell.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};