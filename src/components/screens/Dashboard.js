// Dashboard/index.js
import React, { useState } from "react";
import { View, StatusBar, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// Composants
import DashboardHeader from "./components/DashboardHeader";
import ContinueLearning from "./components/ContinueLearning";
import DailyChallenge from "./components/DailyChallenge";
import LearningPath from "./components/LearningPath";
import LanguageTips from "./components/LanguageTips";
import LevelProgressModal from "./components/LevelProgressModal";

// Styles et données
import styles from "./styles/styles";
import { challengesData, tipsData, levelsData } from "./data/mockData";

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { name = "User", streak = 0 } = route?.params || {};
  const [showLevelProgress, setShowLevelProgress] = useState(false);
  
  // Sélection du défi du jour
  const todaysChallengeIndex = new Date().getDate() % challengesData.length;
  const todaysChallenge = challengesData[todaysChallengeIndex];

  // Dernière activité (pourrait venir d'une API)
  const lastActivity = {
    title: "Conversation Practice",
    type: "exercise",
    date: "Today, 2:30 PM",
    progress: 75,
    topic: "Ordering at a Restaurant",
    icon: "chatbubbles-outline",
  };

  const handleNavigateToExercise = (id) => {
    navigation.navigate("Exercise", { id });
  };

  const handleNavigateToLevel = (level) => {
    navigation.navigate("ExerciseSelection", { level });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <DashboardHeader name={name} streak={streak} />
      
      <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <ContinueLearning 
          activity={lastActivity} 
          onPress={() => handleNavigateToExercise(lastActivity.topic)} 
        />
        
        <DailyChallenge challenge={todaysChallenge} />
        
        <LearningPath 
          onSelectLevel={() => navigation.navigate("LevelSelection")}
          onViewProgress={() => setShowLevelProgress(true)}
        />
        
        <LanguageTips tips={tipsData} />
        
        <View style={{ height: 20 }} />
      </ScrollView>
      
      <LevelProgressModal 
        visible={showLevelProgress}
        levels={levelsData}
        onClose={() => setShowLevelProgress(false)}
        onSelectLevel={handleNavigateToLevel}
      />
    </View>
  );
};

export default Dashboard;