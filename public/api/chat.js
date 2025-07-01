// Mock API endpoint for OpenAI chat
// In production, this should be replaced with a real backend server

const ASSISTANT_ID = "asst_u8zmEXKQnJzGIssP4mcv6hf7"
const OPENAI_API_KEY = "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"

// Mock response for development
function mockResponse(question) {
  const responses = [
    `I understand you're asking about "${question}". This is a mock response since we're in development mode. In production, this would be a real response from the OpenAI Assistant.`,
    `That's an interesting question about "${question}". Let me help you with that. This is currently a mock response.`,
    `Regarding "${question}", here's what I can tell you. This is a development mock response.`,
    `I'd be happy to help with "${question}". This response is currently mocked for development purposes.`
  ]
  
  return responses[Math.floor(Math.random() * responses.length)]
}

// Handle POST requests to /api/chat
if (typeof window !== 'undefined') {
  // Client-side mock
  window.mockChatAPI = {
    async askAssistant(question, threadId) {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return {
        success: true,
        message: mockResponse(question),
        threadId: threadId || 'mock-thread-' + Date.now()
      }
    }
  }
}

// For server-side usage (Node.js/Express example)
if (typeof module !== 'undefined' && module.exports) {
  const { OpenAI } = require('openai')
  
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY })
  
  async function askAssistant(question, threadId) {
    try {
      let thread
      
      if (threadId) {
        // Add message to existing thread
        await openai.beta.threads.messages.create(threadId, {
          role: "user",
          content: question,
        })
        thread = { id: threadId }
      } else {
        // Create new thread
        thread = await openai.beta.threads.create({
          messages: [{ role: "user", content: question }],
        })
      }

      const run = await openai.beta.threads.runs.create({ 
        thread_id: thread.id, 
        assistant_id: ASSISTANT_ID 
      })
      
      let runStatus = await openai.beta.threads.runs.retrieve({ 
        thread_id: thread.id, 
        run_id: run.id 
      })

      while (runStatus.status !== "completed") {
        await new Promise(r => setTimeout(r, 1000))
        runStatus = await openai.beta.threads.runs.retrieve({ 
          thread_id: thread.id, 
          run_id: run.id 
        })
      }

      const messageList = await openai.beta.threads.messages.list({ 
        thread_id: thread.id 
      })
      const latestMessage = messageList.data[0]
      
      return {
        success: true,
        message: latestMessage.content[0].text.value,
        threadId: thread.id
      }
    } catch (error) {
      console.error('OpenAI API Error:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }
  
  module.exports = { askAssistant }
} 