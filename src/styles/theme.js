// Dashboard/styles/theme.js (version complète et corrigée)
const theme = {
    colors: {
      primary: {
        light: '#f1f5f9',
        main: '#64748b',
        dark: '#334155',
      },
      secondary: "#6930C3",
      accent: "#7764E4",
      background: "#F9FAFB",
      white: "#FFFFFF",
      black: "#000000",
      border: "#E5E7EB",
      text: {
        dark: "#1F2937",
        medium: "#4B5563",
        light: "#6B7280"
      },
      challenge: {
        badge: "#FEF3C7",
        badgeText: "#D97706"
      },
      success: {
        light: '#f0fdf4',
        main: '#22c55e',
      },
      error: {
        light: '#fef2f2', 
        main: '#ef4444',
      }
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32
    },
    fontSize: {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
      xxxl: 22
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      full: 9999
    },
    // Ajout des propriétés shadows manquantes
    shadows: {
      android: {
        small: { elevation: 2 },
        medium: { elevation: 3 },
        large: { elevation: 5 }
      },
      ios: {
        small: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.1,
          shadowRadius: 2,
        },
        medium: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        large: {
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
        }
      }
    },
    constants: {
      levels: {
        A1: 'A1',
        A2: 'A2',
        B1: 'B1',
        B2: 'B2',
        C1: 'C1',
        C2: 'C2'
      }
    }
  };
  
  // Fonction de sécurité pour accéder aux valeurs
  theme.get = (path, defaultValue) => {
    return path.split('.').reduce((acc, part) => 
      acc && acc[part] !== undefined ? acc[part] : defaultValue, 
      theme
    );
  };
  
  export default theme;