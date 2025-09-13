import React from 'react';
import { X, User, Phone, MapPin, Users, Shield, Mail } from 'lucide-react';

const ProfileModal = ({ user, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 max-w-2xl w-full max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg mr-4">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-gray-600">Profile Details</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[calc(85vh-140px)] p-6">
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Age</label>
                  <div className="text-lg font-semibold text-gray-800">{user.age} years</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Gender</label>
                  <div className="text-lg font-semibold text-gray-800 capitalize">{user.gender}</div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Phone className="w-5 h-5 mr-2 text-teal-600" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <div className="text-lg font-semibold text-gray-800">{user.email}</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Phone</label>
                    <div className="text-lg font-semibold text-gray-800">{user.phone}</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3 mt-1" />
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Address</label>
                    <div className="text-lg font-semibold text-gray-800">{user.address}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl p-6 border border-red-200">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-red-600" />
                Emergency Contact
              </h3>
              <div className="bg-white/50 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <Users className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="text-lg font-bold text-gray-800">{user.emergencyContact.name}</div>
                </div>
                <div className="ml-8">
                  <div className="text-sm text-gray-600 mb-1">Relationship</div>
                  <div className="text-md font-semibold text-gray-800 capitalize mb-2">
                    {user.emergencyContact.relationship}
                  </div>
                  <div className="text-sm text-gray-600 mb-1">Phone Number</div>
                  <div className="text-md font-semibold text-gray-800">
                    {user.emergencyContact.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;