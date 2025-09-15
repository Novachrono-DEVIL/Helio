import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import AuthPage from './components/AuthPage';
import BasicInfoPage from './components/BasicInfoPage';
import Dashboard from './components/Dashboard';
import DoctorDashboard from './components/DoctorDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [appointmentSummaries, setAppointmentSummaries] = useState([]);

  const handleGetStarted = () => {
    setCurrentPage('auth');
  };

  // ✅ now handles new user vs existing user
  const handleAuthSuccess = (userData, isNewUser) => {
    setUser({ ...userData, id: Date.now().toString() });

    if (userData.userType === 'doctor') {
      setCurrentPage('doctorDashboard');
    } else {
      if (isNewUser) {
        setCurrentPage('basicInfo'); // only for new patient accounts
      } else {
        setCurrentPage('dashboard'); // existing patients → dashboard
      }
    }
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

  const handleSaveAppointmentSummary = (summary) => {
    setAppointmentSummaries(prev => [...prev, summary]);
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('welcome');
    setMedicines([]);
    setAppointments([]);
    setAppointmentSummaries([]);
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100">
      {currentPage === 'welcome' && <WelcomePage onGetStarted={handleGetStarted} />}
      {currentPage === 'auth' && <AuthPage onAuthSuccess={handleAuthSuccess} />}
      {currentPage === 'basicInfo' && <BasicInfoPage onComplete={handleBasicInfoComplete} />}
      {currentPage === 'doctorDashboard' && user && (
        <DoctorDashboard 
          user={user}
          linkedPatientCode={user.linkedPatientCode}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'dashboard' && user && (
        <Dashboard 
          user={user} 
          onUpdateUser={handleUpdateUser}
          medicines={medicines}
          appointments={appointments}
          appointmentSummaries={appointmentSummaries}
          onAddMedicine={handleAddMedicine}
          onDeleteMedicine={handleDeleteMedicine}
          onAddAppointment={handleAddAppointment}
          onDeleteAppointment={handleDeleteAppointment}
          onSaveAppointmentSummary={handleSaveAppointmentSummary}
        />
      )}
    </div>
  );
}

export default App;
