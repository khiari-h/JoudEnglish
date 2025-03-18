// Dashboard/components/LevelProgressModal/index.js
import React from "react";
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  ScrollView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

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
            <TouchableOpacity
              style={styles.closeButton}
              onPress={onClose}
            >
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.levelsScrollView}>
            {levels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={styles.levelCard}
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
            onPress={onClose}
          >
            <Text style={styles.closeModalButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default LevelProgressModal;
