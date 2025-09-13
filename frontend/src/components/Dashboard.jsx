import React, { useState } from 'react';
import { User, Pill, Calendar, MessageCircle, Shield, Clock, MapPin, Phone, Home, Info, Heart, Plus, Bell, FileText, Brain } from 'lucide-react';
import MedicineReminder from './MedicineReminder';
import AppointmentBooking from './AppointmentBooking';
import ProfileModal from './ProfileModal';
import ChatBot from './ChatBot';
import AboutModal from './AboutModal';
import MedicalRecordsModal from './MedicalRecordsModal';
import AppointmentSummaryModal from './AppointmentSummaryModal';

const Dashboard = ({ 
  user, 
  medicines, 
  appointments, 
  appointmentSummaries,
  onAddMedicine, 
  onDeleteMedicine,
  onAddAppointment,
  onDeleteAppointment,
  onSaveAppointmentSummary
}) => {
  const [showMedicineModal, setShowMedicineModal] = useState(false);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatBot, setShowChatBot] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showMedicalRecords, setShowMedicalRecords] = useState(false);
  const [showAppointmentSummary, setShowAppointmentSummary] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const getTodaysMedicines = () => {
    const today = new Date().toDateString();
    return medicines.filter(med => {
      const startDate = new Date(med.startDate).toDateString();
      return startDate <= today;
    });
  };

  const getUpcomingMedicine = () => {
    const now = new Date();
    const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const todaysMeds = getTodaysMedicines();
    
    for (const med of todaysMeds) {
      for (const time of med.times) {
        if (time > currentTime) {
          return { medicine: med, time };
        }
      }
    }
    return null;
  };

  const getUpcomingAppointment = () => {
    const now = new Date();
    const today = now.toDateString();
    
    return appointments
      .filter(apt => new Date(apt.date).toDateString() >= today)
      .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime())[0];
  };

  const upcomingMedicine = getUpcomingMedicine();
  const upcomingAppointment = getUpcomingAppointment();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Integrated Navigation Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-emerald-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            {/* Logo and Welcome */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-2.5 rounded-xl shadow-lg">
                  <Heart className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    Helio
                  </h1>
                  <p className="text-sm text-gray-600">Smart Health Assistant</p>
                </div>
              </div>
            </div>
            
            {/* Navigation and Profile */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {}}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium"
              >
                <Home className="w-5 h-5" />
                <span className="hidden sm:inline">Home</span>
              </button>
              <button
                onClick={() => setShowMedicalRecords(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium"
              >
                <FileText className="w-5 h-5" />
                <span className="hidden sm:inline">Records</span>
              </button>
              <button
                onClick={() => setShowAboutModal(true)}
                className="flex items-center space-x-2 px-4 py-2 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all duration-200 font-medium"
              >
                <Info className="w-5 h-5" />
                <span className="hidden sm:inline">About</span>
              </button>
              <button
                onClick={() => setShowProfileModal(true)}
                className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-semibold"
              >
                {user.name.charAt(0).toUpperCase()}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user.name.split(' ')[0]}! 👋
          </h2>
          <p className="text-lg text-gray-600">How are you feeling today?</p>
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-7xl mx-auto px-6 pb-6 space-y-8">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Today's Medicines</p>
                <p className="text-3xl font-bold text-emerald-600">{getTodaysMedicines().length}</p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Pill className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Appointments</p>
                <p className="text-3xl font-bold text-teal-600">{appointments ? appointments.length : 0}</p>
              </div>
              <div className="bg-teal-100 p-3 rounded-xl">
                <Calendar className="w-6 h-6 text-teal-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Reminder</p>
                <p className="text-lg font-semibold text-cyan-600">
                  {upcomingMedicine ? upcomingMedicine.time : 'None'}
                </p>
              </div>
              <div className="bg-cyan-100 p-3 rounded-xl">
                <Bell className="w-6 h-6 text-cyan-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Medicine Reminders Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-white">
                <Pill className="w-8 h-8 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Medicine Reminders</h2>
                  <p className="text-emerald-100">Manage your daily medications</p>
                </div>
              </div>
              <button
                onClick={() => setShowMedicineModal(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Medicine</span>
              </button>
            </div>
          </div>
          
          <div className="p-8">
            {getTodaysMedicines().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getTodaysMedicines().map((medicine) => (
                  <div key={medicine.id} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-emerald-600 p-2 rounded-lg">
                        <Pill className="w-5 h-5 text-white" />
                      </div>
                      <button
                        onClick={() => onDeleteMedicine(medicine.id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{medicine.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{medicine.dosage} • {medicine.frequency}</p>
                    <div className="flex flex-wrap gap-2">
                      {medicine.times.map((time, index) => (
                        <span key={index} className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Pill className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No medicines scheduled</h3>
                <p className="text-gray-600 mb-6">Start managing your health by adding your first medicine reminder</p>
                <button
                  onClick={() => setShowMedicineModal(true)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Add Your First Medicine
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Appointments Section */}
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center text-white">
                <Calendar className="w-8 h-8 mr-3" />
                <div>
                  <h2 className="text-2xl font-bold">Appointments</h2>
                  <p className="text-teal-100">Schedule and manage doctor visits</p>
                </div>
              </div>
              <button
                onClick={() => setShowAppointmentModal(true)}
                className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-300 flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
          
          <div className="p-8">
            {appointments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200 hover:shadow-lg transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <div className="bg-teal-600 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <button
                        onClick={() => onDeleteAppointment(appointment.id)}
                        className="text-red-500 hover:text-red-700 transition-colors text-xl font-bold"
                      >
                        ×
                      </button>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{appointment.doctorName}</h4>
                    <p className="text-teal-600 font-medium mb-4">{appointment.specialty}</p>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        {appointment.clinicAddress}
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2" />
                        {appointment.doctorPhone}
                      </div>
                      {appointment.notes && (
                        <div className="mt-3 p-3 bg-white/60 rounded-lg">
                          <p className="text-xs text-gray-700">{appointment.notes}</p>
                        </div>
                      )}
                    </div>
                    <div className="mt-3 flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setShowAppointmentSummary(true);
                        }}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-200 transition-colors"
                      >
                        <Brain className="w-3 h-3" />
                        <span>AI Summary</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gray-100 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments scheduled</h3>
                <p className="text-gray-600 mb-6">Book your first appointment with a healthcare provider</p>
                <button
                  onClick={() => setShowAppointmentModal(true)}
                  className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Book Your First Appointment
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Section */}
        {(upcomingMedicine || upcomingAppointment) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {upcomingMedicine && (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl shadow-xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Next Medicine</h3>
                    <p className="text-emerald-100">Don't forget your medication</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="font-bold text-2xl mb-2">{upcomingMedicine.medicine.name}</div>
                  <div className="text-emerald-100 mb-3">{upcomingMedicine.medicine.dosage}</div>
                  <div className="text-3xl font-bold">at {upcomingMedicine.time}</div>
                </div>
              </div>
            )}

            {upcomingAppointment && (
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 rounded-3xl shadow-xl p-8 text-white">
                <div className="flex items-center mb-6">
                  <div className="bg-white/20 p-3 rounded-xl mr-4">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Next Appointment</h3>
                    <p className="text-teal-100">Upcoming doctor visit</p>
                  </div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                  <div className="font-bold text-2xl mb-2">{upcomingAppointment.doctorName}</div>
                  <div className="text-teal-100 mb-3">{upcomingAppointment.specialty}</div>
                  <div className="text-xl font-bold">
                    {new Date(upcomingAppointment.date).toLocaleDateString()} at {upcomingAppointment.time}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Emergency SOS Section */}
        <div className="bg-gradient-to-br from-red-500 to-pink-500 rounded-3xl shadow-xl overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-red-600 to-pink-600">
            <div className="flex items-center text-white">
              <Shield className="w-8 h-8 mr-3" />
              <div>
                <h2 className="text-2xl font-bold">Emergency SOS</h2>
                <p className="text-red-100">Quick access to emergency contacts</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-white">
                <h4 className="font-bold text-xl mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Emergency Contact
                </h4>
                <div className="space-y-3">
                  <div className="font-semibold text-lg">{user.emergencyContact.name}</div>
                  <div className="text-red-100 capitalize text-sm">{user.emergencyContact.relationship}</div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    <span className="font-medium">{user.emergencyContact.phone}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <button className="bg-white text-red-600 font-bold py-6 px-12 rounded-2xl hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-2xl text-xl">
                  🚨 Send Emergency Alert
                </button>
                <p className="text-red-100 mt-4 text-sm">
                  This will immediately notify your emergency contact with your location
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Button */}
      <button
        onClick={() => setShowChatBot(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-50"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modals */}
      {showMedicineModal && (
        <MedicineReminder 
          onClose={() => setShowMedicineModal(false)} 
          onAddMedicine={onAddMedicine}
        />
      )}

      {showAppointmentModal && (
        <AppointmentBooking 
          onClose={() => setShowAppointmentModal(false)} 
          onAddAppointment={onAddAppointment}
        />
      )}

      {showProfileModal && (
        <ProfileModal 
          user={user} 
          onClose={() => setShowProfileModal(false)} 
        />
      )}

      {showChatBot && (
        <ChatBot 
          onClose={() => setShowChatBot(false)}
          user={user}
          medicines={medicines}
          appointments={appointments}
        />
      )}

      {showAboutModal && (
        <AboutModal 
          onClose={() => setShowAboutModal(false)} 
        />
      )}

      {showMedicalRecords && (
        <MedicalRecordsModal 
          onClose={() => setShowMedicalRecords(false)}
          user={user}
        />
      )}

      {showAppointmentSummary && selectedAppointment && (
        <AppointmentSummaryModal 
          onClose={() => {
            setShowAppointmentSummary(false);
            setSelectedAppointment(null);
          }}
          appointment={selectedAppointment}
          onSaveSummary={onSaveAppointmentSummary}
        />
      )}
    </div>
  );
};

export default Dashboard;