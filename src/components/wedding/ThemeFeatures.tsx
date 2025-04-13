
import React from 'react';
import { Flower } from 'lucide-react';

interface ThemeFeaturesProps {
  features: string[];
}

const ThemeFeatures: React.FC<ThemeFeaturesProps> = ({ features }) => {
  return (
    <div>
      <h3 className="font-medium mb-2">Features</h3>
      <ul className="space-y-1">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Flower className="h-4 w-4 text-wedding-pink" />
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeFeatures;
