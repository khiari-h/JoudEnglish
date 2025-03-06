// src/components/screens/exercises/PhrasesExpressions.js
import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  TextInput,
  FlatList,
  Animated,
  Platform
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

// Import fictif des données de phrases et expressions par niveau
import phrasesA1Data from '../../../data/exercises/phrases/phrasesA1';
import phrasesA2Data from '../../../data/exercises/phrases/phrasesA2';
import phrasesB1Data from '../../../data/exercises/phrases/phrasesB1';
import phrasesB2Data from '../../../data/exercises/phrases/phrasesB2';
import phrasesC1Data from '../../../data/exercises/phrases/phrasesC1';
import phrasesC2Data from '../../../data/exercises/phrases/phrasesC2';

const PhrasesExpressions = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { level } = route.params || { level: 'A1' };
  
  // Références pour les animations
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // États pour gérer les données et la UI
  const [phrasesData, setPhrasesData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPhrases, setFilteredPhrases] = useState([]);
  const [expandedPhraseId, setExpandedPhraseId] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [viewMode, setViewMode] = useState('browse'); // 'browse', 'practice', 'quiz'
  const [currentPracticeIndex, setCurrentPracticeIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [practiceScore, setPracticeScore] = useState(0);
  const [practiceTotal, setPracticeTotal] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [practiceMode, setPracticeMode] = useState('translation'); // 'translation', 'fillin', 'arrange'
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Détermine la couleur en fonction du niveau
  const getLevelColor = (level) => {
    const colors = {
      A1: "#3b82f6",
      A2: "#8b5cf6",
      B1: "#10b981",
      B2: "#f59e0b",
      C1: "#ef4444",
      C2: "#6366f1",
    };
    return colors[level] || "#4361EE";
  };

  const levelColor = getLevelColor(level);

  // Récupère les données en fonction du niveau
  const getPhrasesData = (level) => {
    const dataMap = {
      A1: phrasesA1Data,
      A2: phrasesA2Data,
      B1: phrasesB1Data,
      B2: phrasesB2Data,
      C1: phrasesC1Data,
      C2: phrasesC2Data
    };
    return dataMap[level] || phrasesA1Data;
  };

  // Initialisation des données et filtrage par défaut
  useEffect(() => {
    const data = getPhrasesData(level);
    setPhrasesData(data);
    
    if (data && data.categories.length > 0) {
      const firstCategory = data.categories[0];
      setSelectedCategory(firstCategory.id);
      
      if (firstCategory.subcategories && firstCategory.subcategories.length > 0) {
        setSelectedSubcategory(firstCategory.subcategories[0].id);
      } else {
        setSelectedSubcategory(null);
      }
    }
  }, [level]);

  // Filtre les phrases en fonction de la catégorie, sous-catégorie et recherche
  useEffect(() => {
    if (!phrasesData) return;
    
    let filtered = [];
    
    // Si on affiche les favoris
    if (showFavorites) {
      filtered = phrasesData.phrases.filter(phrase => favoriteIds.includes(phrase.id));
    }
    // Sinon, filtrer par catégorie et sous-catégorie
    else if (selectedCategory) {
      filtered = phrasesData.phrases.filter(phrase => phrase.categoryId === selectedCategory);
      
      if (selectedSubcategory) {
        filtered = filtered.filter(phrase => phrase.subcategoryId === selectedSubcategory);
      }
    }
    
    // Filtrer par recherche
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(phrase => 
        phrase.english.toLowerCase().includes(query) || 
        phrase.translation.toLowerCase().includes(query) ||
        (phrase.keywords && phrase.keywords.some(keyword => keyword.toLowerCase().includes(query)))
      );
    }
    
    setFilteredPhrases(filtered);
    
    // Réinitialiser l'index de pratique
    setCurrentPracticeIndex(0);
  }, [phrasesData, selectedCategory, selectedSubcategory, searchQuery, showFavorites, favoriteIds]);

  // Passe en mode pratique et initialise les données de pratique
  const startPractice = (mode) => {
    if (filteredPhrases.length === 0) return;
    
    setPracticeMode(mode);
    setViewMode('practice');
    setCurrentPracticeIndex(0);
    setUserAnswer('');
    setShowAnswer(false);
    setPracticeScore(0);
    setPracticeTotal(0);
    setQuizCompleted(false);
    
    // Préparer les options pour le mode "arrange"
    if (mode === 'arrange') {
      prepareArrangeOptions(filteredPhrases[0]);
    }
  };

  // Prépare les options à arranger pour une phrase
  const prepareArrangeOptions = (phrase) => {
    const words = phrase.english.split(' ');
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setShuffledOptions(shuffled);
    setSelectedOptions([]);
  };

  // Vérifie la réponse de l'utilisateur
  const checkAnswer = () => {
    if (showAnswer) return;
    
    const currentPhrase = filteredPhrases[currentPracticeIndex];
    let isCorrect = false;
    
    if (practiceMode === 'translation') {
      // Vérification simplifiée - on pourrait implémenter une vérification plus sophistiquée
      isCorrect = userAnswer.toLowerCase().trim() === currentPhrase.translation.toLowerCase().trim();
    } else if (practiceMode === 'fillin') {
      // Vérifier si les mots manquants sont corrects
      const missingWords = currentPhrase.missingWords || [];
      isCorrect = userAnswer.toLowerCase().trim() === missingWords.join(' ').toLowerCase().trim();
    } else if (practiceMode === 'arrange') {
      // Vérifier si les mots sont dans le bon ordre
      const correctSentence = currentPhrase.english;
      const userSentence = selectedOptions.join(' ');
      isCorrect = userSentence.toLowerCase().trim() === correctSentence.toLowerCase().trim();
    }
    
    // Mettre à jour le score
    if (isCorrect) {
      setPracticeScore(prev => prev + 1);
      
      // Animation pour une bonne réponse
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      // Animation pour une mauvaise réponse
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        })
      ]).start();
    }
    
    setPracticeTotal(prev => prev + 1);
    setShowAnswer(true);
  };

  // Passe à la phrase suivante
  const goToNextPhrase = () => {
    if (currentPracticeIndex < filteredPhrases.length - 1) {
      setCurrentPracticeIndex(prev => prev + 1);
      setUserAnswer('');
      setShowAnswer(false);
      
      // Préparer les options pour le mode "arrange" si nécessaire
      if (practiceMode === 'arrange') {
        prepareArrangeOptions(filteredPhrases[currentPracticeIndex + 1]);
      }
    } else {
      // Quiz terminé
      setQuizCompleted(true);
    }
  };

  // Toggle l'ajout/suppression d'une phrase aux favoris
  const toggleFavorite = (phraseId) => {
    if (favoriteIds.includes(phraseId)) {
      setFavoriteIds(prev => prev.filter(id => id !== phraseId));
    } else {
      setFavoriteIds(prev => [...prev, phraseId]);
    }
  };

  // Toggle l'expansion d'une phrase pour voir plus de détails
  const toggleExpand = (phraseId) => {
    setExpandedPhraseId(expandedPhraseId === phraseId ? null : phraseId);
  };

  // Ajoute un mot à la phrase en construction (mode arrange)
  const handleSelectWord = (word, index) => {
    if (selectedOptions.includes(word)) return;
    
    setSelectedOptions([...selectedOptions, word]);
    setShuffledOptions(prev => prev.filter((_, i) => i !== index));
  };

  // Supprime un mot de la phrase en construction (mode arrange)
  const handleRemoveWord = (word, index) => {
    setSelectedOptions(prev => prev.filter((_, i) => i !== index));
    setShuffledOptions([...shuffledOptions, word]);
  };

  // Réinitialise la phrase en construction (mode arrange)
  const resetArrangement = () => {
    prepareArrangeOptions(filteredPhrases[currentPracticeIndex]);
  };

  // Rendu d'une catégorie
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item.id && [styles.selectedCategoryButton, { borderColor: levelColor }]
      ]}
      onPress={() => {
        setSelectedCategory(item.id);
        if (item.subcategories && item.subcategories.length > 0) {
          setSelectedSubcategory(item.subcategories[0].id);
        } else {
          setSelectedSubcategory(null);
        }
      }}
    >
      <Text style={[
        styles.categoryButtonText,
        selectedCategory === item.id && { color: levelColor }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Rendu d'une sous-catégorie
  const renderSubcategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.subcategoryButton,
        selectedSubcategory === item.id && [styles.selectedSubcategoryButton, { backgroundColor: `${levelColor}15` }]
      ]}
      onPress={() => setSelectedSubcategory(item.id)}
    >
      <Text style={[
        styles.subcategoryButtonText,
        selectedSubcategory === item.id && { color: levelColor }
      ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  // Rendu d'une phrase dans la liste de navigation
  const renderPhraseItem = ({ item }) => {
    const isFavorite = favoriteIds.includes(item.id);
    const isExpanded = expandedPhraseId === item.id;
    
    return (
      <View style={styles.phraseCard}>
        <TouchableOpacity
          style={styles.phraseHeader}
          onPress={() => toggleExpand(item.id)}
        >
          <View style={styles.phraseMain}>
            <Text style={styles.phraseEnglish}>{item.english}</Text>
            <Text style={styles.phraseTranslation}>{item.translation}</Text>
          </View>
          <TouchableOpacity
            style={[styles.favoriteButton, isFavorite && styles.favoriteButtonActive]}
            onPress={() => toggleFavorite(item.id)}
          >
            <Text style={styles.favoriteButtonText}>{isFavorite ? '★' : '☆'}</Text>
          </TouchableOpacity>
        </TouchableOpacity>
        
        {isExpanded && (
          <View style={styles.phraseDetails}>
            {item.context && (
              <View style={styles.contextContainer}>
                <Text style={styles.contextLabel}>Context:</Text>
                <Text style={styles.contextText}>{item.context}</Text>
              </View>
            )}
            
            {item.examples && item.examples.length > 0 && (
              <View style={styles.examplesContainer}>
                <Text style={styles.examplesLabel}>Examples:</Text>
                {item.examples.map((example, index) => (
                  <View key={index} style={styles.exampleItem}>
                    <Text style={styles.exampleEnglish}>{example.english}</Text>
                    <Text style={styles.exampleTranslation}>{example.translation}</Text>
                  </View>
                ))}
              </View>
            )}
            
            {item.notes && (
              <View style={styles.notesContainer}>
                <Text style={styles.notesLabel}>Notes:</Text>
                <Text style={styles.notesText}>{item.notes}</Text>
              </View>
            )}
            
            {item.synonyms && item.synonyms.length > 0 && (
              <View style={styles.synonymsContainer}>
                <Text style={styles.synonymsLabel}>Synonyms:</Text>
                <View style={styles.synonymsList}>
                  {item.synonyms.map((synonym, index) => (
                    <View key={index} style={styles.synonymTag}>
                      <Text style={styles.synonymText}>{synonym}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            
            <View style={styles.practiceButtonsContainer}>
              <TouchableOpacity
                style={[styles.practiceButton, { backgroundColor: levelColor }]}
                onPress={() => {
                  setFilteredPhrases([item]);
                  startPractice('translation');
                }}
              >
                <Text style={styles.practiceButtonText}>Practice this phrase</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    );
  };

  // Rendu du mode de navigation et de recherche de phrases
  const renderBrowseMode = () => (
    <>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search phrases..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#94a3b8"
        />
        <TouchableOpacity
          style={[
            styles.favoritesToggle,
            showFavorites && { backgroundColor: `${levelColor}15` }
          ]}
          onPress={() => setShowFavorites(!showFavorites)}
        >
          <Text style={[
            styles.favoritesToggleText,
            showFavorites && { color: levelColor }
          ]}>
            {showFavorites ? '★ Favorites' : '☆ Show favorites'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {!showFavorites && phrasesData && phrasesData.categories && (
        <>
          <FlatList
            horizontal
            data={phrasesData.categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesList}
            contentContainerStyle={styles.categoriesListContent}
          />
          
          {selectedCategory && 
            phrasesData.categories.find(c => c.id === selectedCategory).subcategories &&
            phrasesData.categories.find(c => c.id === selectedCategory).subcategories.length > 0 && (
            <FlatList
              horizontal
              data={phrasesData.categories.find(c => c.id === selectedCategory).subcategories}
              renderItem={renderSubcategoryItem}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              style={styles.subcategoriesList}
              contentContainerStyle={styles.subcategoriesListContent}
            />
          )}
        </>
      )}
      
      <View style={styles.practiceButtonsRow}>
        <TouchableOpacity
          style={[styles.practiceAllButton, { backgroundColor: levelColor }]}
          onPress={() => startPractice('translation')}
          disabled={filteredPhrases.length === 0}
        >
          <Text style={styles.practiceAllButtonText}>Translation Practice</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.practiceAllButton, { backgroundColor: levelColor }]}
          onPress={() => startPractice('fillin')}
          disabled={filteredPhrases.length === 0}
        >
          <Text style={styles.practiceAllButtonText}>Fill in Blanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.practiceAllButton, { backgroundColor: levelColor }]}
          onPress={() => startPractice('arrange')}
          disabled={filteredPhrases.length === 0}
        >
          <Text style={styles.practiceAllButtonText}>Arrange Words</Text>
        </TouchableOpacity>
      </View>
      
      <Text style={styles.resultCount}>
        {filteredPhrases.length} {filteredPhrases.length === 1 ? 'phrase' : 'phrases'} found
      </Text>
      
      <FlatList
        data={filteredPhrases}
        renderItem={renderPhraseItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.phrasesList}
        contentContainerStyle={styles.phrasesListContent}
        ListEmptyComponent={
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              {searchQuery.trim() 
                ? 'No phrases matching your search.' 
                : showFavorites 
                  ? 'No favorite phrases yet.' 
                  : 'No phrases in this category.'}
            </Text>
          </View>
        }
      />
    </>
  );

  // Rendu du mode de pratique
  const renderPracticeMode = () => {
    if (quizCompleted) {
      return renderPracticeResults();
    }
    
    if (filteredPhrases.length === 0) {
      return (
        <View style={styles.emptyPracticeContainer}>
          <Text style={styles.emptyPracticeText}>No phrases available for practice.</Text>
          <TouchableOpacity
            style={[styles.backToBrowseButton, { backgroundColor: levelColor }]}
            onPress={() => setViewMode('browse')}
          >
            <Text style={styles.backToBrowseButtonText}>Back to Browse</Text>
          </TouchableOpacity>
        </View>
      );
    }
    
    const currentPhrase = filteredPhrases[currentPracticeIndex];
    
    return (
      <Animated.View 
        style={[
          styles.practiceContainer,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        <View style={styles.practiceProgress}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { 
                  width: `${((currentPracticeIndex) / filteredPhrases.length) * 100}%`,
                  backgroundColor: levelColor
                }
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentPracticeIndex + 1}/{filteredPhrases.length}
          </Text>
        </View>
        
        <View style={styles.practiceCard}>
          {practiceMode === 'translation' && (
            <>
              <Text style={styles.practicePrompt}>Translate this phrase:</Text>
              <Text style={styles.practicePhrase}>{currentPhrase.english}</Text>
              
              <TextInput
                style={[
                  styles.practiceInput,
                  showAnswer && (
                    userAnswer.toLowerCase().trim() === currentPhrase.translation.toLowerCase().trim()
                      ? styles.correctInput
                      : styles.incorrectInput
                  )
                ]}
                placeholder="Enter translation..."
                value={userAnswer}
                onChangeText={setUserAnswer}
                editable={!showAnswer}
                multiline
              />
            </>
          )}
          
          {practiceMode === 'fillin' && (
            <>
              <Text style={styles.practicePrompt}>Fill in the missing word(s):</Text>
              <Text style={styles.practicePhrase}>
                {currentPhrase.fillInSentence || currentPhrase.english.replace(/_+/g, '_____')}
              </Text>
              
              <TextInput
                style={[
                  styles.practiceInput,
                  showAnswer && (
                    userAnswer.toLowerCase().trim() === (currentPhrase.missingWords || []).join(' ').toLowerCase().trim()
                      ? styles.correctInput
                      : styles.incorrectInput
                  )
                ]}
                placeholder="Enter missing word(s)..."
                value={userAnswer}
                onChangeText={setUserAnswer}
                editable={!showAnswer}
              />
            </>
          )}
          
          {practiceMode === 'arrange' && (
            <>
              <Text style={styles.practicePrompt}>Arrange the words to form the correct phrase:</Text>
              
              <View style={styles.arrangedSentenceContainer}>
                {selectedOptions.length > 0 ? (
                  <View style={styles.arrangedWords}>
                    {selectedOptions.map((word, index) => (
                      <TouchableOpacity
                        key={`selected-${index}`}
                        style={[styles.arrangedWord, { borderColor: levelColor }]}
                        onPress={() => !showAnswer && handleRemoveWord(word, index)}
                        disabled={showAnswer}
                      >
                        <Text style={[styles.arrangedWordText, { color: levelColor }]}>{word}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                ) : (
                  <Text style={styles.arrangedPlaceholder}>Tap words below to form the phrase</Text>
                )}
              </View>
              
              <View style={styles.wordOptionsContainer}>
                {shuffledOptions.map((word, index) => (
                  <TouchableOpacity
                    key={`option-${index}`}
                    style={styles.wordOption}
                    onPress={() => !showAnswer && handleSelectWord(word, index)}
                    disabled={showAnswer}
                  >
                    <Text style={styles.wordOptionText}>{word}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              
              {!showAnswer && (
                <TouchableOpacity
                  style={[styles.resetArrangementButton, { borderColor: levelColor }]}
                  onPress={resetArrangement}
                >
                  <Text style={[styles.resetArrangementText, { color: levelColor }]}>Reset</Text>
                </TouchableOpacity>
              )}
            </>
          )}
          
          {showAnswer && (
            <View style={[
              styles.answerFeedback,
              userAnswer.toLowerCase().trim() === (
                practiceMode === 'translation' 
                  ? currentPhrase.translation.toLowerCase().trim()
                  : practiceMode === 'fillin'
                    ? (currentPhrase.missingWords || []).join(' ').toLowerCase().trim()
                    : currentPhrase.english.toLowerCase().trim()
              ) ? styles.correctFeedback : styles.incorrectFeedback
            ]}>
              <Text style={styles.answerFeedbackTitle}>
                {userAnswer.toLowerCase().trim() === (
                  practiceMode === 'translation' 
                    ? currentPhrase.translation.toLowerCase().trim()
                    : practiceMode === 'fillin'
                      ? (currentPhrase.missingWords || []).join(' ').toLowerCase().trim()
                      : selectedOptions.join(' ').toLowerCase().trim() === currentPhrase.english.toLowerCase().trim()
                        ? currentPhrase.english.toLowerCase().trim()
                        : ''
                ) ? "Correct!" : "Incorrect"}
              </Text>
              
              {(practiceMode === 'translation' || practiceMode === 'fillin') && (
                <Text style={styles.correctAnswerText}>
                  Correct answer: 
                  <Text style={styles.correctAnswerHighlight}>
                    {practiceMode === 'translation' 
                      ? ` ${currentPhrase.translation}`
                      : ` ${(currentPhrase.missingWords || []).join(' ')}`}
                  </Text>
                </Text>
              )}
              
              {practiceMode === 'arrange' && selectedOptions.join(' ').toLowerCase().trim() !== currentPhrase.english.toLowerCase().trim() && (
                <Text style={styles.correctAnswerText}>
                  Correct sentence: 
                  <Text style={styles.correctAnswerHighlight}> {currentPhrase.english}</Text>
                </Text>
              )}
            </View>
          )}
        </View>
        
        <View style={styles.practiceActions}>
          {!showAnswer ? (
            <TouchableOpacity
              style={[
                styles.checkAnswerButton,
                { backgroundColor: levelColor },
                (practiceMode === 'translation' || practiceMode === 'fillin') && !userAnswer.trim() && styles.disabledButton,
                practiceMode === 'arrange' && selectedOptions.length === 0 && styles.disabledButton
              ]}
              onPress={checkAnswer}
              disabled={(practiceMode === 'translation' || practiceMode === 'fillin') 
                ? !userAnswer.trim() 
                : selectedOptions.length === 0}
            >
              <Text style={styles.checkAnswerButtonText}>Check Answer</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={[styles.nextPhraseButton, { backgroundColor: levelColor }]}
              onPress={goToNextPhrase}
            >
              <Text style={styles.nextPhraseButtonText}>
                {currentPracticeIndex < filteredPhrases.length - 1 
                  ? 'Next Phrase' 
                  : 'See Results'}
              </Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity
            style={[styles.exitPracticeButton, { borderColor: levelColor }]}
            onPress={() => setViewMode('browse')}
          >
            <Text style={[styles.exitPracticeButtonText, { color: levelColor }]}>Exit Practice</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    );
  };

  // Rendu des résultats de pratique
  const renderPracticeResults = () => {
    const percentage = practiceTotal > 0 ? Math.round((practiceScore / practiceTotal) * 100) : 0;
    
    return (
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>Practice Results</Text>
        
        <View style={styles.scoreCircle}>
          <Text style={styles.scorePercentage}>{percentage}%</Text>
          <Text style={styles.scoreText}>{practiceScore}/{practiceTotal}</Text>
        </View>
        
        <Text style={styles.resultsFeedback}>
          {percentage >= 80 
            ? "Excellent! You have a great understanding of these phrases."
            : percentage >= 60
              ? "Good job! Keep practicing to improve your mastery."
              : "Keep working on these phrases. Practice makes perfect!"}
        </Text>
        
        <View style={styles.resultsActions}>
          <TouchableOpacity
            style={[styles.restartPracticeButton, { backgroundColor: levelColor }]}
            onPress={() => {
              setQuizCompleted(false);
              setCurrentPracticeIndex(0);
              setUserAnswer('');
              setShowAnswer(false);
              setPracticeScore(0);
              setPracticeTotal(0);
              
              // Préparer les options pour le mode "arrange" si nécessaire
              if (practiceMode === 'arrange' && filteredPhrases.length > 0) {
                prepareArrangeOptions(filteredPhrases[0]);
              }
            }}
          >
            <Text style={styles.restartPracticeButtonText}>Practice Again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.backToBrowseButton, { borderColor: levelColor }]}
            onPress={() => setViewMode('browse')}
          >
            <Text style={[styles.backToBrowseButtonText, { color: levelColor }]}>Back to Browse</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  // Rendu de l'écran de chargement
  if (!phrasesData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading phrases...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={[styles.levelBadge, { backgroundColor: levelColor }]}>
          <Text style={styles.levelBadgeText}>{level}</Text>
        </View>
        <Text style={styles.headerTitle}>Phrases & Expressions</Text>
      </View>
      
      <View style={styles.container}>
        {viewMode === 'browse' && renderBrowseMode()}
        {viewMode === 'practice' && renderPracticeMode()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#64748b',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  backButton: {
    marginRight: 15,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#475569',
  },
  levelBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 10,
  },
  levelBadgeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#334155',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  searchInput: {
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#334155',
    marginBottom: 10,
  },
  favoritesToggle: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  favoritesToggleText: {
    fontSize: 14,
    color: '#64748b',
  },
  categoriesList: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoriesListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    marginRight: 8,
    backgroundColor: 'white',
  },
  selectedCategoryButton: {
    borderWidth: 2,
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  subcategoriesList: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  subcategoriesListContent: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  subcategoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#f1f5f9',
  },
  selectedSubcategoryButton: {
    backgroundColor: '#eff6ff',
  },
  subcategoryButtonText: {
    fontSize: 14,
    color: '#64748b',
  },
  practiceButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  practiceAllButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  practiceAllButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  resultCount: {
    padding: 16,
    fontSize: 14,
    color: '#64748b',
    fontStyle: 'italic',
  },
  phrasesList: {
    flex: 1,
  },
  phrasesListContent: {
    padding: 16,
    paddingBottom: 40,
  },
  phraseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  phraseHeader: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  phraseMain: {
    flex: 1,
  },
  phraseEnglish: {
    fontSize: 16,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 4,
  },
  phraseTranslation: {
    fontSize: 14,
    color: '#64748b',
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
  },
  favoriteButtonActive: {
    backgroundColor: '#fef9c3',
  },
  favoriteButtonText: {
    fontSize: 18,
    color: '#f59e0b',
  },
  phraseDetails: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  contextContainer: {
    marginBottom: 12,
  },
  contextLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  contextText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  examplesContainer: {
    marginBottom: 12,
  },
  examplesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  exampleItem: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  exampleEnglish: {
    fontSize: 14,
    color: '#334155',
    marginBottom: 4,
  },
  exampleTranslation: {
    fontSize: 13,
    color: '#64748b',
    fontStyle: 'italic',
  },
  notesContainer: {
    marginBottom: 12,
  },
  notesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
  },
  synonymsContainer: {
    marginBottom: 12,
  },
  synonymsLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginBottom: 8,
  },
  synonymsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  synonymTag: {
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  synonymText: {
    fontSize: 13,
    color: '#475569',
  },
  practiceButtonsContainer: {
    marginTop: 4,
  },
  practiceButton: {
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  practiceButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  emptyListContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
  // Practice mode styles
  practiceContainer: {
    flex: 1,
    padding: 16,
  },
  practiceProgress: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e2e8f0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  practiceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  practicePrompt: {
    fontSize: 16,
    fontWeight: '500',
    color: '#475569',
    marginBottom: 12,
  },
  practicePhrase: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    lineHeight: 26,
  },
  practiceInput: {
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#334155',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  correctInput: {
    borderColor: '#10b981',
    backgroundColor: '#f0fdf4',
  },
  incorrectInput: {
    borderColor: '#ef4444',
    backgroundColor: '#fef2f2',
  },
  arrangedSentenceContainer: {
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    padding: 16,
    minHeight: 80,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
  },
  arrangedWords: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  arrangedWord: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    backgroundColor: 'white',
  },
  arrangedWordText: {
    fontSize: 16,
    fontWeight: '500',
  },
  arrangedPlaceholder: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  wordOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  wordOption: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
    backgroundColor: 'white',
  },
  wordOptionText: {
    fontSize: 16,
    color: '#334155',
  },
  resetArrangementButton: {
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginTop: 8,
  },
  resetArrangementText: {
    fontSize: 14,
    fontWeight: '500',
  },
  answerFeedback: {
    marginTop: 20,
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
  },
  correctFeedback: {
    backgroundColor: '#f0fdf4',
    borderLeftColor: '#10b981',
  },
  incorrectFeedback: {
    backgroundColor: '#fef2f2',
    borderLeftColor: '#ef4444',
  },
  answerFeedbackTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  correctAnswerText: {
    fontSize: 15,
    color: '#475569',
  },
  correctAnswerHighlight: {
    fontWeight: '600',
    color: '#334155',
  },
  practiceActions: {
    marginTop: 8,
  },
  checkAnswerButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  checkAnswerButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  nextPhraseButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  nextPhraseButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  exitPracticeButton: {
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  exitPracticeButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  emptyPracticeContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyPracticeText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 20,
  },
  backToBrowseButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
  },
  backToBrowseButtonText: {
    fontSize: 16,
    fontWeight: '500',
  },
  // Results styles
  resultsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 16,
    margin: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f1f5f9',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  scorePercentage: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  scoreText: {
    fontSize: 16,
    color: '#64748b',
  },
  resultsFeedback: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  resultsActions: {
    marginTop: 'auto',
  },
  restartPracticeButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  restartPracticeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PhrasesExpressions;
