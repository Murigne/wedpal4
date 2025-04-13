
import React from 'react';
import { Book, Cake, Calendar, Flower, Gift, Heart, Utensils } from 'lucide-react';
import { WeddingTheme } from './ThemeGenerator';

interface ThemePreviewProps {
  theme: WeddingTheme;
}

const ThemePreview: React.FC<ThemePreviewProps> = ({ theme }) => {
  const sectionStyle = {
    fontFamily: theme.fontFamily || "'Quicksand', sans-serif",
    color: theme.accentColor === '#FFFFFF' ? '#333333' : theme.accentColor
  };

  return (
    <div className="space-y-6">
      {/* Header with theme name */}
      <div 
        className="text-center p-4 rounded-lg mb-4"
        style={{
          background: `linear-gradient(135deg, ${theme.primaryColor}, ${theme.secondaryColor})`,
          color: theme.accentColor,
          fontFamily: theme.fontFamily || "'Quicksand', sans-serif",
        }}
      >
        <h2 className="text-2xl font-bold">{theme.name}</h2>
        <p>{theme.description}</p>
      </div>
      
      {/* Sample sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Invitation Sample */}
        <div className="border rounded-lg p-4 shadow-sm" style={sectionStyle}>
          <div className="flex items-center mb-2 gap-2">
            <Book className="h-5 w-5" style={{ color: theme.primaryColor }} />
            <h3 className="font-medium">Sample Invitation</h3>
          </div>
          <div 
            className="p-4 border rounded-md text-center"
            style={{ 
              backgroundColor: `${theme.primaryColor}20`,
              borderColor: theme.primaryColor 
            }}
          >
            <p className="text-sm mb-2">Mr. & Mrs. Johnson</p>
            <p className="font-bold mb-2">Request the pleasure of your company</p>
            <p>at the wedding of their daughter</p>
            <p className="my-2" style={{ fontFamily: theme.fontFamily || "'Dancing Script', cursive" }}>
              <span className="text-xl">Emily & Michael</span>
            </p>
            <div className="flex justify-center items-center gap-2 my-2">
              <Calendar className="h-4 w-4" style={{ color: theme.primaryColor }} />
              <p>Saturday, June 15, 2025</p>
            </div>
          </div>
        </div>

        {/* Table Setting */}
        <div className="border rounded-lg p-4 shadow-sm" style={sectionStyle}>
          <div className="flex items-center mb-2 gap-2">
            <Utensils className="h-5 w-5" style={{ color: theme.primaryColor }} />
            <h3 className="font-medium">Table Setting</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: theme.primaryColor }}
              ></div>
              <p>Napkin with floral accent</p>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-8 h-8 rounded-full"
                style={{ backgroundColor: theme.secondaryColor }}
              ></div>
              <p>Tablecloth with subtle pattern</p>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="h-4 w-4 bg-white border-2 rounded-sm"
                style={{ borderColor: theme.primaryColor }}
              ></div>
              <p>Place cards with custom calligraphy</p>
            </div>
          </div>
        </div>

        {/* Decorations */}
        <div className="border rounded-lg p-4 shadow-sm" style={sectionStyle}>
          <div className="flex items-center mb-2 gap-2">
            <Flower className="h-5 w-5" style={{ color: theme.primaryColor }} />
            <h3 className="font-medium">Decorations</h3>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col items-center p-2 border rounded-md" style={{ borderColor: `${theme.primaryColor}50` }}>
              <Flower className="h-8 w-8 mb-1" style={{ color: theme.primaryColor }} />
              <p className="text-sm text-center">Floral arrangements</p>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md" style={{ borderColor: `${theme.secondaryColor}50` }}>
              <Gift className="h-8 w-8 mb-1" style={{ color: theme.secondaryColor }} />
              <p className="text-sm text-center">Guest favors</p>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md" style={{ borderColor: `${theme.primaryColor}50` }}>
              <Cake className="h-8 w-8 mb-1" style={{ color: theme.primaryColor }} />
              <p className="text-sm text-center">Wedding cake</p>
            </div>
            <div className="flex flex-col items-center p-2 border rounded-md" style={{ borderColor: `${theme.secondaryColor}50` }}>
              <Heart className="h-8 w-8 mb-1" style={{ color: theme.secondaryColor }} />
              <p className="text-sm text-center">Ceremony arch</p>
            </div>
          </div>
        </div>

        {/* Color Palette */}
        <div className="border rounded-lg p-4 shadow-sm" style={sectionStyle}>
          <div className="flex items-center mb-2 gap-2">
            <Heart className="h-5 w-5" style={{ color: theme.primaryColor }} />
            <h3 className="font-medium">Color Palette</h3>
          </div>
          <div className="grid grid-cols-3 gap-2 mb-2">
            <div className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-full mb-1 border"
                style={{ backgroundColor: theme.primaryColor }}
              ></div>
              <p className="text-xs">Primary</p>
            </div>
            <div className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-full mb-1 border"
                style={{ backgroundColor: theme.secondaryColor }}
              ></div>
              <p className="text-xs">Secondary</p>
            </div>
            <div className="flex flex-col items-center">
              <div 
                className="w-12 h-12 rounded-full mb-1 border"
                style={{ backgroundColor: theme.accentColor }}
              ></div>
              <p className="text-xs">Accent</p>
            </div>
          </div>
          <p className="text-sm italic mt-2">Perfect for {theme.bestFor.toLowerCase()}</p>
        </div>
      </div>
    </div>
  );
};

export default ThemePreview;
