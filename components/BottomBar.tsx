import React, { useState } from 'react';
import { Mic, Disc, BarChart2, MessageSquare, Grid, Sparkles } from 'lucide-react';

interface BottomBarProps {
  onSend: (text: string) => void;
  isChatActive: boolean;
}

export const BottomBar: React.FC<BottomBarProps> = ({ onSend, isChatActive }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input);
      setInput('');
    }
  };

  const quickActions = [
    { icon: Sparkles, label: '商品对比', id: 'pk' },
    { icon: BarChart2, label: '问价格趋势', id: 'trend' },
    { icon: MessageSquare, label: '看评价', id: 'review' },
    { icon: Grid, label: '功能查找', id: 'features' },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe-area z-50">
      {/* Quick Actions ScrollView - Always visible when chat is active per screenshot 3 */}
      {isChatActive && (
        <div className="flex overflow-x-auto px-4 py-2 gap-2 no-scrollbar">
          {quickActions.map((action) => (
            <button
              key={action.id}
              className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg whitespace-nowrap active:scale-95 transition-transform"
            >
              <action.icon className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-medium text-gray-700">{action.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Mic className="w-6 h-6 text-gray-700" />
        </button>
        
        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="请输入你的问题"
            className="w-full bg-gray-100 text-gray-900 px-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-pink-100 placeholder:text-gray-400"
          />
        </form>

        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
           {/* Visual placeholder for the circle icon in Screenshot 3 */}
           <Disc className="w-6 h-6 text-gray-800" />
        </button>
      </div>
      
      {/* Safe area padding for newer iPhones */}
      <div className="h-4 bg-white"></div>
    </div>
  );
};