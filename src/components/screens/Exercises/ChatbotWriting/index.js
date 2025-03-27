// src/components/screens/Exercises/ChatbotWriting/index.js
import React, { useState, useEffect, useRef } from 'react';
import { View, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';

// Import des composants
import ChatHeader from './components/ChatHeader';
import ProgressBar from './components/ProgressBar';
import MessageList from './components/MessageList';
import SuggestionsList from './components/SuggestionsList';
import InputArea from './components/InputArea';
import ScenarioSelector from './components/ScenarioSelector';
import ScenarioDescription from './components/ScenarioDescription';
import HelpSection from './components/HelpSection';

// Import des hooks personnalisés
import { useExerciseState } from '../../../hooks/common';
import useChatLogic from './hooks/useChatLogic';
import { getChatScenariosByLevel } from './utils/dataUtils';

// Import des styles
import styles from './style';

const ChatbotWriting = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // États spécifiques au chatbot
  const [scenariosData, setScenariosData] = useState([]);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [mode, setMode] = useState('selector'); // 'selector', 'chat', 'help'
  const [messageText, setMessageText] = useState('');
  
  // Référence pour le scroll des messages
  const messagesScrollRef = useRef(null);
  
  // Charger les données des scénarios
  useEffect(() => {
    const data = getChatScenariosByLevel(level);
    setScenariosData(data);
  }, [level]);
  
  // Scénario actuel
  const currentScenario = scenariosData[selectedScenarioIndex] || null;
  
  // Logique de chat
  const {
    messages,
    suggestions,
    isTyping,
    currentTask,
    sendMessage,
    useSuggestion,
    checkTaskCompletion
  } = useChatLogic(currentScenario);
  
  // Utiliser le hook générique d'exercice pour les tâches du scénario
  const {
    currentIndex: currentTaskIndex,
    setCurrentIndex: setCurrentTaskIndex,
    progress,
    levelColor,
    isLastExercise: isLastTask,
    goToNext: goToNextTask,
    handleGoBack
  } = useExerciseState({
    type: 'chatbot',
    level,
    exercises: currentScenario?.tasks || [],
    navigation
  });
  
  // Envoyer un message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    sendMessage(messageText);
    setMessageText('');
    
    // Vérifier si cette message complète la tâche actuelle
    const taskCompleted = checkTaskCompletion(messageText, currentTaskIndex);
    if (taskCompleted && !isLastTask) {
      // Passer à la tâche suivante après un délai
      setTimeout(() => {
        goToNextTask();
      }, 1500);
    }
  };
  
  // Sélectionner un scénario
  const handleSelectScenario = (index) => {
    setSelectedScenarioIndex(index);
    setMode('chat');
  };
  
  // Revenir à la sélection de scénario
  const handleBackToScenarios = () => {
    setMode('selector');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Mode sélecteur de scénario */}
      {mode === 'selector' && (
        <ScenarioSelector
          scenarios={scenariosData}
          onSelectScenario={handleSelectScenario}
          level={level}
          levelColor={levelColor}
          onGoBack={handleGoBack}
        />
      )}
      
      {/* Mode aide */}
      {mode === 'help' && (
        <HelpSection
          onBack={() => setMode('chat')}
          levelColor={levelColor}
        />
      )}
      
      {/* Mode chat */}
      {mode === 'chat' && currentScenario && (
        <>
          {/* En-tête du chat */}
          <ChatHeader
            title={currentScenario.title}
            level={level}
            levelColor={levelColor}
            onBack={handleBackToScenarios}
            onHelp={() => setMode('help')}
          />
          
          {/* Barre de progression */}
          <ProgressBar
            progress={progress}
            levelColor={levelColor}
          />
          
          {/* Description du scénario */}
          <ScenarioDescription
            scenario={currentScenario}
            currentTask={currentTask}
            levelColor={levelColor}
          />
          
          {/* Zone principale de chat */}
          <KeyboardAvoidingView
            style={styles.chatContainer}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          >
            {/* Liste des messages */}
            <MessageList
              messages={messages}
              isTyping={isTyping}
              scrollRef={messagesScrollRef}
              levelColor={levelColor}
            />
            
            {/* Suggestions */}
            {suggestions.length > 0 && (
              <SuggestionsList
                suggestions={suggestions}
                onSuggestionPress={useSuggestion}
                levelColor={levelColor}
              />
            )}
            
            {/* Zone de saisie */}
            <InputArea
              value={messageText}
              onChangeText={setMessageText}
              onSend={handleSendMessage}
              levelColor={levelColor}
            />
          </KeyboardAvoidingView>
        </>
      )}
    </SafeAreaView>
  );
};

export default ChatbotWriting;