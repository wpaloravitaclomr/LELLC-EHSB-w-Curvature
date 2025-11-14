
import React from 'react';

const Illustration: React.FC = () => {
  return (
    <div className="w-full max-w-sm mx-auto my-6 p-4 bg-white rounded-lg shadow-inner">
      <svg viewBox="0 0 200 180" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#4a5568" />
          </marker>
        </defs>

        {/* Channel Banks */}
        <path d="M 50 170 C 50 120, 100 80, 150 80 L 170 80" stroke="#4a5568" strokeWidth="1.5" fill="none" />
        <path d="M 30 170 C 30 100, 90 60, 140 60 L 160 60" stroke="#4a5568" strokeWidth="1.5" fill="none" />
        
        {/* Channel Centerline */}
        <path d="M 40 170 C 40 110, 95 70, 145 70 L 165 70" stroke="#4a5568" strokeWidth="1" strokeDasharray="4 2" fill="none" />
        
        {/* W - Channel Width */}
        <line x1="148" y1="63" x2="155" y2="81" stroke="#059669" strokeWidth="1" />
        <line x1="144" y1="66" x2="152" y2="60" stroke="#059669" strokeWidth="1" />
        <line x1="151" y1="84" x2="159" y2="78" stroke="#059669" strokeWidth="1" />
        <text x="133" y="78" fontFamily="Arial, sans-serif" fontSize="10" fill="#059669">W</text>
        
        {/* Rc - Radius of Curvature */}
        <line x1="95" y1="135" x2="120" y2="80" stroke="#3b82f6" strokeWidth="1" />
        {/* Tick on centerline */}
        <line x1="116" y1="84" x2="124" y2="76" stroke="#3b82f6" strokeWidth="1" />
        <circle cx="95" cy="135" r="2" fill="#3b82f6" />
        <text x="98" y="115" fontFamily="Arial, sans-serif" fontSize="10" fill="#3b82f6">Rc</text>
        
        {/* Flow Arrow */}
        <line x1="90" y1="105" x2="70" y2="125" stroke="#4a5568" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
        <text x="95" y="110" fontFamily="Arial, sans-serif" fontSize="10" fill="#4a5568" transform="rotate(45 95 110)">FLOW</text>
        
        {/* Labels */}
        <line x1="145" y1="70" x2="160" y2="40" stroke="#4a5568" strokeWidth="0.5" />
        <text x="110" y="35" fontFamily="Arial, sans-serif" fontSize="8" fill="#4a5568">CHANNEL CENTERLINE</text>
        
        <line x1="70" y1="165" x2="50" y2="140" stroke="#4a5568" strokeWidth="0.5" />
        <text x="5" y1="135" fontFamily="Arial, sans-serif" fontSize="8" fill="#4a5568">CHANNEL BANKS</text>
      </svg>
    </div>
  );
};

export default Illustration;
