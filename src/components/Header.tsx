
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center mb-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-teal-500 bg-clip-text text-transparent">
          aLife Dashboard
        </h1>
        <p className="text-muted-foreground">Holistic Life Framework</p>
      </div>
    </header>
  );
};

export default Header;
