import React from 'react'
import { Chat } from '../lib/supabase'
import { MessageSquare, Plus, Trash2, Clock, Store } from 'lucide-react'

interface ChatListProps {
  chats: Chat[]
  selectedChatId: string | null
  onSelectChat: (chat: Chat) => void
  onCreateChat: () => void
  onDeleteChat: (chatId: string) => void
  onOpenMarketplace: () => void
}

export const ChatList: React.FC<ChatListProps> = ({
  chats,
  selectedChatId,
  onSelectChat,
  onCreateChat,
  onDeleteChat,
  onOpenMarketplace,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'short' })
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  return (
    <div className="w-80 bg-muted/30 border-r border-border flex flex-col backdrop-blur-sm">
      <div className="p-4 border-b border-border space-y-3">
        <button
          onClick={onCreateChat}
          className="btn-primary w-full flex items-center justify-center gap-2 font-fira"
        >
          <Plus className="w-4 h-4" />
          New Chat
        </button>
        
        <button
          onClick={onOpenMarketplace}
          className="w-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-lg font-medium hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 font-fira"
        >
          <Store className="w-4 h-4" />
          Marketplace
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-muted-foreground">
            <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="font-fira">No chats yet</p>
            <p className="text-sm font-fira">Start a new conversation</p>
          </div>
        ) : (
          <div className="p-2 space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group relative flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedChatId === chat.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'hover:bg-muted/50 hover:shadow-md'
                }`}
                onClick={() => onSelectChat(chat)}
              >
                <MessageSquare className="w-4 h-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate font-fira">{chat.title}</p>
                  <div className="flex items-center gap-1 text-xs opacity-70">
                    <Clock className="w-3 h-3" />
                    {formatDate(chat.updated_at)}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onDeleteChat(chat.id)
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-destructive/20 rounded"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 