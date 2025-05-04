
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { domainData } from '@/data/alifeData';
import { DomainType } from '@/types/alife';

const DomainDashboard: React.FC = () => {
  const { domainSlug } = useParams<{ domainSlug: string }>();
  
  // Find the matching domain from our domain data
  const domain = domainData.find(d => 
    d.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === domainSlug
  ) || domainData[0];
  
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Header />
        
        <div className="mb-8 flex items-center">
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft size={16} />
              Back to Dashboard
            </Button>
          </Link>
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div 
              className="p-4 rounded-full text-3xl" 
              style={{ 
                backgroundColor: `${domain.color}30`,
                color: domain.color 
              }}
            >
              {domain.icon}
            </div>
            <h1 className="text-3xl font-bold">{domain.name}</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card 
              className="shadow-md h-64 flex items-center justify-center animate-fade-in"
              style={{ 
                background: `linear-gradient(45deg, ${domain.color}10, ${domain.color}20)`,
                borderTop: `3px solid ${domain.color}`
              }}
            >
              <CardContent className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="text-5xl mb-4">{domain.icon}</div>
                <h2 className="text-xl font-medium mb-2">Domain Dashboard: Coming Soon</h2>
                <p className="text-muted-foreground">
                  Detailed analytics and insights for {domain.name} will be available here soon.
                </p>
              </CardContent>
            </Card>
            
            <Card className="shadow-md h-64 p-6 animate-fade-in">
              <CardHeader className="p-0 mb-4">
                <h2 className="text-xl font-medium">Key Areas</h2>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex flex-wrap gap-2">
                  {domain.keywords.map((keyword) => (
                    <span 
                      key={keyword} 
                      className="px-3 py-1.5 rounded-full text-sm"
                      style={{ 
                        backgroundColor: `${domain.color}20`,
                        color: domain.color 
                      }}
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
                <div className="mt-6">
                  <p className="text-muted-foreground">
                    Select specific aspects of {domain.name} to explore more detailed information
                    and recommended actions.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainDashboard;
