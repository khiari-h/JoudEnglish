import React, { useState, useEffect } from "react";
import { SafeAreaView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

// Hooks personnalisés
import useScenarioData from "./hooks/useScenarioData";
import useChatLogic from "./hooks/useChatLogic";
import useExerciseType from "../../../hooks/useExerciseType";
import { EXERCISE_TYPES } from "../../../constants/exercicesTypes";

// Composants
import ChatHeader from "./components/ChatHeader";
import ScenarioSelector from "./components/ScenarioSelector";
import ProgressBar from "./components/ProgressBar";
import ScenarioDescription from "./components/ScenarioDescription";
import HelpSection from "./components/HelpSection";
import MessageList from "./components/MessageList";
import SuggestionsList from "./components/SuggestionsList";
import InputArea from "./components/InputArea";

// Styles globaux
import styles from "./styles";

/**
 * Composant principal de l'exercice Chatbot Writing
 * Permet à l'utilisateur de pratiquer l'écriture en simulant une conversation
 */
const ChatbotWriting = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { level, exerciseId } = route.params || { level: "A1" };
  
  // Hook pour le suivi de progression
  const { 
    getExerciseByTopic, 
    updateExerciseProgress, 
    generateExerciseId 
  } = useExerciseType(EXERCISE_TYPES.CHATBOT);
  
  // État local
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [message, setMessage] = useState("");
  
  // Charger les données des scénarios
  const { allScenarios, getLevelColor } = useScenarioData(level);
  const levelColor = getLevelColor(level);
  
  // Utiliser le hook de logique du chat
  const {
    conversation,
    isTyping,
    suggestions,
    currentStep,
    completionProgress,
    handleSendMessage: sendMessage,
    handleSuggestionPress,
    startConversation,
  } = useChatLogic({
    allScenarios,
    selectedScenarioIndex,
    levelColor,
    message,
    setMessage
  });
  
  // Initialiser si un ID d'exercice spécifique est fourni
  useEffect(() => {
    if (exerciseId && allScenarios.length > 0) {
      // Trouver l'index du scénario correspondant à l'ID
      const scenarioIndex = allScenarios.findIndex(
        scenario => generateExerciseId(level, scenario.title) === exerciseId
      );
      
      if (scenarioIndex >= 0) {
        setSelectedScenarioIndex(scenarioIndex);
      }
    }
  }, [exerciseId, allScenarios]);
  
  // Gestion du changement de scénario
  const handleScenarioChange = (index) => {
    if (index !== selectedScenarioIndex) {
      setSelectedScenarioIndex(index);
    }
  };
  
  // Wrapper pour l'envoi de message avec mise à jour de progression
  const handleSendMessage = () => {
    const result = sendMessage();
    
    // Si le message a entraîné la fin de la conversation
    if (result && result.conversationComplete) {
      handleConversationComplete();
    }
  };
  
  // Fonction appelée quand une conversation est terminée
  const handleConversationComplete = () => {
    // Mettre à jour la progression
    const currentScenario = allScenarios[selectedScenarioIndex];
    if (currentScenario && currentScenario.steps) {
      const totalSteps = currentScenario.steps.length;
      updateExerciseProgress(
        level, 
        currentScenario.title, 
        totalSteps, // completed
        totalSteps  // total
      );
    }
    
    // Afficher le message de complétion
    Alert.alert(
      "Conversation terminée",
      "Félicitations ! Vous avez terminé cette conversation.",
      [
        {
          text: "Essayer un autre scénario",
          onPress: () => {
            if (selectedScenarioIndex < allScenarios.length - 1) {
              setSelectedScenarioIndex(selectedScenarioIndex + 1);
            } else {
              setSelectedScenarioIndex(0);
            }
          },
          style: "default",
        },
        {
          text: "Réessayer",
          onPress: () => startConversation(),
          style: "cancel",
        },
      ]
    );
  };
  
  // Toggle pour afficher/masquer l'aide
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  // Obtenir le scénario actuel
  const currentScenario = allScenarios[selectedScenarioIndex];

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* En-tête */}
      <ChatHeader 
        level={level} 
        levelColor={levelColor} 
        onBack={() => navigation.goBack()} 
      />
      
      {/* Sélecteur de scénarios */}
      <ScenarioSelector
        scenarios={allScenarios}
        selectedIndex={selectedScenarioIndex}
        onScenarioChange={handleScenarioChange}
        levelColor={levelColor}
      />
      
      {/* Barre de progression */}
      {currentScenario && (
        <ProgressBar
          progress={completionProgress}
          currentStep={currentStep}
          totalSteps={currentScenario.steps ? currentScenario.steps.length : 0}
          levelColor={levelColor}
        />
      )}
      
      {/* Description du scénario */}
      {currentScenario && (
        <ScenarioDescription
          description={currentScenario.description}
          showHelp={showHelp}
          toggleHelp={toggleHelp}
          levelColor={levelColor}
        />
      )}
      
      {/* Section d'aide */}
      {showHelp && currentScenario && currentStep < (currentScenario.steps ? currentScenario.steps.length : 0) && (
        <HelpSection
          helpText={currentScenario.steps ? currentScenario.steps[currentStep].help : ""}
          levelColor={levelColor}
        />
      )}
      
      {/* Conteneur de chat */}
      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Liste des messages */}
        <MessageList
          conversation={conversation}
          isTyping={isTyping}
          levelColor={levelColor}
        />
        
        {/* Liste des suggestions */}
        {suggestions.length > 0 && (
          <SuggestionsList
            suggestions={suggestions}
            onSuggestionPress={handleSuggestionPress}
            levelColor={levelColor}
          />
        )}
        
        {/* Zone de saisie */}
        <InputArea
          message={message}
          setMessage={setMessage}
          onSendMessage={handleSendMessage}
          levelColor={levelColor}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatbotWriting;