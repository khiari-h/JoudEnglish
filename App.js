// src/App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./src/components/navigation/AppNavigator";
import { ProgressProvider } from "./src/contexts/ProgressContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <ProgressProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </ProgressProvider>
    </SafeAreaProvider>
  );
}
