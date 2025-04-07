
import { WeddingTheme } from '@/types/wedding';

/**
 * Generate templates based on user preferences
 */
export const generateTemplates = (
  budget: string,
  preferences: Record<string, any>,
  userColors: string[]
): WeddingTheme[] => {
  // Use user's colors when available, or fall back to defaults
  const primaryColor = userColors[0] || "#FAD2E1";
  const secondaryColor = userColors[1] || "#F8BBD0";
  const accentColor = userColors[2] || "#FFFFFF";
  
  // Budget estimate (convert text range to numeric values for comparison)
  const budgetValue = typeof budget === 'string' && budget.includes('-') 
    ? parseInt(budget.split('-')[0].replace(/\D/g, ''), 10)
    : parseInt((budget || "0").replace(/\D/g, ''), 10);
  
  const isLowBudget = budgetValue < 10000;
  const isHighBudget = budgetValue > 30000;

  return [
    {
      id: "elegant",
      name: "Elegant Classic",
      description: "Timeless elegance with refined details",
      priceRange: isLowBudget ? "Budget-Friendly" : isHighBudget ? "Premium" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Playfair Display', serif",
      features: [
        "Traditional ceremony setup",
        "Classic floral arrangements",
        "Elegant table settings",
        "Formal photography style",
        "String quartet music"
      ],
      bestFor: "Couples who appreciate timeless traditions"
    },
    {
      id: "rustic",
      name: "Rustic Charm",
      description: "Warm and cozy with natural elements",
      priceRange: isLowBudget ? "Budget-Friendly" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Quicksand', sans-serif",
      features: [
        "Barn or outdoor venue setting",
        "Wildflower arrangements",
        "Mason jar decorations",
        "Family-style dining",
        "Acoustic live music"
      ],
      bestFor: "Nature-loving couples seeking a relaxed atmosphere"
    },
    {
      id: "modern",
      name: "Modern Minimalist",
      description: "Clean lines with contemporary touches",
      priceRange: isLowBudget ? "Moderate" : "Premium",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Montserrat', sans-serif",
      features: [
        "Geometric decor elements",
        "Monochromatic color scheme",
        "Architectural venue",
        "Plated gourmet menu",
        "DJ with lighting design"
      ],
      bestFor: "Contemporary couples with sophisticated taste"
    },
    {
      id: "romantic",
      name: "Romantic Garden",
      description: "Dreamy and enchanting with lush details",
      priceRange: isHighBudget ? "Premium" : "Moderate",
      primaryColor,
      secondaryColor,
      accentColor,
      fontFamily: "'Dancing Script', cursive",
      features: [
        "Flower-filled garden venue",
        "Abundant floral installations",
        "Candle-lit atmosphere",
        "Multi-course dining experience",
        "Live band with dance floor"
      ],
      bestFor: "Hopeless romantics seeking a fairy-tale experience"
    },
    {
      id: "bohemian",
      name: "Bohemian",
      description: "Free-spirited with eclectic touches",
      priceRange: isLowBudget ? "Budget-Friendly" : "Moderate",
      primaryColor: "#E3B587",
      secondaryColor: "#D6875F",
      accentColor: "#FFFFFF",
      fontFamily: "'Amatic SC', cursive",
      features: [
        "Outdoor ceremony",
        "Macramé decorations",
        "Pampas grass arrangements",
        "Moroccan-inspired lounge",
        "Food trucks or grazing tables",
        "Polaroid guest book"
      ],
      bestFor: "Free-spirited couples who love personal touches"
    },
    {
      id: "destination",
      name: "Destination",
      description: "Exotic location with vacation vibes",
      priceRange: isHighBudget ? "Premium" : "High",
      primaryColor: "#77C3EC",
      secondaryColor: "#2E86AB",
      accentColor: "#FFFFFF",
      fontFamily: "'Lato', sans-serif",
      features: [
        "Beachfront or exotic venue",
        "Multi-day celebration",
        "Local cultural elements",
        "Curated guest experiences",
        "Travel coordination",
        "Welcome bags/gifts"
      ],
      bestFor: "Adventure-seeking couples who love travel"
    }
  ];
};
