'use client';

import { motion } from 'framer-motion';

interface Feature {
  id: string;
  title: string;
  description: string;
}

interface FeatureCardProps {
  feature: Feature;
  onClick: () => void;
}

export default function FeatureCard({ feature, onClick }: FeatureCardProps) {
  // Emoji mapping for features
  const emojiMap: Record<string, string> = {
    merge: '➕',
    split: '✂️',
    compress: '📉',
    'pdf-to-word': '📝',
    'word-to-pdf': '📄',
    'pdf-to-image': '🖼️',
    'image-to-pdf': '🖼️',
    sign: '✍️',
    'delete-pages': '🗑️',
    'pdf-to-excel': '📊',
    'fill-form': '✅',
  };

  return (
    <motion.div
      whileHover={{ 
        scale: 1.02,
        y: -5
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
    >
      <div className="flex items-start space-x-4">
        <div className="p-3 rounded-lg bg-gray-100 text-2xl">
          {emojiMap[feature.id] || '📄'}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {feature.description}
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex items-center justify-between">
        <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
          Ücretsiz
        </div>
        <div className="text-blue-600 text-sm font-medium">
          Başla →
        </div>
      </div>
    </motion.div>
  );
} 