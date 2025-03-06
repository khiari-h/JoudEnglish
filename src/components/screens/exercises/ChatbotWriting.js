// src/components/screens/exercises/ChatbotWriting.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Animated
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import dynamique des données en fonction du niveau
// Ces imports seraient remplacés par les vrais fichiers de données
import chatbotA1Data from '../../../data/exercises/chatbot/chatbotA1';
import chatbotA2Data from '../../../data/exercises/chatbot/chatbotA2';
import chatbotB1Data from '../../../data/exercises/chatbot/chatbotB1';
import chatbotB2Data from '../../../data/exercises/chatbot/chatbotB2';
import chatbotC1Data from '../../../data/exercises/chatbot/chatbotC1';
import chatbotC2Data from '../../../data/exercises/chatbot/chatbotC2';

const ChatbotWriting = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  const scrollViewRef = useRef();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [scenario, setScenario] = useState({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showHelp, setShowHelp] = useState(false);
  const [completionProgress, setCompletionProgress] = useState(0);
  const typingAnimation = useRef(new Animated.Value(0)).current;

  // Determine color based on level
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Function to get data based on level
  const getChatbotData = (level) => {
    const dataMap = {
      A1: chatbotA1Data,
      A2: chatbotA2Data,
      B1: chatbotB1Data,
      B2: chatbotB2Data,
      C1: chatbotC1Data,
      C2: chatbotC2Data
    };
    return dataMap[level] || chatbotA1Data;
  };

  // Initialize with the appropriate data based on level
  useEffect(() => {
    const exerciseData = getChatbotData(level);
    // Get the first exercise in the list
    if (exerciseData.exercises && exerciseData.exercises.length > 0) {
      setScenario(exerciseData.exercises[0]);
    }
  }, [level]);

  // When scenario changes, start the conversation
  useEffect(() => {
    if (scenario.steps && scenario.steps.length > 0) {
      // Start with empty conversation
      setConversation([]);
      setCurrentStep(0);
      
      // Add the first bot message after a delay
      setTimeout(() => {
        setIsTyping(true);
        startTypingAnimation();
        
        setTimeout(() => {
          setConversation([
            { 
              id: 1, 
              text: scenario.steps[0].botMessage, 
              sender: 'bot',
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          ]);
          setSuggestions(scenario.steps[0].suggestions);
          setIsTyping(false);
          
          // Update progress
          updateProgress();
        }, 1500);
      }, 500);
    }
  }, [scenario]);

  // Animation for typing indicator
  const startTypingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(typingAnimation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true
        }),
        Animated.timing(typingAnimation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true
        })
      ])
    ).start();
  };

  // Update progress based on current step
  const updateProgress = () => {
    if (scenario.steps) {
      const progress = (currentStep / scenario.steps.length) * 100;
      setCompletionProgress(progress);
    }
  };

  // When messages change, scroll to bottom
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [conversation, isTyping]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message to conversation
    const newMessage = {
      id: conversation.length + 1,
      text: message,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setConversation([...conversation, newMessage]);
    setMessage('');
    setSuggestions([]);
    
    // Check if we have more steps in the scenario
    if (currentStep < scenario.steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      
      // Simulate bot typing
      setIsTyping(true);
      startTypingAnimation();
      
      // After a delay, send the bot response
      setTimeout(() => {
        const botResponse = {
          id: conversation.length + 2,
          text: scenario.steps[nextStep].botMessage,
          sender: 'bot',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setConversation(prev => [...prev, botResponse]);
        setSuggestions(scenario.steps[nextStep].suggestions);
        setIsTyping(false);
        
        // Update progress
        updateProgress();
      }, 1500);
    } else {
      // End of conversation
      setTimeout(() => {
        // Complete progress
        setCompletionProgress(100);
        
        // Show completion message
        alert("Conversation completed successfully!");
        
        // Navigate back
        navigation.goBack();
      }, 1000);
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setMessage(suggestion);
  };

  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };

  // Render a message bubble
  const renderMessage = (item) => {
    const isBotMessage = item.sender === 'bot';
    
    return (
      <View 
        key={item.id}
        style={[
          styles.messageBubble,
          isBotMessage ? styles.botBubble : styles.userBubble,
          isBotMessage ? { backgroundColor: `${levelColor}15` } : { backgroundColor: levelColor }
        ]}
      >
        <Text 
          style={[
            styles.messageText,
            isBotMessage ? { color: '#1f2937' } : { color: 'white' }
          ]}
        >
          {item.text}
        </Text>
        <Text 
          style={[
            styles.messageTime,
            isBotMessage ? { color: '#6b7280' } : { color: 'rgba(255,255,255,0.7)' }
          ]}
        >
          {item.timestamp}
        </Text>
      </View>
    );
  };

  // Render typing indicator
  const renderTypingIndicator = () => {
    return (
      <View style={[styles.messageBubble, styles.botBubble, { backgroundColor: `${levelColor}15`, paddingVertical: 12 }]}>
        <View style={styles.typingContainer}>
          <Animated.View style={[styles.typingDot, { opacity: typingAnimation }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnimation, marginHorizontal: 4 }]} />
          <Animated.View style={[styles.typingDot, { opacity: typingAnimation }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.exerciseTitle}>{scenario.title || 'Chatbot Exercise'}</Text>
      </View>
      
      {/* Progress bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${completionProgress}%`, backgroundColor: levelColor },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {currentStep + 1}/{scenario.steps ? scenario.steps.length : '-'}
        </Text>
      </View>
      
      {/* Scenario description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          {scenario.description || 'Practice your writing skills in this conversation.'}
        </Text>
        <TouchableOpacity style={styles.helpButton} onPress={toggleHelp}>
          <Text style={[styles.helpButtonText, { color: levelColor }]}>
            {showHelp ? 'Hide Help' : 'Show Help'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Help section */}
      {showHelp && currentStep < (scenario.steps ? scenario.steps.length : 0) && (
        <View style={[styles.helpContainer, { borderColor: `${levelColor}30` }]}>
          <Text style={styles.helpTitle}>Hint:</Text>
          <Text style={styles.helpText}>
            {scenario.steps && scenario.steps[currentStep] 
              ? scenario.steps[currentStep].help 
              : 'No hint available.'}
          </Text>
        </View>
      )}
      
      {/* Chat container */}
      <KeyboardAvoidingView 
        style={styles.chatContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <ScrollView 
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {conversation.map(renderMessage)}
          {isTyping && renderTypingIndicator()}
        </ScrollView>
        
        {/* Suggestions */}
        {suggestions.length > 0 && (
          <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.suggestionsContainer}
            contentContainerStyle={styles.suggestionsContent}
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.suggestionBubble, { borderColor: levelColor }]}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={[styles.suggestionText, { color: levelColor }]}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        
        {/* Input area */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor="#9ca3af"
            multiline
          />
          <TouchableOpacity 
            style={[
              styles.sendButton, 
              message.trim() === '' ? styles.disabledButton : { backgroundColor: levelColor }
            ]}
            onPress={handleSendMessage}
            disabled={message.trim() === ''}
          >
            <Text style={styles.sendButtonText}>↑</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#475569',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  exerciseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8fafc',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  descriptionText: {
    flex: 1,
    fontSize: 14,
    color: '#64748b',
    marginRight: 10,
  },
  helpButton: {
    padding: 8,
  },
  helpButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  helpContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#334155',
    marginBottom: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  chatContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messagesContent: {
    paddingBottom: 16,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  botBubble: {
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 10,
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  typingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#64748b',
  },
  suggestionsContainer: {
    maxHeight: 60,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  suggestionsContent: {
    padding: 10,
    alignItems: 'center',
  },
  suggestionBubble: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: 'white',
    borderWidth: 1,
  },
  suggestionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: '#f1f5f9',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1f2937',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#e2e8f0',
  },
  sendButtonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatbotWriting;
