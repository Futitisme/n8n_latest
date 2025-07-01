<<<<<<< HEAD
# AI Chat Assistant

A sleek, dark-themed chat application built with React, TypeScript, and Supabase that allows users to chat with a custom OpenAI Assistant.

## Features

- 🔐 **User Authentication** - Secure login/registration with Supabase
- 💬 **Chat Interface** - Real-time messaging with message history
- 🤖 **OpenAI Assistant Integration** - Powered by custom OpenAI Assistant
- 🎨 **Dark Theme** - Ultra-minimal UI with matrix-style animated background
- 📱 **Responsive Design** - Works on desktop and mobile devices
- 🔄 **Real-time Updates** - Live chat updates and notifications

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **AI**: OpenAI Assistant API
- **Styling**: Tailwind CSS with custom dark theme
- **Icons**: Lucide React

## Prerequisites

- Node.js 16+ and npm
- Supabase account and project
- OpenAI API key

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd ai-chat-assistant
npm install
```

### 2. Supabase Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from the project settings
3. Run the following SQL in your Supabase SQL editor:

```sql
-- Create chats table
CREATE TABLE IF NOT EXISTS chats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  thread_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_id UUID REFERENCES chats(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_chats_user_id ON chats(user_id);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);

-- Enable Row Level Security
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own chats" ON chats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own chats" ON chats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own chats" ON chats
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own chats" ON chats
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view messages from their chats" ON messages
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert messages to their chats" ON messages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND chats.user_id = auth.uid()
    )
  );
```

### 3. Environment Configuration

The application is already configured with the provided Supabase credentials:

- Project URL: `https://dnqjxrstzghtvcxzjdti.supabase.co`
- API Key: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRucWp4cnN0emdodHZjeHpqZHRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAxOTk0MDEsImV4cCI6MjA2NTc3NTQwMX0.Jfk2T4JLJklWM4m-yjFcBB9VsuKVBKyMydG7xf1QHf4`

### 4. OpenAI Assistant Setup

The application is configured to use the provided Assistant ID: `asst_u8zmEXKQnJzGIssP4mcv6hf7`

### 5. Start the Development Server

```bash
npm start
```

The application will be available at `http://localhost:3000`

## Usage

1. **Register/Login**: Create an account or sign in with existing credentials
2. **Create Chat**: Click "New Chat" to start a conversation
3. **Send Messages**: Type your message and press Enter or click Send
4. **Manage Chats**: View, select, and delete chats from the sidebar
5. **Logout**: Click the logout button to sign out

## Development Notes

### Mock API

The application currently uses a mock API for the OpenAI Assistant integration. To use the real OpenAI API:

1. Replace the mock implementation in `src/lib/openai.ts`
2. Set up a backend server (Node.js/Express recommended)
3. Implement the `/api/chat` endpoint using the provided OpenAI credentials

### Styling

The application uses a custom dark theme with:
- Background: `#0a0a0a`
- Primary: `#ffffff`
- Muted: `#1a1a1a`
- Border: `#27272a`

### Matrix Background

The animated matrix-style background is implemented using CSS transforms and gradients for optimal performance.

## Project Structure

```
src/
├── components/          # React components
│   ├── AuthForm.tsx    # Login/registration form
│   ├── ChatInterface.tsx # Main chat interface
│   ├── ChatList.tsx    # Chat sidebar
│   └── MatrixBackground.tsx # Animated background
├── lib/                # Utilities and configurations
│   ├── supabase.ts     # Supabase client
│   └── openai.ts       # OpenAI integration
├── pages/              # Page components
│   ├── LoginPage.tsx   # Authentication page
│   └── ChatPage.tsx    # Main chat page
├── App.tsx             # Main app component
├── index.tsx           # App entry point
└── index.css           # Global styles
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with default settings

### Netlify

1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support and questions, please open an issue on GitHub. 
=======
# n8n_app
>>>>>>> 64a9aebb1876eadf2902ce7a0af3cbe7d7f5c573
