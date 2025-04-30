
import React from 'react';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const RiskAnalysis: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
              Risk Analysis
            </h1>
            <p className="text-muted-foreground">Analyzing risks across domains</p>
          </div>
          <Link to="/" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </header>
        
        <Card className="p-6 shadow-md">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Risk Analysis Module</h2>
            <p className="text-muted-foreground mb-8">
              This is a placeholder for the Risk Analysis feature. In a future update, this page will provide detailed risk assessments 
              for each life domain, with visualization tools to identify areas that need attention.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/" 
                className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition"
              >
                Return to Dashboard
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RiskAnalysis;
