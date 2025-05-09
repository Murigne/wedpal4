
import React, { useState } from 'react';
import HeartAnimation from '@/components/HeartAnimation';
import LoginFeatures from '@/components/auth/LoginFeatures';
import LoginForm from '@/components/auth/LoginForm';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [userType, setUserType] = useState<'couple' | 'vendor'>('couple');
  const navigate = useNavigate();
  
  const handleUserTypeChange = (value: string) => {
    if (value === 'vendor') {
      navigate('/vendor-login');
    } else {
      setUserType('couple');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row animated-gradient relative overflow-hidden">
      <HeartAnimation avoidTextAreas={true} />
      
      {/* Left side - Branding and features */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative z-10">
        <LoginFeatures />
      </div>
      
      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 relative z-10">
        <div className="bg-gray-200/80 backdrop-blur-sm rounded-full mb-6 p-1">
          <Tabs
            defaultValue="couple"
            value={userType}
            onValueChange={handleUserTypeChange}
            className="w-64"
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="couple">Couple</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <LoginForm />
      </div>
      
      {/* Gradient overlay for smooth transition */}
      <div className="absolute bottom-0 left-0 w-full h-40 gradient-overlay" />
    </div>
  );
};

export default Login;
