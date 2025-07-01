import React, { useState, useEffect } from 'react'
import { MatrixBackground } from '../components/MatrixBackground'
import { AuthForm } from '../components/AuthForm'

interface LoginPageProps {
  onAuthSuccess: () => void
}

export const LoginPage: React.FC<LoginPageProps> = ({ onAuthSuccess }) => {
  const [currentText, setCurrentText] = useState(0)
  const texts = ['Общайтесь.', 'Автоматизируйте.', 'Создавайте.', 'Упрощайте.']

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % texts.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [texts.length])

  return (
    <div className="min-h-screen relative overflow-hidden perspective-3d">
      <MatrixBackground />
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-30 rotate-3d"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-40 rotate-3d" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-50 rotate-3d" style={{ animationDelay: '10s' }}></div>
        <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-green-400 rounded-full opacity-30 rotate-3d" style={{ animationDelay: '15s' }}></div>
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Левая колонка - Hero Content */}
            <div className="text-center lg:text-left space-y-8 animate-3d-float">
              {/* Главный заголовок */}
              <div className="space-y-4">
                <h1 className="leading-tight">
                  <div 
                    className="text-7xl lg:text-9xl font-bold font-pixel bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl glow-3d cyber-glitch"
                    data-text="less"
                  >
                    less
                  </div>
                  <div className="text-3xl lg:text-4xl font-pixel text-gray-400 font-normal holographic">
                    workflow guru
                  </div>
                </h1>
                
                {/* Анимированный текст */}
                <div className="h-12 flex justify-center lg:justify-start items-center">
                  <span className="text-2xl lg:text-3xl font-medium text-blue-300 animate-fade-in-out font-fira glow-3d">
                    {texts[currentText]}
                  </span>
                </div>
              </div>
              
              {/* Подзаголовок */}
              <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-fira">
                AI, у которого за спиной сотни готовых автоматизаций. Он не учится на тебе. 
                Он уже натренирован на реальных решениях интегрированных в бизнесы.
              </p>
            </div>
            
            {/* Правая колонка - Форма авторизации */}
            <div className="flex justify-center">
              <div className="w-full max-w-md animate-3d-float" style={{ animationDelay: '1s' }}>
                <AuthForm onAuthSuccess={onAuthSuccess} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 