import React, { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { NewRequest } from './pages/NewRequest';
import { storageService } from './services/storageService';
import { Role, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [view, setView] = useState<'DASHBOARD' | 'NEW_REQUEST'>('DASHBOARD');

  useEffect(() => {
    storageService.init();
    const currentUser = storageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleLogin = (userOrId: string | User) => {
    const loggedInUser = storageService.login(userOrId);
    if (loggedInUser) {
      setUser(loggedInUser);
      setView('DASHBOARD');
    }
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // Router Logic for Views
  const renderContent = () => {
    if (user.role === Role.STUDENT) {
      if (view === 'NEW_REQUEST') {
        return (
          <NewRequest 
            user={user} 
            onSuccess={() => setView('DASHBOARD')} 
            onCancel={() => setView('DASHBOARD')} 
          />
        );
      }
      return <StudentDashboard user={user} onNewRequest={() => setView('NEW_REQUEST')} />;
    }
    
    // Staff View
    return <StaffDashboard />;
  };

  const getTitle = () => {
    if (user.role === Role.STAFF) return "Request Queue";
    if (view === 'NEW_REQUEST') return "Create Request";
    return "My Dashboard";
  };

  return (
    <Layout user={user} onLogout={handleLogout} title={getTitle()}>
      {renderContent()}
    </Layout>
  );
}

export default App;