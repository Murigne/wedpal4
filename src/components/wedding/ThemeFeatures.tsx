
import React from 'react';
import { Flower } from 'lucide-react';

interface ThemeFeaturesProps {
  features: string[];
  compact?: boolean;
}

const ThemeFeatures: React.FC<ThemeFeaturesProps> = ({ features, compact = false }) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Features</h3>
      <ul className={`${compact ? 'space-y-0.5' : 'space-y-1'}`}>
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Flower className={`${compact ? 'h-3 w-3' : 'h-4 w-4'} text-wedding-pink`} />
            <span className={compact ? 'text-sm' : ''}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeFeatures;
