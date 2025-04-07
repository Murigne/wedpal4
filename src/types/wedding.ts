
export interface WeddingTheme {
  id: string;
  name: string;
  description: string;
  priceRange: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamily: string;
  features: string[];
  sampleImage?: string;
  bestFor: string;
}

export interface WeddingTemplatesProps {
  userBudget: string;
  userPreferences: Record<string, any>;
  userColors: string[];
  className?: string;
}
