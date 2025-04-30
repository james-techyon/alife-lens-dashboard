
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DomainType, AxisType, LensType, RingType } from '../types/alife';

interface DetailPanelProps {
  activeDomain: DomainType | null;
  activeAxis: AxisType | null;
  activeLens: LensType | null;
  activeRingType: RingType | null;
}

const DetailPanel: React.FC<DetailPanelProps> = ({
  activeDomain,
  activeAxis,
  activeLens,
  activeRingType,
}) => {
  const renderContent = () => {
    if (!activeRingType) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground">Click on any element in the wheel to see details</p>
        </div>
      );
    }

    switch (activeRingType) {
      case 'domain':
        if (!activeDomain) return null;
        return (
          <>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{activeDomain.icon}</span>
                <span>{activeDomain.name}</span>
              </CardTitle>
              <CardDescription>Core Domain (WHAT)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Keywords:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDomain.keywords.map((keyword) => (
                      <span 
                        key={keyword} 
                        className="px-2 py-1 bg-accent rounded-md text-sm"
                        style={{ 
                          backgroundColor: `${activeDomain.color}20`,
                          color: activeDomain.color 
                        }}
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    Interact with the Dimensional Axes (middle ring) and Practical Lenses (outer ring) to explore this domain in different contexts and perspectives.
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        );
      
      case 'axis':
        if (!activeAxis) return null;
        return (
          <>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{activeAxis.icon}</span>
                <span>{activeAxis.name}</span>
              </CardTitle>
              <CardDescription>Dimensional Axis (CONTEXT)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Key Question:</h4>
                  <p className="text-base italic">"{activeAxis.question}"</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    This axis provides contextual depth for analyzing the core domains. Use it to examine different perspectives on your selected domain.
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        );
      
      case 'lens':
        if (!activeLens) return null;
        return (
          <>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{activeLens.icon}</span>
                <span>{activeLens.name}</span>
              </CardTitle>
              <CardDescription>Practical Lens (HOW)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium text-sm text-muted-foreground mb-1">Practical Use:</h4>
                  <p className="text-base">{activeLens.practicalUse}</p>
                </div>
                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    This lens provides a structured way to practically evaluate and prioritize your domains and actions.
                  </p>
                </div>
              </div>
            </CardContent>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full shadow-md animate-fade-in">
      {renderContent()}
    </Card>
  );
};

export default DetailPanel;
