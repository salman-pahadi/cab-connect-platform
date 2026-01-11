export default function ServiceAreaMap() {
  return (
    <div className="relative w-full h-[500px] bg-gradient-to-br from-blue-50 via-emerald-50 to-blue-100 rounded-3xl overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0">
        {/* Water effect - lighter blue areas */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* SVG Map of Viti Levu */}
      <svg
        viewBox="0 0 800 500"
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ocean/Water Background Pattern */}
        <defs>
          <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M0 20 Q 10 15, 20 20 T 40 20"
              stroke="rgba(59, 130, 246, 0.1)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
          
          {/* Gradient for the island */}
          <linearGradient id="islandGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow effect for markers */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Water pattern background */}
        <rect width="800" height="500" fill="url(#waves)" />

        {/* Simplified Viti Levu Island Shape */}
        <path
          d="M 150 250 
             Q 180 200, 250 180
             Q 320 165, 400 170
             Q 480 175, 550 200
             Q 620 225, 650 280
             Q 665 330, 640 370
             Q 600 410, 520 425
             Q 440 435, 360 428
             Q 280 420, 220 390
             Q 160 360, 140 310
             Q 130 280, 150 250 Z"
          fill="url(#islandGradient)"
          stroke="#10b981"
          strokeWidth="3"
          className="drop-shadow-lg"
        />

        {/* Island highlight/shine effect */}
        <path
          d="M 250 190 
             Q 320 175, 400 180
             Q 450 182, 500 200"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Service Area Markers */}
        
        {/* Nadi - Western (Airport location) */}
        <g className="animate-pulse-subtle">
          <circle cx="280" cy="280" r="8" fill="#10b981" filter="url(#glow)" />
          <circle cx="280" cy="280" r="4" fill="white" />
          <circle cx="280" cy="280" r="20" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Suva - Eastern (Capital) */}
        <g className="animate-pulse-subtle" style={{ animationDelay: '0.5s' }}>
          <circle cx="560" cy="320" r="8" fill="#10b981" filter="url(#glow)" />
          <circle cx="560" cy="320" r="4" fill="white" />
          <circle cx="560" cy="320" r="20" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Lautoka - Northern West */}
        <g className="animate-pulse-subtle" style={{ animationDelay: '1s' }}>
          <circle cx="320" cy="230" r="8" fill="#10b981" filter="url(#glow)" />
          <circle cx="320" cy="230" r="4" fill="white" />
          <circle cx="320" cy="230" r="20" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Denarau - Resort area (near Nadi) */}
        <g className="animate-pulse-subtle" style={{ animationDelay: '1.5s' }}>
          <circle cx="240" cy="300" r="8" fill="#10b981" filter="url(#glow)" />
          <circle cx="240" cy="300" r="4" fill="white" />
          <circle cx="240" cy="300" r="20" fill="none" stroke="#10b981" strokeWidth="2" opacity="0.3">
            <animate attributeName="r" values="20;28;20" dur="2s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* City Labels */}
        <text x="280" y="260" textAnchor="middle" className="fill-gray-800 font-bold text-sm">
          Nadi
        </text>
        <text x="560" y="305" textAnchor="middle" className="fill-gray-800 font-bold text-sm">
          Suva
        </text>
        <text x="320" y="215" textAnchor="middle" className="fill-gray-800 font-bold text-sm">
          Lautoka
        </text>
        <text x="240" y="335" textAnchor="middle" className="fill-gray-800 font-bold text-sm">
          Denarau
        </text>

        {/* Decorative compass rose */}
        <g transform="translate(700, 80)">
          <circle cx="0" cy="0" r="30" fill="white" opacity="0.9" />
          <path d="M 0 -25 L 5 0 L 0 25 L -5 0 Z" fill="#10b981" />
          <path d="M -25 0 L 0 5 L 25 0 L 0 -5 Z" fill="#059669" opacity="0.6" />
          <text x="0" y="-35" textAnchor="middle" className="fill-gray-700 font-bold text-xs">N</text>
        </g>

        {/* Island name label */}
        <text x="400" y="470" textAnchor="middle" className="fill-gray-600 font-bold text-2xl opacity-50">
          Viti Levu
        </text>
      </svg>

      {/* Coverage Indicator Badge */}
      <div className="absolute top-6 left-6 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-emerald-200 shadow-lg">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse-subtle shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
          <span className="text-sm font-semibold text-gray-800">Full Island Coverage</span>
        </div>
      </div>

      {/* Legend */}
      <div className="absolute bottom-6 right-6 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-xs font-semibold text-gray-700">Service Areas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border-2 border-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Active Coverage</span>
          </div>
        </div>
      </div>
    </div>
  )
}
