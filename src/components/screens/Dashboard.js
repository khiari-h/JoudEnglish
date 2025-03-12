import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
  Animated,
  FlatList,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Composant Logo personnalisé
const JoudLogo = () => (
  <View style={styles.logoContainer}>
    <View style={styles.logoBackground}>
      <Text style={styles.logoText}>JOUD</Text>
    </View>
    <Text style={styles.logoTagline}>English Made Easy</Text>
  </View>
);

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { name = "User", streak = 0 } = route?.params || {};
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const [showLevelProgress, setShowLevelProgress] = useState(false);

  // Données enrichies pour les défis quotidiens
  const dailyChallenges = [
    {
      id: "1",
      title: "Vocabulary Builder",
      description: "Master 10 new words today",
      icon: "book-outline",
      progress: 4,
      total: 10,
      color: "#6930C3",
    },
    {
      id: "2",
      title: "Pronunciation Practice",
      description: "Complete 5 speaking exercises",
      icon: "mic-outline",
      progress: 2,
      total: 5,
      color: "#5390D9",
    },
    {
      id: "3",
      title: "Grammar Challenge",
      description: "Review past tense rules",
      icon: "school-outline",
      progress: 0,
      total: 3,
      color: "#64DFDF",
    },
  ];

  // Données pour les astuces linguistiques
  const languageTips = [
    {
      id: "1",
      title: "Practice Makes Perfect",
      description:
        "Speaking out loud helps improve pronunciation and builds confidence. Try reading English texts aloud for 5 minutes each day.",
      icon: "bulb-outline",
    },
    {
      id: "2",
      title: "Context is Key",
      description:
        "Learn words in context rather than in isolation. Connect new vocabulary to situations you'll actually use them in.",
      icon: "key-outline",
    },
    {
      id: "3",
      title: "Use English Media",
      description:
        "Watch TV shows, movies, or listen to podcasts in English with subtitles to improve your listening skills.",
      icon: "headset-outline",
    },
  ];

  // Niveaux d'apprentissage complets
  const allLearningLevels = [
    { id: "a1", title: "A1 - Beginner", color: "#5E60CE", progress: 70 },
    { id: "a2", title: "A2 - Elementary", color: "#5390D9", progress: 30 },
    { id: "b1", title: "B1 - Intermediate", color: "#64DFDF", progress: 10 },
    {
      id: "b2",
      title: "B2 - Upper Intermediate",
      color: "#7400B8",
      progress: 0,
    },
    { id: "c1", title: "C1 - Advanced", color: "#6930C3", progress: 0 },
    { id: "c2", title: "C2 - Proficiency", color: "#36949D", progress: 0 },
  ];

  // Niveaux d'apprentissage visibles par défaut (seulement 2)
  const visibleLevels = allLearningLevels.slice(0, 2);

  const renderChallengeProgress = (challenge) => {
    const progressPercentage = (challenge.progress / challenge.total) * 100;
    return (
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {challenge.progress}/{challenge.total}
        </Text>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${progressPercentage}%`,
                backgroundColor: challenge.color,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  // Rendu des indicateurs du carousel
  const renderDotIndicators = (items, activeIndex) => {
    return (
      <View style={styles.dotIndicatorContainer}>
        {items.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeIndex ? "#5E60CE" : "#D1D5DB",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header simplifié */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <JoudLogo />
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome back, {name}!</Text>
          <View style={styles.streakContainer}>
            <MaterialCommunityIcons name="fire" size={24} color="#FFB830" />
            <Text style={styles.streakText}>{streak} day streak!</Text>
          </View>
        </View>
      </View>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Challenges Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Challenges</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={dailyChallenges}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.challengesContainer}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.challengeCard, { borderTopColor: item.color }]}
                onPress={() => {
                  /* Challenge navigation */
                }}
              >
                <View
                  style={[styles.iconCircle, { backgroundColor: item.color }]}
                >
                  <Ionicons name={item.icon} size={24} color="white" />
                </View>
                <View style={styles.challengeTextContainer}>
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                  <Text style={styles.challengeDescription}>
                    {item.description}
                  </Text>
                </View>
                {renderChallengeProgress(item)}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Learning Path Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Path</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LevelSelection")}
            >
              <Text style={styles.seeAllText}>Select Level</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.learningPathCard}>
            <View style={styles.learningPathContent}>
              <View style={styles.learningPathTextContainer}>
                <Text style={styles.learningPathTitle}>
                  Start Your English Journey
                </Text>
                <Text style={styles.learningPathSubtitle}>
                  Choose a level from beginner to advanced
                </Text>
              </View>
              <View style={styles.learningPathIconContainer}>
                <Text style={styles.learningPathIcon}>🌐</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={styles.viewProgressButton}
            onPress={() => setShowLevelProgress(true)}
          >
            <Text style={styles.viewProgressText}>View My Progress</Text>
          </TouchableOpacity>
        </View>

        {/* Language Tip Section avec Carousel */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Language Tips</Text>
          </View>

          <FlatList
            data={languageTips}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            onMomentumScrollEnd={(event) => {
              const index = Math.round(
                event.nativeEvent.contentOffset.x / (width - 40)
              );
              setActiveTipIndex(index);
            }}
            snapToInterval={width - 40}
            decelerationRate="fast"
            contentContainerStyle={styles.tipsContainer}
            renderItem={({ item }) => (
              <View style={styles.tipCardContainer}>
                <View style={styles.tipCard}>
                  <View style={styles.tipIconContainer}>
                    <Ionicons name={item.icon} size={30} color="#5E60CE" />
                  </View>
                  <View style={styles.tipContent}>
                    <Text style={styles.tipTitle}>{item.title}</Text>
                    <Text style={styles.tipDescription}>
                      {item.description}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />

          {renderDotIndicators(languageTips, activeTipIndex)}
        </View>

        {/* Espace en bas pour éviter que le contenu soit caché */}
        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Modal pour afficher la progression de tous les niveaux */}
      <Modal
        visible={showLevelProgress}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowLevelProgress(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>My Language Level Progress</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setShowLevelProgress(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.levelsScrollView}>
              {allLearningLevels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={styles.levelCard}
                  onPress={() => {
                    setShowLevelProgress(false);
                    navigation.navigate("Exercises", { level: level.id });
                  }}
                >
                  <View style={styles.levelCardContent}>
                    <Text style={styles.levelTitle}>{level.title}</Text>
                    <View style={styles.levelProgressContainer}>
                      <View style={styles.levelProgressBar}>
                        <View
                          style={[
                            styles.levelProgressFill,
                            {
                              width: `${level.progress}%`,
                              backgroundColor: level.color,
                            },
                          ]}
                        />
                      </View>
                      <Text style={styles.levelProgressText}>
                        {level.progress}%
                      </Text>
                    </View>
                  </View>
                  <View
                    style={[
                      styles.levelBadge,
                      { backgroundColor: level.color },
                    ]}
                  >
                    <Text style={styles.levelBadgeText}>
                      {level.id.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => setShowLevelProgress(false)}
            >
              <Text style={styles.closeModalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  // Header Styles
  header: {
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#5E60CE",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  logoContainer: {
    alignItems: "center",
  },
  logoBackground: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#6930C3",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  logoTagline: {
    fontSize: 10,
    color: "white",
    marginTop: 2,
  },
  welcomeContainer: {
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  streakText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  // General Styles
  scrollContainer: {
    flex: 1,
  },
  sectionContainer: {
    marginVertical: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  seeAllText: {
    color: "#5E60CE",
    fontWeight: "600",
  },
  // Challenge Cards
  challengesContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  challengeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    width: width * 0.65,
    borderTopWidth: 4,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  challengeTextContainer: {
    marginBottom: 10,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  challengeDescription: {
    fontSize: 14,
    color: "#6B7280",
  },
  progressContainer: {
    marginTop: 5,
  },
  progressText: {
    fontSize: 12,
    color: "#6B7280",
    marginBottom: 5,
    textAlign: "right",
  },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  // Learning Path Card
  learningPathCard: {
    backgroundColor: "#5E60CE",
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 20,
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  learningPathContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  learningPathTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  learningPathTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  learningPathSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
  },
  learningPathIconContainer: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  learningPathIcon: {
    fontSize: 32,
  },
  viewProgressButton: {
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 10,
    marginHorizontal: 20,
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5E60CE",
  },
  viewProgressText: {
    color: "#5E60CE",
    fontWeight: "600",
    fontSize: 14,
  },
  // Level Cards
  levelCard: {
    backgroundColor: "white",
    borderRadius: 15,
    marginHorizontal: 5,
    marginBottom: 12,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  levelCardContent: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  levelProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelProgressBar: {
    flex: 1,
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 10,
  },
  levelProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  levelProgressText: {
    fontSize: 12,
    color: "#6B7280",
    width: 35,
  },
  levelBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 10,
  },
  levelBadgeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
  },
  // Tip Cards Carousel
  tipsContainer: {
    paddingHorizontal: 20,
  },
  tipCardContainer: {
    width: width - 40,
  },
  tipCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "flex-start",
    ...Platform.select({
      android: { elevation: 3 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
    }),
  },
  tipIconContainer: {
    backgroundColor: "#F1F2FF",
    borderRadius: 15,
    padding: 10,
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  tipDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  // Dots indicator
  dotIndicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
  },
  closeButton: {
    padding: 5,
  },
  levelsScrollView: {
    maxHeight: 400,
    paddingHorizontal: 15,
  },
  closeModalButton: {
    backgroundColor: "#5E60CE",
    marginHorizontal: 20,
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  closeModalButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default Dashboard;
