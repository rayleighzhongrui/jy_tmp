import React, { useEffect, useState } from 'react';
import { ThinkingStep, ThinkingStepStatus } from '../types';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';

export const ThinkingProcess: React.FC = () => {
  const [steps, setSteps] = useState<ThinkingStep[]>([
    { id: '1', label: '分析用户需求 (Analyze User Needs)', status: ThinkingStepStatus.ACTIVE },
    { id: '2', label: '购物助手 (Shopping Assistant)', status: ThinkingStepStatus.PENDING },
    { id: '3', label: '百科能手 (Knowledge Base)', status: ThinkingStepStatus.PENDING },
    { id: '4', label: '需求优化师 (Refining Requirements)', status: ThinkingStepStatus.PENDING },
  ]);
  const [timer, setTimer] = useState(0);

  // Simulate the progress through steps
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 0.1);
    }, 100);

    const stepTimings = [800, 1600, 2400, 3200]; // ms to switch steps

    stepTimings.forEach((timing, index) => {
      setTimeout(() => {
        setSteps((prev) => {
          const newSteps = [...prev];
          // Mark current as complete
          if (index > 0) newSteps[index - 1].status = ThinkingStepStatus.COMPLETED;
          // Mark next as active
          if (newSteps[index]) newSteps[index].status = ThinkingStepStatus.ACTIVE;
          return newSteps;
        });
      }, timing);
    });

    // All complete
    setTimeout(() => {
        setSteps(prev => prev.map(s => ({...s, status: ThinkingStepStatus.COMPLETED})));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-4 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <div className="flex space-x-1">
          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce"></span>
          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-75"></span>
          <span className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce delay-150"></span>
        </div>
        <span className="text-gray-500 text-sm">思考中 用时: {timer.toFixed(1)}s</span>
      </div>

      <div className="space-y-3 pl-1">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3">
            <div className="mt-0.5">
              {step.status === ThinkingStepStatus.COMPLETED && (
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              )}
              {step.status === ThinkingStepStatus.ACTIVE && (
                <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
              )}
              {step.status === ThinkingStepStatus.PENDING && (
                <Circle className="w-4 h-4 text-gray-300" />
              )}
            </div>
            <div className={`text-sm ${step.status === ThinkingStepStatus.PENDING ? 'text-gray-400' : 'text-gray-700'}`}>
              <p className="font-medium text-xs leading-none mb-1">{step.label.split('(')[0]}</p>
              {step.status === ThinkingStepStatus.ACTIVE && (
                <p className="text-xs text-gray-400">正在分析您的真实需求中...</p>
              )}
               {step.status === ThinkingStepStatus.COMPLETED && step.id === '2' && (
                <p className="text-xs text-gray-400 line-clamp-2">综合对比商品的用户评价、物流履约和售后保障后，根据用户对性价比高的...</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};