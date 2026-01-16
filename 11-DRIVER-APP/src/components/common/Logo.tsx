import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface LogoProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export const Logo = ({ size = 120, color = "#10b981", backgroundColor = "#000000" }: LogoProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Professional Circular Badge */}
      <Circle cx="100" cy="100" r="80" fill={backgroundColor} stroke={color} strokeWidth="2" />
      
      {/* Outer Glow Ring */}
      <Circle cx="100" cy="100" r="90" stroke={color} strokeWidth="1" opacity="0.2" />
      
      {/* Compass/Captain Infinity "C" */}
      <Path
        d="M130 75C130 60 120 50 105 50C85 50 75 70 75 100C75 130 85 150 105 150C120 150 130 140 130 125M130 100H105"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Steering Spokes Accents */}
      <Path d="M100 35V45M100 155V165M165 100H155M45 100H35" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </Svg>
  );
};

export default Logo;
