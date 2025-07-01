import React, { useState, useRef, useEffect } from 'react'
import { Message } from '../lib/supabase'
import { Send, Loader2, Bot, User } from 'lucide-react'

interface ChatInterfaceProps {
  messages: Message[]
  onSendMessage: (content: string) => void
  loading: boolean
  chatTitle?: string
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  messages,
  onSendMessage,
  loading,
  chatTitle,
}) => {
  const [inputValue, setInputValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && !loading) {
      onSendMessage(inputValue.trim())
      setInputValue('')
    }
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border bg-muted/20 backdrop-blur-sm">
        <h2 className="font-semibold font-fira">
          {chatTitle || 'New Chat'}
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            <div className="text-center animate-3d-float">
              <div className="relative mb-4">
                <Bot className="w-12 h-12 mx-auto opacity-50" />
                <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
              </div>
              <h3 className="text-lg font-medium mb-2 font-fira">Start a conversation</h3>
              <p className="text-sm font-fira">Ask me anything and I'll help you out!</p>
            </div>
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message.id}
              className={`flex gap-3 animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div className={`flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`chat-bubble ${message.role} backdrop-blur-sm border ${
                  message.role === 'user' 
                    ? 'border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20' 
                    : 'border-gray-700/50 bg-gray-900/40'
                }`}>
                  <div className="font-fira text-sm leading-relaxed">
                    {message.content}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground mt-1 font-fira">
                  {formatTime(message.created_at)}
                </span>
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))
        )}

        {loading && (
          <div className="flex gap-3 justify-start animate-fade-in-up">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <div className="chat-bubble assistant backdrop-blur-sm border border-gray-700/50 bg-gray-900/40">
                <div className="flex items-center gap-2 font-fira">
                  <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-muted/20 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="input-field flex-1 bg-gray-800/50 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 font-fira"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !inputValue.trim()}
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold px-4 py-3 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center w-12 h-12 shadow-lg"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  )
} 