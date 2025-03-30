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
import useProgress from '../../../hooks/useProgress'; // Ajout du hook de progression
import useChatLogic from './hooks/useChatLogic';
import { getChatScenariosByLevel } from './utils/dataUtils';
import { EXERCISE_TYPES } from '../../../constants/exercicesTypes'; // Ajout des constantes de types d'exercices

// Import des styles
import styles from './style';

const ChatbotWriting = ({ navigation }) => {
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Utiliser le hook de progression
  const { updateProgress } = useProgress();
  
  // États spécifiques au chatbot
  const [scenariosData, setScenariosData] = useState([]);
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [mode, setMode] = useState('selector'); // 'selector', 'chat', 'help'
  const [messageText, setMessageText] = useState('');
  const [completedTasks, setCompletedTasks] = useState([]);
  
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
    type: EXERCISE_TYPES.CHATBOT,
    level,
    exercises: currentScenario?.tasks || [],
    navigation,
    autoSaveProgress: false // Nous allons gérer manuellement la progression
  });
  
  // Envoyer un message
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    sendMessage(messageText);
    setMessageText('');
    
    // Vérifier si ce message complète la tâche actuelle
    const taskCompleted = checkTaskCompletion(messageText, currentTaskIndex);
    
    if (taskCompleted) {
      // Ajouter à la liste des tâches complétées
      if (!completedTasks.includes(currentTaskIndex)) {
        const newCompletedTasks = [...completedTasks, currentTaskIndex];
        setCompletedTasks(newCompletedTasks);
        
        // Mettre à jour la progression
        updateChatbotProgress(newCompletedTasks);
      }
      
      // Passer à la tâche suivante si ce n'est pas la dernière
      if (!isLastTask) {
        setTimeout(() => {
          goToNextTask();
        }, 1500);
      }
    }
  };
  
  // Mettre à jour la progression dans le système global
  const updateChatbotProgress = (tasksList = completedTasks) => {
    if (!currentScenario || !currentScenario.tasks) return;
    
    const totalTasks = currentScenario.tasks.length;
    const completedTasksCount = tasksList.length;
    
    // Mettre à jour la progression pour ce scénario spécifique
    updateProgress(
      `chatbot_${level.toLowerCase()}_${selectedScenarioIndex}`,
      EXERCISE_TYPES.CHATBOT,
      level,
      completedTasksCount,
      totalTasks
    );
    
    // Calculer la progression globale pour tous les scénarios
    let totalAllTasks = 0;
    let completedAllTasks = completedTasksCount;
    
    scenariosData.forEach((scenario, index) => {
      if (scenario.tasks) {
        totalAllTasks += scenario.tasks.length;
        // Pour l'instant, nous ne comptons que les tâches du scénario actuel
        // Dans une implémentation complète, vous pourriez stocker les tâches complétées 
        // pour chaque scénario et les additionner ici
      }
    });
    
    // Mettre à jour la progression globale de chatbot pour ce niveau
    updateProgress(
      `chatbot_${level.toLowerCase()}`,
      EXERCISE_TYPES.CHATBOT,
      level,
      completedAllTasks,
      totalAllTasks
    );
  };
  
  // Sélectionner un scénario
  const handleSelectScenario = (index) => {
    setSelectedScenarioIndex(index);
    setMode('chat');
    // Réinitialiser les tâches complétées pour ce nouveau scénario
    setCompletedTasks([]);
  };
  
  // Revenir à la sélection de scénario
  const handleBackToScenarios = () => {
    // Sauvegarder la progression avant de revenir au sélecteur
    updateChatbotProgress();
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