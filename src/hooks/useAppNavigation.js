import { useNavigation } from '@react-navigation/native';
import { EXERCISE_ROUTES } from '../navigation/exerciseRoutes';

export const useAppNavigation = () => {
  const navigation = useNavigation();

  const navigateToExercise = (exerciseType, params = {}) => {
    const route = EXERCISE_ROUTES[exerciseType.toUpperCase()];
    if (route) {
      navigation.navigate(route, params);
    }
  };

  const goToResults = (results) => {
    navigation.navigate(EXERCISE_ROUTES.RESULTS, { results });
  };

  const goBack = () => navigation.goBack();

  return {
    navigateToExercise,
    goToResults,
    goBack,
    navigation
  };
};
