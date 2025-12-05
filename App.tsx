import React, { useState, useRef, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { BottomBar } from './components/BottomBar';
import { ThinkingProcess } from './components/ThinkingProcess';
import { ProductCard } from './components/ProductCard';
import { streamGeminiResponse } from './services/geminiService';
import { Message, ViewState, Product } from './types';
import { ChevronLeft, MoreHorizontal, ShoppingCart, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

// Mock Product for the demo (Keyboard)
const MOCK_PRODUCT: Product = {
  id: 'kb-001',
  title: '似微醺键盘孟禹玷比比套件 磁吸碰珠...', // Creating a somewhat similar messy title from OCR
  price: '398.55',
  tags: ['领券满29享8.5折', '包邮'],
  image: 'https://picsum.photos/300/300?random=1', // Placeholder
  commentCount: '200+',
  shopName: 'Keychron'
};

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('welcome');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSendMessage = async (text: string) => {
    // 1. Switch View
    setView('chat');

    // 2. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text
    };
    setMessages(prev => [...prev, userMsg]);

    // 3. Set Thinking State (Show the animated checklist)
    setIsThinking(true);

    // 4. Determine if we should show a product card (Simple heuristic for demo)
    const showProduct = text.includes('键盘') || text.includes('推荐');

    // 5. Simulate network delay for the "Analysis" phase to match the UI animation
    //    We wait a bit before actually streaming text so the checklist has time to play.
    setTimeout(async () => {
      // Create a placeholder for the AI response
      const aiMsgId = (Date.now() + 1).toString();
      
      setMessages(prev => [
        ...prev, 
        { 
          id: aiMsgId, 
          role: 'model', 
          text: '', 
          hasProductCard: showProduct 
        }
      ]);

      // Start streaming
      await streamGeminiResponse(text, (chunkText) => {
        setIsThinking(false); // Stop the full-screen thinking view once text starts
        setMessages(prev => prev.map(msg => 
          msg.id === aiMsgId 
            ? { ...msg, text: msg.text + chunkText }
            : msg
        ));
      });
    }, 2500); // 2.5s delay to let the "Analysis" animation run a bit
  };

  const handleBack = () => {
    if (view === 'chat') {
      setView('welcome');
      setMessages([]); // Optional: clear history on exit
    }
  };

  return (
    <div className="flex flex-col h-full w-full relative bg-white font-sans text-gray-900 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
           <button onClick={handleBack} className="p-1 -ml-2">
             <ChevronLeft className="w-6 h-6 text-gray-800" />
           </button>
           {view === 'welcome' && (
             <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
               <span className="truncate max-w-[150px]">京东总部大厦1号楼</span>
               <ChevronLeft className="w-3 h-3 -rotate-90 ml-1" />
             </div>
           )}
        </div>
        
        <div className="flex items-center gap-4">
          <button><MessageSquareTextIcon /></button>
          <div className="relative">
             <ShoppingCart className="w-6 h-6 text-gray-800" />
             <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1 rounded-full border border-white">99+</span>
          </div>
          <Clock className="w-6 h-6 text-gray-800" />
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-white relative no-scrollbar">
        
        {view === 'welcome' && (
          <WelcomeScreen onSuggestionClick={handleSendMessage} />
        )}

        {view === 'chat' && (
          <div className="px-4 pb-32 pt-2">
            {messages.map((msg, index) => (
              <div key={msg.id} className={`mb-6 animate-fade-in ${msg.role === 'user' ? 'flex justify-end' : ''}`}>
                {msg.role === 'user' ? (
                  <div className="bg-pink-100 text-gray-900 px-4 py-3 rounded-2xl rounded-tr-none max-w-[85%]">
                    {msg.text}
                  </div>
                ) : (
                  <div className="max-w-full">
                    {/* Render Product Card if needed */}
                    {msg.hasProductCard && (
                       <ProductCard product={MOCK_PRODUCT} />
                    )}

                    {/* AI Text Content */}
                    <div className="prose prose-sm max-w-none text-gray-800 prose-headings:font-bold prose-headings:text-sm prose-p:leading-relaxed prose-strong:text-gray-900">
                      <ReactMarkdown>
                        {msg.text}
                      </ReactMarkdown>
                    </div>

                    {/* Guess You Like Chips (Bottom of AI message) */}
                    {!isThinking && msg.text.length > 20 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                         <p className="w-full text-xs font-bold text-gray-700 mb-1">猜你关心</p>
                         {['适合打字的静音红轴机械键盘', '带RGB灯效的游戏机械键盘推荐', '办公游戏两用的茶轴机械键盘'].map((tag, i) => (
                           <button key={i} onClick={() => handleSendMessage(tag)} className="text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                             {tag}
                           </button>
                         ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* Thinking Indicator (Visual Checklist) */}
            {isThinking && (
               <ThinkingProcess />
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {/* Persistent Bottom Bar */}
      <BottomBar onSend={handleSendMessage} isChatActive={view === 'chat'} />
    </div>
  );
};

// Helper Icon for Header
const MessageSquareTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    <path d="M13 8H7" />
    <path d="M17 12H7" />
  </svg>
);

export default App;