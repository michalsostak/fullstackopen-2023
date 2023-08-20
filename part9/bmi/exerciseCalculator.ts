interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  actual: number[],
  target: number
): Result => {
  const periodLength: number = actual.length;
  const trainingDays: number = actual.filter(day => day > 0).length;
  const sum: number = actual.reduce((a,c) => a + c, 0);
  const average: number = sum / periodLength;
  const success: boolean = average >= target
  const rating: number = getRating(average, target)
  const ratingDescription: string = getRatingDescription(rating)
  const result: Result = { periodLength, trainingDays, success, rating, ratingDescription, target, average }
  return result
};

const getRating = (average: number, target: number): number => {
  const difference: number = target - average
  switch (true) {
    case difference > 1:
      return 1;
    case -0.5 < difference && difference <= 1:
      return 2;
    case difference <= -0.5:
      return 3;
  }
}

const getRatingDescription = (rating: number): string => {
  switch (rating) {
    case 1:
      return "you must work harder next time...";
    case 2:
      return "not too bad but could be better";
    case 3:
      return "great job!";
    default:
      return "Invalid rating";
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
