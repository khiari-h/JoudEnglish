import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const Dashboard = ({ route }) => {
  const navigation = useNavigation();
  const { name, streak } = route.params;

  const dailyChallenges = [
    {
      id: "1",
      title: "Vocabulary Challenge",
      description: "Learn 10 new words",
      icon: "📚",
      progress: 4,
      total: 10,
      color: "#4361EE",
    },
    {
      id: "2",
      title: "Listening Practice",
      description: "Complete 3 exercises",
      icon: "👂",
      progress: 1,
      total: 3,
      color: "#8B5CF6",
    },
    {
      id: "3",
      title: "Speaking Skills",
      description: "Record 2 conversation clips",
      icon: "🎙️",
      progress: 0,
      total: 2,
      color: "#10B981",
    },
  ];

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

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Daily Challenges Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Challenges</Text>
          </View>

          {dailyChallenges.map((challenge) => (
            <TouchableOpacity
              key={challenge.id}
              style={[
                styles.challengeCard,
                { borderLeftColor: challenge.color },
              ]}
              onPress={() => {
                /* Challenge navigation */
              }}
            >
              <View style={styles.challengeContent}>
                <Text style={styles.challengeIcon}>{challenge.icon}</Text>
                <View style={styles.challengeTextContainer}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDescription}>
                    {challenge.description}
                  </Text>
                </View>
              </View>
              {renderChallengeProgress(challenge)}
            </TouchableOpacity>
          ))}
        </View>

        {/* Learning Path Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Path</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LevelSelection")}
            >
              <Text style={styles.seeAllText}>Select Levels</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.learningPathCard}
            onPress={() => navigation.navigate("LevelSelection")}
          >
            <View style={styles.learningPathContent}>
              <View style={styles.learningPathTextContainer}>
                <Text style={styles.learningPathTitle}>
                  Select Your Language Level
                </Text>
                <Text style={styles.learningPathSubtitle}>
                  Choose from European standard levels and start learning
                </Text>
              </View>
              <View style={styles.learningPathIconContainer}>
                <Text style={styles.learningPathIcon}>🌐</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Language Tip Section */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Language Tip</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <View style={styles.tipContent}>
              <Text style={styles.tipTitle}>Practice Makes Perfect</Text>
              <Text style={styles.tipDescription}>
                Speaking out loud helps improve pronunciation and builds
                confidence. Don't be afraid to make mistakes!
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },
  scrollContainer: {
    flex: 1,
    marginTop: 15,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginVertical: 15,
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
    color: "#1F2937",
  },
  seeAllText: {
    color: "#4361EE",
    fontWeight: "600",
  },
  challengeCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 5,
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
  challengeContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  challengeIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  challengeTextContainer: {
    flex: 1,
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
  learningPathCard: {
    backgroundColor: "#4361EE",
    borderRadius: 15,
    padding: 15,
    ...Platform.select({
      android: { elevation: 5 },
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
      },
    }),
  },
  learningPathContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  learningPathTextContainer: {
    flex: 1,
    paddingRight: 15,
  },
  learningPathTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 5,
  },
  learningPathSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
  },
  learningPathIconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  learningPathIcon: {
    fontSize: 30,
  },
  tipCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
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
  tipIcon: {
    fontSize: 40,
    marginRight: 15,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  tipDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
});

export default Dashboard;
