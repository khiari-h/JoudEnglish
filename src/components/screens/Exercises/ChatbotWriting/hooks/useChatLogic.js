import { useState, useEffect, useRef } from 'react';
import { Animated } from 'react-native';

/**
 * Hook personnalisé gérant toute la logique de chat
 * @param {Object} params - Paramètres du hook
 * @param {Array} params.allScenarios - Liste des scénarios disponibles
 * @param {number} params.selectedScenarioIndex - Index du scénario sélectionné
 * @param {string} params.levelColor - Couleur du niveau actuel
 * @param {string} params.message - Message actuel dans l'input
 * @param {Function} params.setMessage - Fonction pour mettre à jour le message
 * @returns {Object} - État et fonctions pour gérer le chat
 */
const useChatLogic = ({
  allScenarios,
  selectedScenarioIndex,
  levelColor,
  message,
  setMessage,
}) => {
  const [conversation, setConversation] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [completionProgress, setCompletionProgress] = useState(0);
  const typingAnimation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  // Démarrer une conversation lorsque le scénario sélectionné change
  useEffect(() => {
    if (allScenarios.length > 0) {
      startConversation();
    }
  }, [allScenarios, selectedScenarioIndex]);

  /**
   * Animation pour l'indicateur de frappe
   */
  const startTypingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(typingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  /**
   * Mettre à jour la progression basée sur l'étape actuelle
   */
  const updateProgress = () => {
    const currentScenario = allScenarios[selectedScenarioIndex];
    if (currentScenario && currentScenario.steps) {
      const progress = (currentStep / currentScenario.steps.length) * 100;
      setCompletionProgress(progress);
    }
  };

  /**
   * Démarrer une nouvelle conversation
   */
  const startConversation = () => {
    if (allScenarios.length === 0 || !allScenarios[selectedScenarioIndex]) return;

    // Réinitialiser l'état
    setConversation([]);
    setCurrentStep(0);
    setCompletionProgress(0);
    setSuggestions([]);

    // Commencer la conversation
    setTimeout(() => {
      setIsTyping(true);
      startTypingAnimation();

      setTimeout(() => {
        const currentScenario = allScenarios[selectedScenarioIndex];
        if (currentScenario.steps && currentScenario.steps.length > 0) {
          setConversation([
            {
              id: 1,
              text: currentScenario.steps[0].botMessage,
              sender: "bot",
              timestamp: new Date().toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
            },
          ]);
          
          // Définir les suggestions pour la première étape
          if (currentScenario.steps[0].suggestions) {
            setSuggestions(currentScenario.steps[0].suggestions);
          } else {
            setSuggestions([]);
          }
          
          setIsTyping(false);

          // Mettre à jour la progression
          updateProgress();
        }
      }, 1500);
    }, 500);
  };

  /**
   * Envoyer un message utilisateur et traiter la réponse du bot
   * @returns {Object|null} - Résultat de l'opération, avec état de complétion
   */
  const handleSendMessage = () => {
    if (message.trim() === "") return null;

    const currentScenario = allScenarios[selectedScenarioIndex];
    if (!currentScenario || !currentScenario.steps) return null;

    // Ajouter le message de l'utilisateur à la conversation
    const newMessage = {
      id: conversation.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setConversation([...conversation, newMessage]);
    setMessage("");
    setSuggestions([]);

    // Vérifier s'il y a d'autres étapes dans le scénario
    if (currentStep < currentScenario.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);

      // Simuler la frappe du bot
      setIsTyping(true);
      startTypingAnimation();

      // Après un délai, envoyer la réponse du bot
      setTimeout(() => {
        const botResponse = {
          id: conversation.length + 2,
          text: currentScenario.steps[nextStep].botMessage,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setConversation((prev) => [...prev, botResponse]);
        
        // Mettre à jour les suggestions
        if (currentScenario.steps[nextStep].suggestions) {
          setSuggestions(currentScenario.steps[nextStep].suggestions);
        } else {
          setSuggestions([]);
        }
        
        setIsTyping(false);

        // Mettre à jour la progression
        updateProgress();
      }, 1500);
      
      return { conversationComplete: false };
    } else {
      // Fin de la conversation
      setTimeout(() => {
        // Progression terminée
        setCompletionProgress(100);
      }, 1000);
      
      return { conversationComplete: true };
    }
  };

  /**
   * Utiliser une suggestion comme message
   * @param {string} suggestion - Texte de la suggestion
   */
  const handleSuggestionPress = (suggestion) => {
    setMessage(suggestion);
  };

  return {
    conversation,
    isTyping,
    suggestions,
    currentStep,
    completionProgress,
    typingAnimation,
    scrollViewRef,
    handleSendMessage,
    handleSuggestionPress,
    startConversation,
    updateProgress
  };
};

export default useChatLogic;