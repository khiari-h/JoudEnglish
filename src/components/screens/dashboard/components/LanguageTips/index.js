// Dashboard/components/LanguageTips/index.js
import React, { useState, useRef, useEffect } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  Dimensions, 
  Animated 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const { width } = Dimensions.get("window");

const LanguageTips = ({ tips }) => {
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  // Animation pour l'entrée des cartes
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Rendu des indicateurs du carousel
  const renderDotIndicators = () => {
    return (
      <View style={styles.dotIndicatorContainer}>
        {tips.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              {
                backgroundColor: index === activeTipIndex ? "#5E60CE" : "#D1D5DB",
              },
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <Animated.View
      style={[
        styles.sectionContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: translateYAnim }],
        },
      ]}
    >
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Language Tips</Text>
      </View>

      <FlatList
        data={tips}
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

      {renderDotIndicators()}
    </Animated.View>
  );
};

export default LanguageTips;

