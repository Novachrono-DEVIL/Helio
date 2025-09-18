import React, { useState, useEffect } from 'react';
import { User, Pill, Clock, AlertTriangle, FileText, Search, Filter } from 'lucide-react';

// This function simulates fetching patient data from a real API.
// In a production app, you would replace this with an actual API call (e.g., using fetch or axios).
const fetchPatientData = async (patientId) => {
  // Simulate a network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  // This is a mock API response. In a real app, this data would come from your backend.
  const allPatientsData = {
    'linkedPatientCode123': {
      id: 'linkedPatientCode123',
      name: 'Google User',
      age: 35,
      lastVisit: '2024-09-20',
      recentMedications: [
        { name: 'Aspirin', dosage: '81mg', lastTaken: '2024-09-15', frequency: 'Daily' },
        { name: 'Vitamin D', dosage: '1000IU', lastTaken: '2024-09-16', frequency: 'Daily' },
      ],
      allergies: ['Penicillin', 'Dust'],
      records: [
        { date: '2024-09-20', type: 'Lab Results', description: 'Complete Blood Count (CBC) normal.' },
        { date: '2024-08-05', type: 'Prescription', description: 'Prescribed Vitamin D for low levels.' },
      ]
    },
    '1': {
      id: '1',
      name: 'John Doe',
      age: 45,
      lastVisit: '2024-09-15',
      recentMedications: [
        { name: 'Lisinopril', dosage: '10mg', lastTaken: '2024-09-17', frequency: 'Daily' },
        { name: 'Metformin', dosage: '500mg', lastTaken: '2024-09-16', frequency: 'Twice daily' },
      ],
      allergies: ['Penicillin', 'Shellfish'],
      records: [
        { date: '2024-09-15', type: 'Check-up', description: 'Routine check-up, blood pressure monitored.' },
        { date: '2024-08-01', type: 'Vaccination', description: 'Seasonal flu shot administered.' },
      ]
    },
    '2': {
      id: '2',
      name: 'Jane Smith',
      age: 32,
      lastVisit: '2024-09-18',
      recentMedications: [
        { name: 'Ibuprofen', dosage: '400mg', lastTaken: '2024-09-15', frequency: 'As needed' },
      ],
      allergies: ['Latex'],
      records: [
        { date: '2024-09-18', type: 'Consultation', description: 'Discussed persistent headaches.' },
        { date: '2024-08-10', type: 'Prescription', description: 'Prescribed Ibuprofen for pain management.' },
      ]
    }
  };

  return allPatientsData[patientId];
};

const DoctorDashboard = ({ user, onLogout, linkedPatientCode }) => {
  const [patient, setPatient] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch patient data when the component mounts or the linkedPatientCode changes.
  useEffect(() => {
    const getPatient = async () => {
      setIsLoading(true);
      try {
        if (linkedPatientCode) {
          const data = await fetchPatientData(linkedPatientCode);
          setPatient(data);
        } else {
          // If no linkedPatientCode, this is a normal doctor login, but for this specific request, we won't display a list.
          setPatient(null);
        }
      } catch (err) {
        setError("Failed to load patient data.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    getPatient();
  }, [linkedPatientCode]);

  // Filters medications to show only those taken in the last 14 days.
  const getRecentMedications = (medications) => {
    if (!medications) return [];
    const fourteenDaysAgo = new Date();
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    
    return medications.filter(med => new Date(med.lastTaken) >= fourteenDaysAgo);
  };

  // Utility function to format dates for better readability.
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <svg className="animate-spin h-10 w-10 text-blue-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading patient data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center p-6 bg-white rounded-xl shadow-lg">
          <p className="text-red-600 font-semibold mb-2">Error loading data</p>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

 if (!patient) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
        {/* Icon (separate from the box) */}
        <div className="flex items-center justify-center mb-6"> {/* Increased margin-bottom for spacing */}
          <svg 
            width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="text-blue-500" // Apply color via Tailwind class for easier customization
          >
            {/* The SVG path data for the document with cross */}
            <rect x="5" y="2" width="14" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 7H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 11H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 15H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="17" cy="17" r="5" fill="#FFFFFF" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M15 15L19 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M19 15L15 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Text Box (the card below the icon) */}
        <div className="text-center p-6 bg-white rounded-xl shadow-lg max-w-sm w-full"> {/* Added max-w-sm and w-full for better responsiveness */}
          <p className="text-gray-600 font-semibold mb-2 text-xl">No Patient Found</p>
          <p className="text-gray-500">The requested patient could not be found or is not linked.</p>
        </div>
      </div>
    );
  }

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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* A simple placeholder for the patient list column */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Linked Patient</h2>
              <div className="space-y-3">
                <div className="p-4 rounded-xl cursor-pointer transition-all duration-200 bg-blue-100 border-2 border-blue-500">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-800">{patient.name}</h3>
                      <p className="text-sm text-gray-600">Age: {patient.age}</p>
                      <p className="text-xs text-gray-500">Last visit: {formatDate(patient.lastVisit)}</p>
                    </div>
                    <div className="text-right">
                      <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                        {getRecentMedications(patient.recentMedications).length} meds
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{patient.name}</h2>
                    <p className="text-gray-600">Age: {patient.age} • Last Visit: {formatDate(patient.lastVisit)}</p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl">
                    <User className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Allergies */}
                {patient.allergies?.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4">
                    <div className="flex items-center mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 mr-2" />
                      <h3 className="font-semibold text-red-800">Known Allergies</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
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
                
                {getRecentMedications(patient.recentMedications).length > 0 ? (
                  <div className="space-y-4">
                    {getRecentMedications(patient.recentMedications).map((medication, index) => (
                      <div key={index} className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">{medication.name}</h4>
                            <p className="text-gray-600">{medication.dosage} • {medication.frequency}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center text-sm text-gray-600">
                              <Clock className="w-4 h-4 mr-1" />
                              Last taken: {formatDate(medication.lastTaken)}
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

              {/* Records/History */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 p-6">
                <div className="flex items-center mb-4">
                  <FileText className="w-6 h-6 text-indigo-600 mr-2" />
                  <h3 className="text-xl font-bold text-gray-800">Patient Records</h3>
                </div>
                {patient.records?.length > 0 ? (
                  <div className="space-y-4">
                    {patient.records.map((record, index) => (
                      <div key={index} className="bg-indigo-50 border border-indigo-200 rounded-xl p-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-indigo-800">{record.type}</span>
                          <span className="text-sm text-gray-500">{formatDate(record.date)}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{record.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No records available for this patient.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;