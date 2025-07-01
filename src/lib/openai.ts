const ASSISTANT_ID = "asst_u8zmEXKQnJzGIssP4mcv6hf7"
const OPENAI_API_KEY = "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"

export interface OpenAIResponse {
  success: boolean
  message?: string
  error?: string
}

export async function askAssistant(question: string, threadId?: string): Promise<OpenAIResponse> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        threadId,
        assistantId: ASSISTANT_ID,
      }),
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to get response from assistant')
    }

    return {
      success: true,
      message: data.message,
    }
  } catch (error) {
    console.error('Error asking assistant:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

// For development/testing purposes, you can create a simple mock function
export async function mockAskAssistant(question: string): Promise<OpenAIResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return {
    success: true,
    message: `This is a mock response to: "${question}". In production, this would be replaced with the actual OpenAI API call.`,
  }
} 