import React from 'react'

export const MatrixBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Primary grid with 3D effect */}
      <div 
        className="absolute inset-0 matrix-grid opacity-25"
        style={{
          transform: 'perspective(1000px) rotateX(60deg) scale(2)',
          transformOrigin: 'center center',
          animation: 'gridPulse 4s ease-in-out infinite',
        }}
      />
      
      {/* Secondary grid for depth */}
      <div 
        className="absolute inset-0 matrix-grid opacity-15"
        style={{
          transform: 'perspective(1000px) rotateX(60deg) scale(1.5) translateY(-20px)',
          transformOrigin: 'center center',
          animationDelay: '2s',
        }}
      />
      
      {/* Animated particles effect */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full opacity-60 animate-pulse rotate-3d"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full opacity-40 animate-pulse rotate-3d" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-50 animate-pulse rotate-3d" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-30 animate-pulse rotate-3d" style={{ animationDelay: '3s' }}></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-1/6 left-1/6 w-3 h-3 bg-pink-400 rounded-full opacity-20 animate-3d-float"></div>
        <div className="absolute bottom-1/6 right-1/6 w-2 h-2 bg-yellow-400 rounded-full opacity-25 animate-3d-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-orange-400 rounded-full opacity-35 animate-3d-float" style={{ animationDelay: '6s' }}></div>
      </div>
      
      {/* Holographic overlay */}
      <div className="absolute inset-0 holographic opacity-10"></div>
      
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/30" />
      
      {/* Radial gradient for focus */}
      <div className="absolute inset-0 bg-radial-gradient opacity-20" />
      
      {/* Cyber lines effect */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-20 animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  )
} 