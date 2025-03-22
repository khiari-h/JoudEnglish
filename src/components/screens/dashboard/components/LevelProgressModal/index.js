// Dashboard/components/LevelProgressModal/index.js
import React from "react";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Button from "../../../../ui/Button";
import styles from "./style";

const LevelProgressModal = ({ visible, levels, onClose, onSelectLevel }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>My Language Level Progress</Text>
            <Button
              icon={<Ionicons name="close" size={24} color="#6B7280" />}
              color="transparent"
              size="small"
              onPress={onClose}
              style={styles.closeButton}
            />
          </View>

          <ScrollView style={styles.levelsScrollView}>
            {levels.map((level) => (
              <Pressable
                key={level.id}
                style={({ pressed }) => [
                  styles.levelCard,
                  { opacity: pressed ? 0.9 : 1 },
                ]}
                onPress={() => {
                  onClose();
                  onSelectLevel(level.id.toUpperCase());
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
                  style={[styles.levelBadge, { backgroundColor: level.color }]}
                >
                  <Text style={styles.levelBadgeText}>
                    {level.id.toUpperCase()}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>

          <Button
            title="Close"
            color="#5E60CE"
            onPress={onClose}
            fullWidth={true}
            style={styles.closeModalButton}
            textStyle={styles.closeModalButtonText}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;
