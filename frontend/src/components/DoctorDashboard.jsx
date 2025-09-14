import React, { useState } from 'react';
import { User, Pill, Calendar, Clock, AlertTriangle, FileText, Search, Filter } from 'lucide-react';

const DoctorDashboard = ({ user, onLogout, linkedPatientCode }) => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock patient data
  const [patients] = useState(() => {
    // If doctor has a specific patient code, show only that patient
    if (linkedPatientCode) {
      return [
        {
          id: linkedPatientCode,
          name: 'Connected Patient',
          age: 35,
          lastVisit: '2024-01-20',
          recentMedications: [
            { name: 'Aspirin', dosage: '81mg', lastTaken: '2024-01-21', frequency: 'Daily' },
            { name: 'Vitamin D', dosage: '1000IU', lastTaken: '2024-01-21', frequency: 'Daily' }
          ],
          allergies: ['Penicillin']
        }
      ];
    }
    
    // Default patient list for general doctor view
    return [
      {
        id: '1',
        name: 'John Doe',
        age: 45,
        lastVisit: '2024-01-15',
        recentMedications: [
          { name: 'Lisinopril', dosage: '10mg', lastTaken: '2024-01-20', frequency: 'Daily' },
          { name: 'Metformin', dosage: '500mg', lastTaken: '2024-01-20', frequency: 'Twice daily' }
        ],
        allergies: ['Penicillin', 'Shellfish']
      },
      {
        id: '2',
        name: 'Jane Smith',
        age: 32,
        lastVisit: '2024-01-18',
        recentMedications: [
          { name: 'Ibuprofen', dosage: '400mg', lastTaken: '2024-01-19', frequency: 'As needed' }
        ],
        allergies: ['Latex']
      }
    ];
  });

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRecentMedications = (medications) => {
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    
    return medications.filter(med => 
      new Date(med.lastTaken) >= fourteenDaysAgo
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-blue-100/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2.5 rounded-xl shadow-lg">
                <User className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Doctor Portal
                </h1>
                <p className="text-sm text-gray-600">Patient Medication Overview</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-800">Dr. {user.name}</p>
                <p className="text-sm text-gray-600">Healthcare Provider</p>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Search and Filter */}
        <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors">
              <Filter className="w-5 h-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Patients</h2>
              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={`p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedPatient?.id === patient.id
                        ? 'bg-blue-100 border-2 border-blue-500'
                        : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-600">Age: {patient.age}</p>
                        <p className="text-xs text-gray-500">Last visit: {new Date(patient.lastVisit).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                          {getRecentMedications(patient.recentMedications).length} meds
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Patient Info */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedPatient.name}</h2>
                      <p className="text-gray-600">Age: {selectedPatient.age} • Last Visit: {new Date(selectedPatient.lastVisit).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  {/* Allergies */}
                  {selectedPatient.allergies.length > 0 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                      <div className="flex items-center mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                        <h3 className="font-semibold text-red-800">Known Allergies</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedPatient.allergies.map((allergy, index) => (
                          <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                            {allergy}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Recent Medications (Past 14 Days) */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
                  <div className="flex items-center mb-4">
                    <Pill className="w-6 h-6 text-green-600 mr-2" />
                    <h3 className="text-xl font-bold text-gray-800">Recent Medications (Past 14 Days)</h3>
                  </div>
                  
                  {getRecentMedications(selectedPatient.recentMedications).length > 0 ? (
                    <div className="space-y-4">
                      {getRecentMedications(selectedPatient.recentMedications).map((medication, index) => (
                        <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800 text-lg">{medication.name}</h4>
                              <p className="text-gray-600">{medication.dosage} • {medication.frequency}</p>
                            </div>
                            <div className="text-right">
                              <div className="flex items-center text-sm text-gray-600">
                                <Clock className="w-4 h-4 mr-1" />
                                Last taken: {new Date(medication.lastTaken).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Pill className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-600">No medications taken in the past 14 days</p>
                    </div>
                  )}
                </div>

                {/* Privacy Notice */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-2" />
                    <div>
                      <h4 className="font-medium text-blue-800">Privacy Protected</h4>
                      <p className="text-blue-700 text-sm">You can only view medication history from the past 14 days. Other patient data requires explicit authorization.</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-12 text-center">
                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">Select a Patient</h3>
                <p className="text-gray-500">Choose a patient from the list to view their recent medication history</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;