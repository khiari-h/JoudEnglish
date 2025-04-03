export type ExerciseType = 'chatbot' | 'vocabulary' | 'grammar' | 'reading' | 'error_correction' | 'spelling' | 'listening' | 'assessment';

export type BaseExerciseProps = {
  level: string;
  levelColor: string;
  progress: number;
  onBack: () => void;
};

export type TaskType = {
  id: string;
  type: ExerciseType;
  content: any;
};
