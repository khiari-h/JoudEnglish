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