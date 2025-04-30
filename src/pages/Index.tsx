
import React from 'react';
import Header from '@/components/Header';
import ALifeDashboard from '@/components/ALifeDashboard';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Header />
        <ALifeDashboard />
      </div>
    </div>
  );
};

export default Index;
