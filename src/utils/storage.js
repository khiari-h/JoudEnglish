import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Sauvegarde des données dans AsyncStorage
 * @param {string} key - Clé de stockage
 * @param {any} value - Valeur à stocker (sera convertie en JSON)
 * @returns {Promise<void>}
 */
export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Récupération des données depuis AsyncStorage
 * @param {string} key - Clé de stockage
 * @returns {Promise<any>} Valeur récupérée, parsée depuis JSON
 */
export const loadData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Suppression des données dans AsyncStorage
 * @param {string} key - Clé de stockage à supprimer
 * @returns {Promise<void>}
 */
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Récupération de toutes les clés stockées
 * @returns {Promise<string[]>} Liste des clés
 */
export const getAllKeys = async () => {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.error('Error getting all keys:', error);
    throw error;
  }
};

/**
 * Efface toutes les données stockées
 * @returns {Promise<void>}
 */
export const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
    throw error;
  }
};