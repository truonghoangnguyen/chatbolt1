import React, { useState, useEffect, useRef } from 'react'
import ChatMessage from './components/ChatMessage'
import ChatInput from './components/ChatInput'
import { Message } from './types/chat'
import { generateChatResponse } from './utils/chatbot'

function App() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Dạ, Covang xin chào',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [isTyping, setIsTyping] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setIsTyping(true)

    try {
      // Get bot response
      const response = await generateChatResponse(text)
      console.log(text);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error generating response:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isTyping && (
          <div className="text-gray-500 italic">Bot is typing...</div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t">
        <ChatInput onSend={handleSendMessage} isTyping={isTyping} />
      </div>
    </div>
  )
}

export default App
