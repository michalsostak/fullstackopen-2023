interface exerciseValues {
  target: number;
  actual: number[];
}
interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const parseExerciseArguments = (args: string[]): exerciseValues => {
  if (args.length < 4) {
    throw new Error("Not enough arguments");
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ _firstArg, _secondArg, ...inputArgs ] = args;
  const allNumbers = inputArgs
    .map((arg: string) => isNaN(Number(arg)))
    .every(arg => !arg);

  if (!allNumbers) {
    throw new Error("Provided values were not numbers!");
  }

  const inputNumbers = inputArgs.map((arg) => Number(arg));

  const [target, ...actual] = inputNumbers;
  return {
    target,
    actual,
  };
};

export const calculateExercises = (
  target: number,
  actual: number[]
): Result => {
  const periodLength: number = actual.length;
  const trainingDays: number = actual.filter((day) => day > 0).length;
  const sum: number = actual.reduce((a, c) => a + c, 0);
  const average: number = sum / periodLength;
  const success: boolean = average >= target;
  const rating: number = getRating(target, average);
  const ratingDescription: string = getRatingDescription(rating);
  const result: Result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
  return result;
};

const getRating = (target: number, average: number): number => {
  const difference: number = target - average;
  switch (true) {
    case difference > 1:
      return 1;
    case -0.5 < difference && difference <= 1:
      return 2;
    case difference <= -0.5:
      return 3;
    default:
      return 0;
  }
};

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
};

try {
  const { target, actual } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(target, actual));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
