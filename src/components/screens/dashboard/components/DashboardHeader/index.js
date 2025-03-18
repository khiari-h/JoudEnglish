// Dashboard/components/DashboardHeader/index.js
import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import JoudLogo from "../../../../common/JoudLogo";
import styles from "./style";

const DashboardHeader = ({ name, streak }) => {
  return (
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
  );
};

export default DashboardHeader;

