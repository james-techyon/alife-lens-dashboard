
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import DomainWheel from './DomainWheel';
import AxisRing from './AxisRing';
import LensRing from './LensRing';
import DetailPanel from './DetailPanel';
import { DomainType, AxisType, LensType, RingType } from '../types/alife';
import { domainData, axisData, lensData } from '../data/alifeData';

const ALifeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeDomain, setActiveDomain] = useState<DomainType | null>(null);
  const [activeAxis, setActiveAxis] = useState<AxisType | null>(null);
  const [activeLens, setActiveLens] = useState<LensType | null>(null);
  const [activeRingType, setActiveRingType] = useState<RingType | null>(null);

  const handleDomainClick = (domain: DomainType) => {
    setActiveDomain(domain);
    setActiveRingType('domain');
    // Navigation is now handled by a separate button in the DetailPanel
  };

  const handleAxisClick = (axis: AxisType) => {
    setActiveAxis(axis);
    setActiveRingType('axis');
  };

  const handleLensClick = (lens: LensType) => {
    setActiveLens(lens);
    setActiveRingType('lens');
  };

  const handleNavigateToDomain = () => {
    if (activeDomain) {
      const domainSlug = activeDomain.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      navigate(`/domain/${domainSlug}`);
    }
  };

  return (
    <div className="container max-w-6xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Card className="p-6 shadow-md relative h-[540px] flex items-center justify-center overflow-hidden">
            <div className="relative w-[500px] h-[500px]">
              <DomainWheel 
                domains={domainData} 
                onDomainClick={handleDomainClick}
                activeDomain={activeDomain} 
              />
              <AxisRing 
                axes={axisData} 
                onAxisClick={handleAxisClick}
                activeAxis={activeAxis} 
              />
              <LensRing 
                lenses={lensData} 
                onLensClick={handleLensClick}
                activeLens={activeLens} 
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs text-muted-foreground">
              <span>Inner: WHAT (Core Domains)</span>
              <span>Middle: CONTEXT (Dimensional Axes)</span>
              <span>Outer: HOW (Practical Lenses)</span>
            </div>
          </Card>
        </div>
        <div className="md:col-span-1">
          <div className="space-y-6">
            <DetailPanel 
              activeDomain={activeDomain}
              activeAxis={activeAxis}
              activeLens={activeLens}
              activeRingType={activeRingType}
              onNavigateToDomain={handleNavigateToDomain}
            />
            <Card className="p-4 shadow-md">
              <h3 className="font-semibold mb-2">How to Use the Dashboard</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>1. Click on a domain (inner ring) to select an area of focus</li>
                <li>2. Explore a dimensional axis (middle ring) to provide context</li>
                <li>3. Apply a practical lens (outer ring) to plan actions</li>
                <li>4. Use the insights to improve your life balance</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ALifeDashboard;
