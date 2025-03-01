// src/components/screens/Dashboard.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const Dashboard = () => {
  const navigation = useNavigation();

  const levels = [
    {
      id: "a1",
      name: "A1",
      title: "Beginner",
      progress: 15,
      status: "current",
      color: "#4F46E5", // Indigo
      gradient: ["#6366F1", "#4F46E5"],
      exercises: 3,
      icon: "🚀",
    },
    {
      id: "a2",
      name: "A2",
      title: "Elementary",
      progress: 0,
      status: "locked",
      color: "#7C3AED", // Violet
      gradient: ["#8B5CF6", "#7C3AED"],
      exercises: 0,
      icon: "🔥",
    },
  ];

  // Défis quotidiens
  const dailyChallenges = [
    {
      title: "Complete 3 vocabulary exercises",
      progress: 1,
      total: 3,
      reward: "25 XP",
    },
    {
      title: "Practice speaking for 5 minutes",
      progress: 0,
      total: 1,
      reward: "15 XP",
    },
  ];

  // Modules recommandés
  const recommendedModules = [
    {
      title: "Basic Conversations",
      type: "Vocabulary",
      duration: "5 min",
      difficulty: "Easy",
      xp: 10,
    },
    {
      title: "Present Continuous",
      type: "Grammar",
      duration: "7 min",
      difficulty: "Medium",
      xp: 15,
    },
  ];

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header avec gradient */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <View>
              <View style={styles.userInfo}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userInitial}>J</Text>
                </View>
                <View style={styles.userStats}>
                  <Text style={styles.userName}>Welcome back!</Text>
                  <View style={styles.xpContainer}>
                    <Text style={styles.xpText}>250 XP</Text>
                    <View style={styles.levelPill}>
                      <Text style={styles.levelPillText}>LVL 5</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.streakContainer}>
                <View style={styles.streakBadge}>
                  <Text style={styles.streakIcon}>🔥</Text>
                  <Text style={styles.streakText}>7 Day Streak</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.content}>
          {/* Carte de progression */}
          <View style={styles.progressCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Your English Journey</Text>
              <TouchableOpacity
                style={styles.viewAllButton}
                onPress={() => navigation.navigate("LevelSelection")}
              >
                <Text style={styles.viewAllText}>View All</Text>
              </TouchableOpacity>
            </View>

            {levels
              .filter((level) => level.status === "current")
              .map((level) => (
                <TouchableOpacity
                  key={level.id}
                  style={[styles.levelCard, { backgroundColor: level.color }]}
                  onPress={() =>
                    navigation.navigate("ExerciseSelection", {
                      level: level.name,
                    })
                  }
                >
                  <View style={styles.levelCardContent}>
                    <View style={styles.levelCardTop}>
                      <View style={styles.levelBadgeContainer}>
                        <View style={styles.levelIconBadge}>
                          <Text style={styles.levelIcon}>{level.icon}</Text>
                        </View>
                        <View>
                          <Text style={styles.levelName}>{level.name}</Text>
                          <Text style={styles.levelTitle}>{level.title}</Text>
                        </View>
                      </View>

                      <View style={styles.progressCircleContainer}>
                        <View style={styles.progressCircle}>
                          <Text style={styles.progressText}>
                            {level.progress}%
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.levelCardBottom}>
                      <View style={styles.progressBarContainer}>
                        <View style={styles.progressBarBg}>
                          <View
                            style={[
                              styles.progressBarFill,
                              { width: `${level.progress}%` },
                            ]}
                          />
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.continueButton}
                        onPress={() =>
                          navigation.navigate("ExerciseSelection", {
                            level: level.name,
                          })
                        }
                      >
                        <Text style={styles.continueButtonText}>Continue</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>

          {/* Défis quotidiens */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Daily Challenges</Text>
              <TouchableOpacity>
                <Text style={styles.refreshText}>Refresh</Text>
              </TouchableOpacity>
            </View>

            {dailyChallenges.map((challenge, index) => (
              <View key={index} style={styles.challengeCard}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <View style={styles.challengeProgressContainer}>
                    <View style={styles.challengeProgressBar}>
                      <View
                        style={[
                          styles.challengeProgressFill,
                          {
                            width: `${
                              (challenge.progress / challenge.total) * 100
                            }%`,
                          },
                        ]}
                      />
                    </View>
                    <Text style={styles.challengeProgressText}>
                      {challenge.progress}/{challenge.total}
                    </Text>
                  </View>
                </View>
                <View style={styles.challengeReward}>
                  <Text style={styles.rewardText}>{challenge.reward}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Modules recommandés */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recommended For You</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recommendedContainer}
            >
              {recommendedModules.map((module, index) => (
                <TouchableOpacity key={index} style={styles.recommendedCard}>
                  <View style={styles.recommendedTop}>
                    <View
                      style={[
                        styles.moduleTypeBadge,
                        {
                          backgroundColor:
                            module.type === "Vocabulary"
                              ? "#4F46E5"
                              : "#10B981",
                        },
                      ]}
                    >
                      <Text style={styles.moduleTypeText}>{module.type}</Text>
                    </View>
                    <View style={styles.xpBadge}>
                      <Text style={styles.xpBadgeText}>+{module.xp} XP</Text>
                    </View>
                  </View>

                  <Text style={styles.recommendedTitle}>{module.title}</Text>

                  <View style={styles.moduleMeta}>
                    <View style={styles.metaItem}>
                      <Text style={styles.metaText}>{module.duration}</Text>
                    </View>
                    <View style={styles.metaDot} />
                    <View style={styles.metaItem}>
                      <Text style={styles.metaText}>{module.difficulty}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={styles.startModuleButton}>
                    <Text style={styles.startModuleText}>Start</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Bouton principal */}
          <TouchableOpacity
            style={styles.mainActionButton}
            onPress={() => navigation.navigate("LevelSelection")}
          >
            <Text style={styles.mainActionText}>Explore All Lessons</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  heroSection: {
    backgroundColor: "#4F46E5",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  userInitial: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  userStats: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  xpContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  xpText: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    marginRight: 8,
  },
  levelPill: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  levelPillText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white",
  },
  streakContainer: {
    marginTop: 15,
  },
  streakBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  streakText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  content: {
    padding: 20,
    paddingTop: 10,
  },
  progressCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: -20,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
  },
  viewAllButton: {
    padding: 4,
  },
  viewAllText: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
  levelCard: {
    borderRadius: 16,
    overflow: "hidden",
  },
  levelCardContent: {
    padding: 16,
  },
  levelCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  levelBadgeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  levelIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  levelIcon: {
    fontSize: 18,
  },
  levelName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  levelTitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  progressCircleContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  progressCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  levelCardBottom: {
    marginTop: 4,
  },
  progressBarContainer: {
    marginBottom: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.25)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "white",
    borderRadius: 4,
  },
  continueButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  continueButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  refreshText: {
    fontSize: 14,
    color: "#4F46E5",
    fontWeight: "600",
  },
  challengeCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  challengeInfo: {
    flex: 1,
    marginRight: 10,
  },
  challengeTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  challengeProgressContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  challengeProgressBar: {
    flex: 1,
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginRight: 8,
    overflow: "hidden",
  },
  challengeProgressFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 3,
  },
  challengeProgressText: {
    fontSize: 12,
    color: "#6B7280",
    width: 30,
  },
  challengeReward: {
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rewardText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4F46E5",
  },
  recommendedContainer: {
    paddingRight: 20,
  },
  recommendedCard: {
    width: 200,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginRight: 15,
  },
  recommendedTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  moduleTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  moduleTypeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "white",
  },
  xpBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  xpBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#D97706",
  },
  recommendedTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  moduleMeta: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  metaItem: {
    marginRight: 4,
  },
  metaText: {
    fontSize: 12,
    color: "#6B7280",
  },
  metaDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    marginRight: 4,
  },
  startModuleButton: {
    backgroundColor: "#4F46E5",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 4,
  },
  startModuleText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  mainActionButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 10,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  mainActionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
});

export default Dashboard;
