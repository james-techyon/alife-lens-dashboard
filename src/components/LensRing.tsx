
import React, { useState } from 'react';
import { LensType } from '../types/alife';

interface LensRingProps {
  lenses: LensType[];
  onLensClick: (lens: LensType) => void;
  activeLens: LensType | null;
}

const LensRing: React.FC<LensRingProps> = ({ lenses, onLensClick, activeLens }) => {
  const [hoveredLens, setHoveredLens] = useState<string | null>(null);
  
  const centerX = 250;
  const centerY = 250;
  const innerRadius = 220;  // Slightly larger than the axis ring's outer radius
  const outerRadius = 240;  // Radius for lens ring
  const totalLenses = lenses.length;
  const anglePerLens = (Math.PI * 2) / totalLenses;

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

  // Calculate label positions for lenses
  const getLabelPosition = (index: number) => {
    const angle = index * anglePerLens - Math.PI / 2 + (anglePerLens / 2);
    const radius = (innerRadius + outerRadius) / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Handle segment click
  const handleSegmentClick = (lens: LensType) => {
    onLensClick(lens);
  };

  return (
    <div className="absolute top-0 left-0 w-[500px] h-[500px]">
      <svg 
        width="500" 
        height="500" 
        viewBox="0 0 500 500" 
        className="animate-fade-in"
      >
        {/* Lens Segments */}
        {lenses.map((lens, index) => {
          const startAngle = index * anglePerLens - Math.PI / 2;
          const endAngle = (index + 1) * anglePerLens - Math.PI / 2;
          const path = getSegmentPath(startAngle, endAngle, innerRadius, outerRadius);
          const isActive = activeLens?.name === lens.name;
          const isHovered = hoveredLens === lens.name;
          const baseColor = '#2C7A7B';
          
          return (
            <g 
              key={lens.name} 
              onClick={() => handleSegmentClick(lens)}
              onMouseEnter={() => setHoveredLens(lens.name)}
              onMouseLeave={() => setHoveredLens(null)}
            >
              <path
                d={path}
                fill={isActive ? baseColor : '#B2F5EA'}
                fillOpacity={isActive ? 0.9 : isHovered ? 0.8 : 0.6}
                stroke="white"
                strokeWidth={isActive || isHovered ? 2 : 1}
                className="cursor-pointer transition-all duration-300"
                style={{
                  transform: isActive || isHovered ? 
                    `scale(1.02) translate(${Math.cos(startAngle + anglePerLens/2) * 3}px, ${Math.sin(startAngle + anglePerLens/2) * 3}px)` : '',
                  filter: isHovered ? `drop-shadow(0 0 4px ${baseColor})` : '',
                }}
              />
              
              {isHovered && (
                <path
                  d={path}
                  fill="none"
                  stroke={baseColor}
                  strokeWidth="1"
                  strokeOpacity="0.5"
                  className="animate-pulse-gentle"
                />
              )}
            </g>
          );
        })}
        
        {/* Lens Labels */}
        {lenses.map((lens, index) => {
          const { x, y } = getLabelPosition(index);
          const isActive = activeLens?.name === lens.name;
          const isHovered = hoveredLens === lens.name;
          
          return (
            <g 
              key={`label-${lens.name}`} 
              className="cursor-pointer" 
              onClick={() => handleSegmentClick(lens)}
              onMouseEnter={() => setHoveredLens(lens.name)}
              onMouseLeave={() => setHoveredLens(null)}
            >
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`${isActive || isHovered ? 'text-base font-bold' : 'text-sm'} transition-all duration-300`}
                fill="#2C7A7B"
                style={{
                  filter: isHovered ? 'drop-shadow(0 0 2px rgba(44, 122, 123, 0.8))' : '',
                }}
              >
                {lens.icon}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default LensRing;
