
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DomainType } from '../types/alife';
import { Card } from '@/components/ui/card';

interface DomainWheelProps {
  domains: DomainType[];
  onDomainClick: (domain: DomainType) => void;
  activeDomain: DomainType | null;
}

const DomainWheel: React.FC<DomainWheelProps> = ({ domains, onDomainClick, activeDomain }) => {
  const navigate = useNavigate();
  const [hoveredDomain, setHoveredDomain] = useState<string | null>(null);
  
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

  // Function to generate central domain segments
  const renderCenterDomains = () => {
    const centerRadius = innerRadius - 10; // Smaller than innerRadius to create a gap
    
    return (
      <>
        {/* Center Circle Background */}
        <circle
          cx={centerX}
          cy={centerY}
          r={centerRadius}
          fill="#FFFFFF"
          stroke="#E2E8F0"
          strokeWidth="1"
          className="drop-shadow-sm transition-all duration-300"
        />
        
        {/* Domain Icons in Center */}
        {domains.map((domain, index) => {
          const angle = index * anglePerDomain - Math.PI / 2 + (anglePerDomain / 2);
          const iconRadius = centerRadius * 0.7; // Position icons within the center circle
          const x = centerX + iconRadius * Math.cos(angle);
          const y = centerY + iconRadius * Math.sin(angle);
          
          const isActive = activeDomain?.name === domain.name;
          const isHovered = hoveredDomain === domain.name;
          
          return (
            <g
              key={`center-${domain.name}`}
              onClick={() => handleSegmentClick(domain)}
              onMouseEnter={() => setHoveredDomain(domain.name)}
              onMouseLeave={() => setHoveredDomain(null)}
              className="cursor-pointer"
            >
              <circle
                cx={x}
                cy={y}
                r={18}
                fill={isActive || isHovered ? domain.color : '#F9FAFB'}
                fillOpacity={isActive ? 0.9 : isHovered ? 0.7 : 0.3}
                stroke={domain.color}
                strokeWidth={isActive || isHovered ? 2 : 1}
                className="transition-all duration-300"
                style={{
                  transform: isActive || isHovered ? 'scale(1.2)' : 'scale(1)',
                  transformOrigin: `${x}px ${y}px`,
                  filter: isHovered ? `drop-shadow(0 0 4px ${domain.color})` : '',
                }}
              />
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="transition-all duration-300"
                fill={isActive || isHovered ? '#FFFFFF' : domain.color}
                style={{
                  fontSize: isActive || isHovered ? '1.2rem' : '1rem',
                  fontWeight: isActive ? 'bold' : 'normal',
                  filter: isHovered ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : '',
                  transform: isActive || isHovered ? 'scale(1.1)' : 'scale(1)',
                  transformOrigin: `${x}px ${y}px`,
                }}
              >
                {domain.icon}
              </text>
            </g>
          );
        })}
      </>
    );
  };

  return (
    <div className="relative w-[500px] h-[500px]">
      <svg 
        width="500" 
        height="500" 
        viewBox="0 0 500 500" 
        className="animate-fade-in"
      >
        {/* Center Domain Icons */}
        {renderCenterDomains()}
        
        {/* Center Circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={innerRadius}
          fill="none"
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
          const isHovered = hoveredDomain === domain.name;
          
          return (
            <g 
              key={domain.name} 
              onClick={() => handleSegmentClick(domain)}
              onMouseEnter={() => setHoveredDomain(domain.name)}
              onMouseLeave={() => setHoveredDomain(null)}
              className="cursor-pointer transition-all duration-300"
            >
              <path
                d={path}
                fill={domain.color}
                fillOpacity={isActive || isHovered ? 1 : 0.8}
                stroke="white"
                strokeWidth={isActive ? 3 : 1}
                className="transition-all duration-300"
                style={{
                  transform: isActive || isHovered ? `scale(1.05) translate(${Math.cos(startAngle + anglePerDomain/2) * 5}px, ${Math.sin(startAngle + anglePerDomain/2) * 5}px)` : '',
                  filter: isHovered ? `drop-shadow(0 0 6px ${domain.color})` : '',
                }}
              />
              
              {isHovered && (
                <path
                  d={path}
                  fill="none"
                  stroke={domain.color}
                  strokeWidth="2"
                  strokeOpacity="0.6"
                  className="animate-pulse-gentle"
                  style={{
                    filter: `drop-shadow(0 0 8px ${domain.color})`,
                  }}
                />
              )}
            </g>
          );
        })}
        
        {/* Domain Labels */}
        {domains.map((domain, index) => {
          const { x, y } = getLabelPosition(index);
          const angle = index * anglePerDomain - Math.PI / 2 + (anglePerDomain / 2);
          const isActive = activeDomain?.name === domain.name;
          const isHovered = hoveredDomain === domain.name;
          
          return (
            <g 
              key={`label-${domain.name}`} 
              className="cursor-pointer" 
              onClick={() => handleSegmentClick(domain)}
              onMouseEnter={() => setHoveredDomain(domain.name)}
              onMouseLeave={() => setHoveredDomain(null)}
            >
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`domain-icon transition-all duration-300 ${isActive || isHovered ? 'text-2xl' : 'text-xl'}`}
                fill="white"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 3px white)` : '',
                  textShadow: isHovered ? '0 0 5px rgba(255,255,255,0.8)' : '',
                }}
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
