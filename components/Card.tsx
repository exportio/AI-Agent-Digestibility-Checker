import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, noPadding = false }) => {
  return (
    <div className={`bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden ${className}`}>
      {title && (
        <div className="px-6 pt-6 pb-2">
          <h3 className="text-xl font-display font-bold text-gray-900">{title}</h3>
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};