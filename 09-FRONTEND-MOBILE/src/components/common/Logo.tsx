import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

interface LogoProps {
  size?: number;
  color?: string;
  backgroundColor?: string;
}

export const Logo = ({ size = 120, color = "#FFFFFF", backgroundColor = "#10b981" }: LogoProps) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      {/* Diamond Frame */}
      <Path
        d="M100 20L180 100L100 180L20 100L100 20Z"
        fill={backgroundColor}
      />
      
      {/* Emerald Infinity "C" */}
      <Path
        d="M135 75C135 60 125 50 110 50C90 50 80 70 80 100C80 130 90 150 110 150C125 150 135 140 135 125M135 100H110"
        stroke={color}
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Ocean Curve Accent */}
      <Path
        d="M65 85C65 85 75 100 65 115"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        opacity="0.5"
      />
    </Svg>
  );
};

export default Logo;

