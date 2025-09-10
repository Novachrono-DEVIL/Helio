import React from 'react';
import { Heart, Shield, Stethoscope, Pill, Calendar, MessageCircle } from 'lucide-react';

const WelcomePage = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo and Brand */}
        <div className="mb-8 flex items-center justify-center">
          <div className="bg-gradient-to-br from-emerald-600 to-teal-600 p-4 rounded-2xl shadow-lg mb-4">
            <Heart className="w-12 h-12 text-white" />
          </div>
        </div>

        <div className="mb-6">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-fade-in">
            Helio
          </h1>
          <div className="h-2 w-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full mx-auto mb-8"></div>
        </div>

        {/* Main Headline with Animation */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 animate-slide-up">
          Your Personal Smart
          <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent animate-fade-in-delay">
            Health Assistant
          </span>
        </h2>

        {/* Introductory Text */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up-delay">
          We're here to help you manage your medicines, remember your doctor visits, 
          and keep you safe in emergencies.
        </p>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12 max-w-2xl mx-auto">
          <div className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3 group-hover:scale-110">
              <Pill className="w-8 h-8 text-emerald-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Medicine Reminders</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3 group-hover:scale-110">
              <Calendar className="w-8 h-8 text-teal-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">Appointments</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3 group-hover:scale-110">
              <MessageCircle className="w-8 h-8 text-cyan-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">AI Assistant</span>
          </div>
          <div className="flex flex-col items-center group">
            <div className="bg-white p-4 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300 mb-3 group-hover:scale-110">
              <Shield className="w-8 h-8 text-red-500" />
            </div>
            <span className="text-sm font-medium text-gray-700">Emergency SOS</span>
          </div>
        </div>

        {/* Get Started Button */}
        <button 
          onClick={onGetStarted}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-12 py-4 rounded-2xl text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-bounce-gentle"
        >
          Get Started
        </button>

        {/* Trust Indicators */}
        <div className="mt-12 flex items-center justify-center space-x-8 text-gray-500">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span className="text-sm">Secure & Private</span>
          </div>
          <div className="flex items-center space-x-2">
            <Stethoscope className="w-5 h-5" />
            <span className="text-sm">Healthcare Focused</span>
          </div>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5" />
            <span className="text-sm">Always Available</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 1s ease-out 0.3s both;
        }
        
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.5s both;
        }
        
        .animate-slide-up-delay {
          animation: slide-up 1s ease-out 0.7s both;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;