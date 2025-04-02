
import React from 'react';
import HeartAnimation from '@/components/HeartAnimation';
import LoginFeatures from '@/components/auth/LoginFeatures';
import LoginForm from '@/components/auth/LoginForm';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row animated-gradient relative overflow-hidden">
      <HeartAnimation avoidTextAreas={true} />
      
      {/* Left side - Branding and features */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
        <LoginFeatures />
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 relative z-10">
        <LoginForm />
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Login;
