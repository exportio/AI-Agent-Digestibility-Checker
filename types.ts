import React from 'react';

export interface Principle {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  content: string;
}