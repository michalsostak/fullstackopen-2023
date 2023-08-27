interface BmiValues {
  heightInCm: number;
  weightInKg: number;
}

const parseBmiArguments = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) <= 0 || Number(args[3]) <= 0) {
      throw new Error("Provided values cannot be negative!");
    }
    return {
      heightInCm: Number(args[2]),
      weightInKg: Number(args[3]),
    };
  }
  
  throw new Error("Provided values were not numbers!");
};

export const calculateBmi = (heightInCm: number, weightInKg: number): string => {
  const heightInMetres: number = heightInCm / 100;
  const bmi: number = weightInKg / (heightInMetres * heightInMetres);
  switch (true) {
    case bmi < 18.5:
      return "Underweight";
    case 25 > bmi && bmi >= 18.5:
      return "Normal (healthy weight)";
    case 30 > bmi && bmi >= 25:
      return "Overweight";
    case bmi >= 30:
      return "Obese";
    default:
      return "Invalid bmi calculation";
  }
};

try {
  const { heightInCm, weightInKg } = parseBmiArguments(process.argv);
  console.log(calculateBmi(heightInCm, weightInKg));
} catch (error: unknown) {
  let errorMessage = "Something bad happened.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
