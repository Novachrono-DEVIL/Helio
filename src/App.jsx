import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import BasicInfoPage from './components/BasicInfoPage';
import Dashboard from './components/Dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  const handleAuthSuccess = (userData) => {
    setUser({ ...userData, id: Date.now().toString() });
    setCurrentPage('basicInfo');
  };

  const handleBasicInfoComplete = (basicInfo) => {
    if (user) {
      setUser({ ...user, ...basicInfo });
      setCurrentPage('dashboard');
    }
  };

  const handleAddMedicine = (medicine) => {
    setMedicines(prev => [...prev, medicine]);
  };

  const handleDeleteMedicine = (id) => {
    setMedicines(prev => prev.filter(med => med.id !== id));
  };

  const handleAddAppointment = (appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const handleDeleteAppointment = (id) => {
    setAppointments(prev => prev.filter(apt => apt.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {currentPage === 'welcome' && <WelcomePage onGetStarted={handleGetStarted} />}
      {currentPage === 'auth' && <AuthPage onAuthSuccess={handleAuthSuccess} />}
      {currentPage === 'basicInfo' && <BasicInfoPage onComplete={handleBasicInfoComplete} />}
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          medicines={medicines}
          appointments={appointments}
          onAddMedicine={handleAddMedicine}
          onDeleteMedicine={handleDeleteMedicine}
          onAddAppointment={handleAddAppointment}
          onDeleteAppointment={handleDeleteAppointment}
        />
      )}
    </div>
  );
}

export default App;