// Dashboard/styles/theme.js (version complète et corrigée)
const theme = {
    colors: {
      primary: "#5E60CE",
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
      }
    },
    spacing: {
      xs: 5,
      sm: 10,
      md: 15,
      lg: 20,
      xl: 30
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
      xs: 4,
      sm: 10,
      md: 15,
      lg: 20,
      xl: 25
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