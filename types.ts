export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
  hasProductCard?: boolean;
}

export interface Product {
  id: string;
  title: string;
  price: string;
  tags: string[];
  image: string;
  commentCount: string;
  shopName: string;
}

export type ViewState = 'welcome' | 'chat';

export enum ThinkingStepStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  COMPLETED = 'completed'
}

export interface ThinkingStep {
  id: string;
  label: string;
  status: ThinkingStepStatus;
}