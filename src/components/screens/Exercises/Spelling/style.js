/**
 * Styles globaux partagés pour le module d'orthographe
 * Ces styles peuvent être utilisés à travers différents composants
 * pour maintenir une apparence cohérente
 */

import { StyleSheet, Platform } from 'react-native';

const globalStyles = StyleSheet.create({
  // Conteneurs principaux
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  
  // Écrans de chargement et d'erreur
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  
  // Effets d'ombre communs pour les cartes
  cardShadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  // Styles de carte communs
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  
  // Styles communs pour les boutons
  actionContainer: {
    padding: 20,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  actionButton: {
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  primaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  secondaryButton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Espacement commun
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  
  // Couleurs communes
  colors: {
    primary: '#3b82f6',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    text: {
      primary: '#1e293b',
      secondary: '#334155',
      tertiary: '#475569',
      muted: '#64748b',
    },
    background: {
      main: 'white',
      light: '#f8fafc',
      highlight: '#f1f5f9',
    },
    border: '#f1f5f9',
  },
  
  // Typographie commune
  text: {
    heading1: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#1e293b',
    },
    heading2: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#334155',
    },
    heading3: {
      fontSize: 16,
      fontWeight: '600',
      color: '#334155',
    },
    body: {
      fontSize: 15,
      color: '#475569',
      lineHeight: 22,
    },
    caption: {
      fontSize: 14,
      color: '#64748b',
    },
    small: {
      fontSize: 12,
      color: '#94a3b8',
    },
  },
});

export default globalStyles;