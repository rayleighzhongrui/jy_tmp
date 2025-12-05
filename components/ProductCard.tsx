import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white p-3 rounded-xl flex gap-3 mb-4 shadow-sm border border-gray-100">
      {/* Image */}
      <div className="relative w-28 h-28 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 bg-gray-900/60 text-white text-[10px] px-1 py-0.5 rounded-br-lg">
           广告
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight mb-1">
            {product.title}
          </h3>
          <p className="text-xs text-[#E8964C] font-medium mb-1">4400+人种草</p>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {product.tags.map((tag, i) => (
              <span key={i} className="text-[10px] text-[#E8964C] border border-[#E8964C] px-1 rounded-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-[#f23030] font-bold">¥</span>
            <span className="text-lg text-[#f23030] font-bold">{product.price}</span>
            <span className="text-xs text-[#f23030]">到手价</span>
          </div>
          
          <div className="flex items-center gap-2">
             <span className="text-[10px] text-pink-500 font-medium">200+评价总结</span>
             <button className="bg-pink-50 p-1 rounded-full">
                <Plus className="w-3 h-3 text-pink-500" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};