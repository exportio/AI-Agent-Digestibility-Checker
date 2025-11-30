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

export interface Finding {
  category: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
}

export interface AnalysisReport {
  url: string;
  score: number;
  summary: string;
  findings: Finding[];
  structureScore: number;
  metadataScore: number;
  llmScore: number;
  scannedAt: string;
}
