
import React from 'react';
import { AxisType } from '../types/alife';

interface AxisRingProps {
  axes: AxisType[];
  onAxisClick: (axis: AxisType) => void;
  activeAxis: AxisType | null;
}

const AxisRing: React.FC<AxisRingProps> = ({ axes, onAxisClick, activeAxis }) => {
  const centerX = 250;
  const centerY = 250;
  const innerRadius = 160;  // Slightly larger than the domain wheel's outer radius
  const outerRadius = 210;  // Radius for axis ring
  const totalAxes = axes.length;
  const anglePerAxis = (Math.PI * 2) / totalAxes;

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

  // Calculate label positions for axes
  const getLabelPosition = (index: number) => {
    const angle = index * anglePerAxis - Math.PI / 2 + (anglePerAxis / 2);
    const radius = (innerRadius + outerRadius) / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Handle segment click
  const handleSegmentClick = (axis: AxisType) => {
    onAxisClick(axis);
  };

  return (
    <div className="absolute top-0 left-0 w-[500px] h-[500px]">
      <svg 
        width="500" 
        height="500" 
        viewBox="0 0 500 500" 
        className="animate-fade-in"
      >
        {/* Axis Segments */}
        {axes.map((axis, index) => {
          const startAngle = index * anglePerAxis - Math.PI / 2;
          const endAngle = (index + 1) * anglePerAxis - Math.PI / 2;
          const path = getSegmentPath(startAngle, endAngle, innerRadius, outerRadius);
          const isActive = activeAxis?.name === axis.name;
          
          return (
            <g key={axis.name} onClick={() => handleSegmentClick(axis)}>
              <path
                d={path}
                fill={isActive ? '#8B5CF6' : '#E9D5FF'}
                fillOpacity={isActive ? 0.9 : 0.6}
                stroke="white"
                strokeWidth={isActive ? 2 : 1}
                className="cursor-pointer transition-all duration-300 hover:fill-opacity-80"
                transform={isActive ? `translate(${Math.cos(startAngle + anglePerAxis/2) * 3}, ${Math.sin(startAngle + anglePerAxis/2) * 3})` : ''}
              />
            </g>
          );
        })}
        
        {/* Axis Labels */}
        {axes.map((axis, index) => {
          const { x, y } = getLabelPosition(index);
          const isActive = activeAxis?.name === axis.name;
          
          return (
            <g key={`label-${axis.name}`} className="cursor-pointer" onClick={() => handleSegmentClick(axis)}>
              <text
                x={x}
                y={y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`${isActive ? 'text-lg font-bold' : 'text-base'} transition-all duration-300`}
                fill="#6B46C1"
              >
                {axis.icon}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AxisRing;
