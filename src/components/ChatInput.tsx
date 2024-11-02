import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  isTyping?: boolean;
}

const QUICK_ACTIONS = [
  { text: "Cho xem menu", icon: "📋" },
  { text: "Đặt 2 lốc Covang ship tới [địa chỉ]", icon: "🥤" },
  { text: "Freeship từ bao nhiêu tiền ?", icon: "🛵" },
  { text: "Có khuyến mãi gì không ?", icon: "🎁" }
];

const ChatInput: React.FC<ChatInputProps> = ({ onSend, isTyping = false }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const handleQuickAction = (text: string) => {
    onSend(text);
  };

  return (
    <div className="border-t bg-white">
      <div className="p-2 border-b">
        <div className="flex flex-wrap gap-2">
          {QUICK_ACTIONS.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.text)}
              disabled={isTyping}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{action.icon}</span>
              <span>{action.text}</span>
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isTyping}
            className="flex-1 rounded-lg border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isTyping}
            className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            {isTyping ? 'Thinking...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
