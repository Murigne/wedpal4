
import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  themeColors: [string, string];
  setThemeColors: (colors: [string, string]) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Default blue and pink theme colors
  const [themeColors, setThemeColors] = useState<[string, string]>(['#1EAEDB', '#D946EF']);

  // Load theme colors from localStorage if they exist
  useEffect(() => {
    const savedTheme = localStorage.getItem('weddingAppTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        if (Array.isArray(parsedTheme) && parsedTheme.length === 2) {
          setThemeColors(parsedTheme as [string, string]);
        }
      } catch (error) {
        console.error('Error parsing saved theme:', error);
      }
    }
  }, []);

  // Apply the theme colors to the root element
  useEffect(() => {
    document.documentElement.style.setProperty('--theme-gradient-start', themeColors[0]);
    document.documentElement.style.setProperty('--theme-gradient-end', themeColors[1]);
    
    // Save the theme colors to localStorage
    localStorage.setItem('weddingAppTheme', JSON.stringify(themeColors));
  }, [themeColors]);

  return (
    <ThemeContext.Provider value={{ themeColors, setThemeColors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
