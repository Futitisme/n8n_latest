import React from 'react'
import { MatrixBackground } from '../components/MatrixBackground'
import { ArrowLeft, Store, Zap, Users, Clock } from 'lucide-react'

interface MarketplacePageProps {
  onBack: () => void
}

export const MarketplacePage: React.FC<MarketplacePageProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen relative overflow-hidden perspective-3d">
      <MatrixBackground />
      
      {/* Floating 3D Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-20 rotate-3d"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-30 rotate-3d" style={{ animationDelay: '5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-25 rotate-3d" style={{ animationDelay: '10s' }}></div>
      </div>
      
      {/* Header */}
      <div className="relative z-10 p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors font-fira"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к чату
        </button>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <div className="animate-3d-float">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl glow-3d">
                  <Store className="w-12 h-12 text-white" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
              </div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-5xl lg:text-7xl font-bold mb-8 font-pixel bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent glow-3d">
              Страница скоро станет доступна
            </h1>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto mb-12 font-fira">
              В магазине вы сможете покупать и продавать готовые решения за секунды
            </p>
            
            {/* Features Preview */}
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="group bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 font-fira">Быстрые покупки</h3>
                <p className="text-gray-400 leading-relaxed font-fira text-sm">
                  Мгновенная покупка готовых решений одним кликом
                </p>
              </div>
              
              <div className="group bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 font-fira">Сообщество</h3>
                <p className="text-gray-400 leading-relaxed font-fira text-sm">
                  Продавайте свои решения тысячам пользователей
                </p>
              </div>
              
              <div className="group bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 transform hover:scale-105 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 font-fira">Экономия времени</h3>
                <p className="text-gray-400 leading-relaxed font-fira text-sm">
                  Не тратьте часы на создание того, что уже готово
                </p>
              </div>
            </div>
            
            {/* Coming Soon Badge */}
            <div className="mt-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full font-fira text-blue-300">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                Скоро открытие
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 