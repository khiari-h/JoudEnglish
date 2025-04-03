import React from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import Header from '../Header';
import ProgressBar from '../ProgressBar';
import styles from './style';

const BaseExercise = ({
  // Props de base
  title,
  level,
  levelColor,
  progress,
  onBack,
  children,
  
  // Props de personnalisation
  renderActions,
  contentContainerStyle,
  customHeader,
  showProgressBar = true,
  additionalHeaderContent,
  
  // Props spécifiques aux exercices
  disableScroll = false,
  customScrollViewProps = {},
  customSafeAreaStyle = {},
  customContentStyle = {},
  
  // Props pour les exercices spéciaux (chat, assessment, etc.)
  bottomComponent,
  fixedContent,
  headerRight,
  subHeader,
  
  // Props pour le style conditionnel
  transparentBackground = false,
  fullWidth = false,
  noPadding = false,
}) => {
  const renderMainContent = () => {
    if (disableScroll) {
      return (
        <View 
          style={[
            styles.contentContainer,
            noPadding && styles.noPadding,
            customContentStyle
          ]}
        >
          {children}
        </View>
      );
    }

    return (
      <ScrollView 
        style={[
          styles.scrollView,
          transparentBackground && styles.transparentBackground
        ]}
        contentContainerStyle={[
          styles.contentContainer,
          noPadding && styles.noPadding,
          fullWidth && styles.fullWidth,
          contentContainerStyle
        ]}
        showsVerticalScrollIndicator={false}
        {...customScrollViewProps}
      >
        {children}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={[styles.container, customSafeAreaStyle]}>
      {customHeader || (
        <Header 
          title={title}
          level={level}
          levelColor={levelColor}
          onBack={onBack}
          rightComponent={headerRight}
        />
      )}
      
      {subHeader}
      {additionalHeaderContent}
      
      {showProgressBar && (
        <ProgressBar 
          progress={progress} 
          levelColor={levelColor} 
        />
      )}

      {fixedContent}
      
      {renderMainContent()}

      {bottomComponent}

      {renderActions && (
        <View style={styles.actionsContainer}>
          {renderActions()}
        </View>
      )}
    </SafeAreaView>
  );
};

export default BaseExercise;
