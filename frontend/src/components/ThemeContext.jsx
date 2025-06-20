// // components/ThemeContext.jsx
// "use client";

// import { createContext, useContext, useState } from 'react';

// const ThemeContext = createContext();

// export const ThemeProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     document.documentElement.setAttribute(
//       'data-theme',
//       !isDarkMode ? 'bw' : 'light'
//     );
//   };

//   return (
//     <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = () => {
//   const context = useContext(ThemeContext);
//   if (!context) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };




// components/ThemeContext.jsx
'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import AxiosInstance from "@/components/AxiosInstance";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // default to dark
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to get cookies
  const getCookie = (name) => {
    if (typeof document === 'undefined') return null; // SSR safety
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };

  // Initialize theme from user preference or cookie
  useEffect(() => {
    const initializeTheme = async () => {
      try {
        setIsLoading(true);
        
        // 1. Check for cookie first
        const cookieTheme = getCookie('user_theme');
        if (cookieTheme) {
          setTheme(cookieTheme);
          return;
        }

        // 2. If no cookie, fetch user preference from backend
        const response = await AxiosInstance.get('/user/theme'); // Changed endpoint to be more RESTful
        if (response.data?.theme) {
          setTheme(response.data.theme);
        }
      } catch (error) {
        console.error('Error fetching theme preference:', error);
        // Fallback to dark theme if error occurs
        setTheme('dark');
      } finally {
        setIsLoading(false);
      }
    };

    initializeTheme();
  }, []);

  // Apply theme to HTML element whenever theme changes
  useEffect(() => {
    if (typeof document !== 'undefined') { // SSR safety
      document.documentElement.setAttribute('data-theme', theme);
      // Optionally save to cookie
      document.cookie = `user_theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}`;
    }
  }, [theme]);

  const toggleTheme = async (newTheme) => {
    const oldTheme = theme;
    
    // Optimistically update the UI first
    setTheme(newTheme);
    
    try {
      await AxiosInstance.post('/user/theme', { 
        theme: newTheme 
      }, {
        headers: {
          'X-CSRFToken': getCookie('csrftoken'),
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Error saving theme preference:', error);
      // Revert if there's an error
      setTheme(oldTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isLoading }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};