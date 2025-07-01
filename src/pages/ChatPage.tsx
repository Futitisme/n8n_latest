import React, { useState, useEffect } from 'react'
import { supabase, Chat, Message } from '../lib/supabase'
import { askAssistant, mockAskAssistant } from '../lib/openai'
import { ChatList } from '../components/ChatList'
import { ChatInterface } from '../components/ChatInterface'
import { MatrixBackground } from '../components/MatrixBackground'
import { MarketplacePage } from './MarketplacePage'
import { LogOut, Loader2 } from 'lucide-react'

interface ChatPageProps {
  onLogout: () => void
}

export const ChatPage: React.FC<ChatPageProps> = ({ onLogout }) => {
  const [chats, setChats] = useState<Chat[]>([])
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [showMarketplace, setShowMarketplace] = useState(false)

  useEffect(() => {
    // Get current user
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        fetchChats(user.id)
      }
    }
    getUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user) {
          setUser(session.user)
          fetchChats(session.user.id)
        } else {
          setUser(null)
          onLogout()
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [onLogout])

  const fetchChats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false })

      if (error) throw error
      setChats(data || [])
    } catch (error) {
      console.error('Error fetching chats:', error)
    }
  }

  const fetchMessages = async (chatId: string) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('created_at', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  const createChat = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert({
          user_id: user.id,
          title: 'New Chat',
        })
        .select()
        .single()

      if (error) throw error

      setChats(prev => [data, ...prev])
      setSelectedChat(data)
      setMessages([])
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }

  const deleteChat = async (chatId: string) => {
    try {
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)

      if (error) throw error

      setChats(prev => prev.filter(chat => chat.id !== chatId))
      
      if (selectedChat?.id === chatId) {
        setSelectedChat(null)
        setMessages([])
      }
    } catch (error) {
      console.error('Error deleting chat:', error)
    }
  }

  const selectChat = (chat: Chat) => {
    setSelectedChat(chat)
    fetchMessages(chat.id)
  }

  const sendMessage = async (content: string) => {
    if (!selectedChat || !user) return

    setLoading(true)

    try {
      // Add user message to database
      const { data: userMessage, error: userError } = await supabase
        .from('messages')
        .insert({
          chat_id: selectedChat.id,
          role: 'user',
          content,
        })
        .select()
        .single()

      if (userError) throw userError

      // Update chat title if it's the first message
      if (messages.length === 0) {
        const { error: updateError } = await supabase
          .from('chats')
          .update({ title: content.slice(0, 50) + (content.length > 50 ? '...' : '') })
          .eq('id', selectedChat.id)

        if (updateError) throw updateError

        setChats(prev => prev.map(chat => 
          chat.id === selectedChat.id 
            ? { ...chat, title: content.slice(0, 50) + (content.length > 50 ? '...' : '') }
            : chat
        ))
      }

      // Get assistant response
      const response = await mockAskAssistant(content) // Use mockAskAssistant for now

      if (response.success && response.message) {
        // Add assistant message to database
        const { error: assistantError } = await supabase
          .from('messages')
          .insert({
            chat_id: selectedChat.id,
            role: 'assistant',
            content: response.message,
          })

        if (assistantError) throw assistantError

        // Update chat's updated_at timestamp
        await supabase
          .from('chats')
          .update({ updated_at: new Date().toISOString() })
          .eq('id', selectedChat.id)

        // Refresh messages and chats
        fetchMessages(selectedChat.id)
        fetchChats(user.id)
      } else {
        throw new Error(response.error || 'Failed to get response')
      }
    } catch (error) {
      console.error('Error sending message:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    onLogout()
  }

  const handleOpenMarketplace = () => {
    setShowMarketplace(true)
  }

  const handleBackFromMarketplace = () => {
    setShowMarketplace(false)
  }

  if (showMarketplace) {
    return <MarketplacePage onBack={handleBackFromMarketplace} />
  }

  return (
    <div className="h-screen flex relative perspective-3d">
      <MatrixBackground />
      
      {/* Subtle floating elements for chat page */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/6 left-1/6 w-2 h-2 bg-blue-400 rounded-full opacity-10 animate-3d-float"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-15 animate-3d-float" style={{ animationDelay: '3s' }}></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-12 animate-3d-float" style={{ animationDelay: '6s' }}></div>
      </div>
      
      <div className="relative z-10 flex flex-1">
        <ChatList
          chats={chats}
          selectedChatId={selectedChat?.id || null}
          onSelectChat={selectChat}
          onCreateChat={createChat}
          onDeleteChat={deleteChat}
          onOpenMarketplace={handleOpenMarketplace}
        />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border bg-muted/20 backdrop-blur-sm flex items-center justify-between">
            <h1 className="text-xl font-semibold font-fira">AI Chat Assistant</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground font-fira">
                {user?.email}
              </span>
              <button
                onClick={handleLogout}
                className="btn-secondary flex items-center gap-2 font-fira"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>

          {/* Chat Interface */}
          {selectedChat ? (
            <ChatInterface
              messages={messages}
              onSendMessage={sendMessage}
              loading={loading}
              chatTitle={selectedChat.title}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center animate-3d-float">
                <h3 className="text-lg font-medium mb-2 font-fira">Select a chat or start a new one</h3>
                <p className="text-sm font-fira">Choose from your existing conversations or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 