
import React, { useState } from 'react';
import { DomainType } from '../types/alife';
import { Card } from '@/components/ui/card';

interface DomainWheelProps {
  domains: DomainType[];
  onDomainClick: (domain: DomainType) => void;
  activeDomain: DomainType | null;
}

const DomainWheel: React.FC<DomainWheelProps> = ({ domains, onDomainClick, activeDomain }) => {
  const centerX = 250;
  const centerY = 250;
  const innerRadius = 80;
  const outerRadius = 150;
  const totalDomains = domains.length;
  const anglePerDomain = (Math.PI * 2) / totalDomains;

  // Helper function to calculate segment path
  const getSegmentPath = (startAngle: number, endAngle: number, innerR: number, outerR: number) => {
    const startAngleRad = startAngle;
    const endAngleRad = endAngle;
    
    const x0 = centerX + innerR * Math.cos(startAngleRad);
    const y0 = centerY + innerR * Math.sin(startAngleRad);
    
    const x1 = centerX + outerR * Math.cos(startAngleRad);
    const y1 = centerY + outerR * Math.sin(startAngleRad);
    
    const x2 = centerX + outerR * Math.cos(endAngleRad);
    const y2 = centerY + outerR * Math.sin(endAngleRad);
    
    const x3 = centerX + innerR * Math.cos(endAngleRad);
    const y3 = centerY + innerR * Math.sin(endAngleRad);

    // Arc flag is 0 for minor arc, 1 for major arc
    const arcFlag = endAngleRad - startAngleRad > Math.PI ? 1 : 0;
    
    // Draw the segment
    return `M ${x0},${y0} 
            L ${x1},${y1} 
            A ${outerR},${outerR} 0 ${arcFlag},1 ${x2},${y2} 
            L ${x3},${y3} 
            A ${innerR},${innerR} 0 ${arcFlag},0 ${x0},${y0}`;
  };

  // Calculate label positions for domains
  const getLabelPosition = (index: number) => {
    const angle = index * anglePerDomain - Math.PI / 2 + (anglePerDomain / 2);
    const radius = (innerRadius + outerRadius) / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Handle segment click
  const handleSegmentClick = (domain: DomainType) => {
    onDomainClick(domain);
  };

  return (
    <div className="relative w-[500px] h-[500px]">
      <svg 
        width="500" 
        height="500" 
        viewBox="0 0 500 500" 
        className="animate-fade-in"
      >
        {/* Center Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="2"
          className="drop-shadow-sm"
        />
        
        {/* Domain Segments */}
        {domains.map((domain, index) => {
          const startAngle = index * anglePerDomain - Math.PI / 2;
          const endAngle = (index + 1) * anglePerDomain - Math.PI / 2;
          const path = getSegmentPath(startAngle, endAngle, innerRadius, outerRadius);
          const isActive = activeDomain?.name === domain.name;
          
          return (
            <g key={domain.name} onClick={() => handleSegmentClick(domain)}>
              <path
                d={path}
                fill={domain.color}
                fillOpacity={isActive ? 1 : 0.8}
                stroke="white"
                strokeWidth={isActive ? 3 : 1}
                className="domain-segment cursor-pointer"
                transform={isActive ? `translate(${Math.cos(startAngle + anglePerDomain/2) * 5}, ${Math.sin(startAngle + anglePerDomain/2) * 5})` : ''}
              />
            </g>
          );
        })}
        
        {/* Domain Labels */}
        {domains.map((domain, index) => {
          const { x, y } = getLabelPosition(index);
          const angle = index * anglePerDomain - Math.PI / 2 + (anglePerDomain / 2);
          const isActive = activeDomain?.name === domain.name;
          
          return (
            <g key={`label-${domain.name}`} className="cursor-pointer" onClick={() => handleSegmentClick(domain)}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`domain-icon ${isActive ? 'text-2xl' : 'text-xl'}`}
                fill="white"
              >
                {domain.icon}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default DomainWheel;
