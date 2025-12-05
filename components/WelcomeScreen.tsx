import React from 'react';
import { BarChart3, MessageSquareText, Search, ShieldCheck, SendHorizontal } from 'lucide-react';

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

const suggestions = [
  "性价比高的机械键盘推荐",
  "适合办公的摄像头选哪个",
  "冬季暖手袋哪个更耐用"
];

const features = [
  { icon: ShieldCheck, label: "商品对比", color: "text-blue-600" },
  { icon: BarChart3, label: "问价格趋势", color: "text-green-600" },
  { icon: MessageSquareText, label: "看评价", color: "text-orange-600" },
  { icon: Search, label: "功能查找", color: "text-purple-600" },
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
  return (
    <div className="relative flex flex-col h-full overflow-y-auto pb-32">
      {/* Dynamic Background Blob */}
      <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-gradient-to-bl from-pink-200 via-pink-100 to-transparent rounded-bl-[100px] opacity-60 -z-10 pointer-events-none blur-xl"></div>
      
      {/* Decorative Blob Graphic (approximating the 'eyes' looking shape in screenshot 1) */}
      <div className="relative mt-12 px-6 mb-8 flex justify-end">
         <div className="w-48 h-48 bg-gradient-to-tr from-pink-300 to-pink-500 rounded-full blur-2xl opacity-20 absolute top-0 right-4"></div>
         {/* Simplified graphic representation */}
         <div className="w-40 h-40 bg-gradient-to-br from-pink-100 to-pink-400 rounded-[3rem] shadow-xl flex items-center justify-center transform rotate-12 opacity-90">
             <div className="flex gap-4">
                 <div className="w-8 h-12 bg-gray-800 rounded-full transform -rotate-12 opacity-80"></div>
                 <div className="w-8 h-12 bg-gray-800 rounded-full transform -rotate-12 opacity-80"></div>
             </div>
         </div>
      </div>

      <div className="px-6 mb-8">
        <h1 className="text-4xl font-normal text-gray-300 leading-tight">
          想挑点什么<br />
          <span className="text-pink-300">和我 说说?</span>
        </h1>
      </div>

      {/* Feature Grid */}
      <div className="px-6 mb-10">
        <h2 className="text-sm font-bold text-gray-900 mb-4">常用功能</h2>
        <div className="grid grid-cols-4 gap-4">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-gray-50">
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <span className="text-xs text-gray-600 font-medium">{f.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-6 space-y-3">
        <h2 className="text-sm font-bold text-gray-900 mb-2">可以这样问我哦~</h2>
        {suggestions.map((text, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(text)}
            className="w-full bg-gray-50 hover:bg-gray-100 active:bg-gray-200 p-4 rounded-xl flex items-center justify-between group transition-colors"
          >
            <span className="text-sm text-gray-700">{text}</span>
            <SendHorizontal className="w-4 h-4 text-gray-400 group-hover:text-pink-500" />
          </button>
        ))}
      </div>
    </div>
  );
};